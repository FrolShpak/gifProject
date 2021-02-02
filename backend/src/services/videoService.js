import { v4 } from 'uuid';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import FirestoreService from './firestoreService';
import CloudStorageService from './cloudStorageService';
import VideoData from '../models/videoData';

class VideoService {
  async uploadVideo(file) {
    const uuid = v4();
    const filename = uuid + '.' + /[^.]+$/.exec(file.originalname);
    const videoData = new VideoData(uuid, filename);
    await CloudStorageService.saveVideo(file, videoData);
    await FirestoreService.saveVideoDocument(videoData);
    return videoData.uuid;
  }
  async extractGif(uuid, data) {
    const { startTime, endTime, subtitles } = data;
    const videoDoc = await FirestoreService.getVideoDocument(uuid);
    const videoStream = await CloudStorageService.getVideo(videoDoc);
    const gifStream = fs.createWriteStream('./test.gif');

    console.debug('making gif');
    ffmpeg()
      .input(videoStream)
      .seekInput(5)
      .duration(10)
      .noAudio()
      .format('gif')
      .pipe(gifStream, { end: true });

    return './test.gif';
  }
}
export default new VideoService();
