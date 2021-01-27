import { v4 } from 'uuid';
import VideoModel from '../models/videoModel';

class VideoService {
  async UploadVideo(file) {
    // let newVideo = new VideoModel();
    // newVideo.uuid = v4();
    // newVideo.content = file;
    // newVideo
    //   .save()
    //   .then((data) => {
    //     console.log('Error saving video:', data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}
const service = new VideoService();
export default service;
