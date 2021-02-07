import { Storage } from '@google-cloud/storage';
import FfmpegService from './ffmpegService';
import config from '../config';
import fs from 'fs';

const storage = new Storage();
const bucket = storage.bucket(config.cloudStorage.bucket);

class CloudStorageService {
  saveVideo(file, fileName) {
    console.debug('calling CloudStorageService.saveVideo');
    return new Promise(async (resolve, reject) => {
      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        resumable: false,
        qzip: true,
      });
      blobStream
        .on('error', (err) => reject(err))
        .on('finish', () => {
          console.debug('finished writting');
          resolve();
        });
      FfmpegService.downsizeVideo(`./${file.path}`, blobStream);
    });
  }
  async getVideo(fileName) {
    console.debug('calling CloudStorageService.getVideo');
    await bucket
      .file(fileName)
      .download({ destination: `./tempFiles/${fileName}` });
    return fs.createReadStream(`./tempFiles/${fileName}`);
  }
}

export default new CloudStorageService();
