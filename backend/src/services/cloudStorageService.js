import { Storage } from '@google-cloud/storage';
import config from '../config';
import fs from 'fs';

const storage = new Storage();
const bucket = storage.bucket(config.cloudStorage.bucket);

class CloudStorageService {
  saveVideo(file, videoData) {
    console.debug('calling CloudStorageService.saveVideo');
    return new Promise((resolve, reject) => {
      //change file name and consider to resize video for a smaller size
      console.debug(videoData);
      const blob = bucket.file(videoData.fileName);
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
  async getVideo(videoDoc) {
    console.debug('calling CloudStorageService.getVideo');
    await bucket
      .file(videoDoc.fileName)
      .download({ destination: `./tempFiles/${videoDoc.fileName}` });
    return fs.createReadStream(`./tempFiles/${videoDoc.fileName}`);
  }
}

export default new CloudStorageService();
