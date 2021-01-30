import Firestore from '@google-cloud/firestore';
import config from '../config';

const db = new Firestore({
  projectId: config.db.projectId,
  keyFilename: config.db.keyFilename,
});

class FirestoreService {}

export default new FirestoreService();
