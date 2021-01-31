import express from 'express';
import VideoService from '../services/videoService';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const videoFilesMIME = new RegExp('/^video+/[-w.]+$/');
    const mimetype = videoFilesMIME.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      const error = new Error('Only video files allowed');
      error.status = 404;
      return cb(error, false);
    }
  },
}).single('video');
const gifProjectRouter = express.Router();

gifProjectRouter.route('/video').post((req, res, next) => {
  console.debug('POST on /video');
  upload(req, res, async (err) => {
    try {
      if (err) {
        throw err;
      }
      const result = await VideoService.uploadVideo(req.file);
      res.status(201);
      res.send(result);
    } catch (err) {
      next(err);
    }
  });
});

export default gifProjectRouter;
