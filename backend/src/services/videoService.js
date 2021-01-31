import { v4 } from 'uuid';
import FirestoreService from './firestoreService';
import CloudStorageService from './cloudStorageService';
import VideoData from '../models/videoData';

class VideoService {
  async uploadVideo(file) {
    const path = await CloudStorageService.saveVideo(file);
    const videoData = new VideoData(v4(), path);
    await FirestoreService.saveVideoDocument(videoData);
  }
}
export default new VideoService();
