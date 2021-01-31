import Firestore from '@google-cloud/firestore';
import config from '../config';

const videoColelction = 'Video';
const db = new Firestore({
  projectId: config.firestore.projectId,
  keyFilename: config.firestore.keyFilename,
});

class FirestoreService {
  async saveVideoDocument(videoData) {
    console.log('calling FirestoreService.saveVideoDocument');
    await db.collection(videoColelction).doc(videoData.uuid).set(videoData);
  }
}

export default new FirestoreService();
