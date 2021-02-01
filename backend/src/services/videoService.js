import { v4 } from 'uuid';
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
    const videoFile = await CloudStorageService.getVideo(videoDoc);
    console.debug(videoFile);
  }
}
export default new VideoService();
