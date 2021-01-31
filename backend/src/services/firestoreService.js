import Firestore from '@google-cloud/firestore';
import config from '../config';

const videoColelction = 'Video';
const db = new Firestore({
  projectId: config.firestore.projectId,
  keyFilename: config.firestore.keyFilename,
});

class FirestoreService {
  saveVideoDocument(videoData) {
    console.debug('calling FirestoreService.saveVideoDocument');
    return db
      .collection(videoColelction)
      .doc(videoData.uuid)
      .set(JSON.parse(JSON.stringify(videoData)));
  }
}

export default new FirestoreService();
