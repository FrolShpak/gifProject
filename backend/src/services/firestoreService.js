import Firestore from '@google-cloud/firestore';
import config from '../config';

const videoCollection = 'Video';
const db = new Firestore({
  projectId: config.firestore.projectId,
  keyFilename: config.firestore.keyFilename,
});

class FirestoreService {
  async saveVideoDocument(videoData) {
    console.debug('calling FirestoreService.saveVideoDocument');
    const result = await db
      .collection(videoCollection)
      .doc(videoData.uuid)
      .set(JSON.parse(JSON.stringify(videoData)));
    return result;
  }
  async getVideoDocument(uuid) {
    console.debug('calling FirestoreService.getVideoDocument');
    const videoDocRef = db.collection(videoCollection).doc(uuid);
    const videoDoc = await videoDocRef.get();
    if (!videoDoc.exists) {
      throw new Error('No video found');
    } else {
      return videoDoc.data();
    }
  }
}

export default new FirestoreService();
