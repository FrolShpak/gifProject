import express from 'express';
import VideoService from '../services/videoService';
import multer from 'multer';

const upload = multer();
const gifProjectRouter = express.Router();
gifProjectRouter
  .route('/uploadVideo')
  .post(upload.single('video'), async (req, res) => {
    console.log('POST on /uploadVideo');
    await VideoService.UploadVideo(req.file.buffer);
  });

export default gifProjectRouter;
