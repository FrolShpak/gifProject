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
    const gifStream = fs.createWriteStream(`./tempFiles/${uuid}.gif`);
    const duration = endTime - startTime;

    console.debug('making gif');
    await ffmpeg()
      .input(videoStream)
      .seekInput(startTime)
      .duration(duration)
      .noAudio()
      .format('gif')
      .pipe(gifStream, { end: true });

    return gifStream.path;
  }
}
export default new VideoService();
