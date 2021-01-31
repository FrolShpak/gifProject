import { Storage } from '@google-cloud/storage';
import { finished } from 'stream/promises';
import config from '../config';

const storage = new Storage();
const bucket = storage.bucket(config.cloudStorage.bucket);

class CloudStorageService {
  saveVideo(file) {
    console.debug('calling CloudStorageService.saveVideo');
    return new Promise((resolve, reject) => {
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
        qzip: true,
      });

      blobStream
        .on('error', (err) => reject(err))
        .on('finish', () => {
          console.debug('finished writting');
          resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        });
      blobStream.end(file.buffer);
    });
  }
}

export default new CloudStorageService();
