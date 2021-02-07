import Firestore from '@google-cloud/firestore';
import config from '../config';
import VideoDoc from '../models/videoDoc';

const videoCollection = 'Video';
const db = new Firestore({
  projectId: config.firestore.projectId,
  keyFilename: config.firestore.keyFilename,
});
class FirestoreService {
  async saveVideoDocument(videoDoc) {
    console.debug('calling FirestoreService.saveVideoDocument');
    const result = await db
      .collection(videoCollection)
      .doc(videoDoc.uuid)
      .set(JSON.parse(JSON.stringify(videoDoc)));
    return result;
  }
  async getVideoDocument(uuid) {
    console.debug('calling FirestoreService.getVideoDocument');
    const videoDoc = await db.collection(videoCollection).doc(uuid).get();
    if (!videoDoc.exists) {
      throw new Error('No video found');
    } else {
      const { uuid, fileExtension } = videoDoc.data();
      const videoDoc = new VideoDoc(uuid, fileExtension);
      return videoDoc;
    }
  }
}

export default new FirestoreService();
