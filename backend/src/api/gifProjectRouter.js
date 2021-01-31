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
    console.debug('POST on /video');
    return VideoService.uploadVideo(req.file)
      .then((result) => {
        res.status(201);
        res.send(result);
      })
      .catch((err) => {
        res.status(500);
        res.send(err);
      });
  });

export default gifProjectRouter;
