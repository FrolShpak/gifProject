import { Storage } from '@google-cloud/storage';
import { finished } from 'stream/promises';
import config from '../config';

const storage = new Storage();
const bucket = storage.bucket(config.cloudStorage.bucket);

class CloudStorageService {
  async saveVideo(file) {
    console.log('calling CloudStorageService.saveVideo');
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    // blobStream.on('error', (err) => {
    //   next(err);
    // });

    blobStream.end(file.buffer);
    await finished(blobStream);
    return `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  }
}

export default new CloudStorageService();
