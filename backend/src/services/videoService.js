import { v4 } from 'uuid';
import FirestoreService from './firestoreService';
import CloudStorageService from './cloudStorageService';
import VideoData from '../models/videoData';

class VideoService {
  uploadVideo(file) {
    return CloudStorageService.saveVideo(file)
      .then((path) => {
        console.debug(path);
        const videoData = new VideoData(v4(), path);
        return FirestoreService.saveVideoDocument(videoData);
      })
      .catch((err) => console.error(err));
  }
}
export default new VideoService();
