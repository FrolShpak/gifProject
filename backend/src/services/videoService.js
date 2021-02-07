import { v4 } from 'uuid';
import fs from 'fs';
import FfmpegService from './ffmpegService';
import FirestoreService from './firestoreService';
import CloudStorageService from './cloudStorageService';
import VideoDoc from '../models/videoDoc';

class VideoService {
  async uploadVideo(file) {
    const uuid = v4();
    const fileExtension = /[^.]+$/.exec(file.originalname)[0];
    const videoDoc = new VideoDoc(uuid, fileExtension);
    await CloudStorageService.saveVideo(file, videoDoc.getFileName());
    await FirestoreService.saveVideoDocument(videoDoc);
    return videoDoc;
  }
  extractGif(uuid, data) {
    return new Promise(async (resolve, reject) => {
      try {
        //TODO: worflow for using subtitles
        const { startTime, endTime, subtitles } = data;
        const videoDoc = await FirestoreService.getVideoDocument(uuid);
        const videoStream = await CloudStorageService.getVideo(
          videoDoc.getFileName(),
        );
        const gifStream = fs.createWriteStream(`./tempFiles/${uuid}.gif`);
        const duration = endTime - startTime;

        console.debug('making gif');
        await FfmpegService.extractGif(
          videoStream,
          startTime,
          duration,
          gifStream,
        );
        resolve(gifStream.path);
      } catch (err) {
        reject(err);
      }
    });
  }
}
export default new VideoService();
