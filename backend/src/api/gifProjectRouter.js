import express from 'express';
import VideoService from '../services/videoService';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
});
const gifProjectRouter = express.Router();

gifProjectRouter
  .route('/video')
  .post(upload.single('video'), async (req, res) => {
    console.log('POST on /video');
    await VideoService.uploadVideo(req.file);
  });

export default gifProjectRouter;
