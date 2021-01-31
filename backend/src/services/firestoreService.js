import Firestore from '@google-cloud/firestore';
import config from '../config';

const videoColelction = 'Video';
const db = new Firestore({
  projectId: config.firestore.projectId,
  keyFilename: config.firestore.keyFilename,
});

class FirestoreService {
  async saveVideoDocument(videoData) {
    console.debug('calling FirestoreService.saveVideoDocument');
    const result = await db
      .collection(videoColelction)
      .doc(videoData.uuid)
      .set(JSON.parse(JSON.stringify(videoData)));
    return result;
  }
}

export default new FirestoreService();
