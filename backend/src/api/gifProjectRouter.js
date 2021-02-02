import express from 'express';
import VideoService from '../services/videoService';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const videoFilesMIME = new RegExp(`^video+/.+$`);
    const mimetype = videoFilesMIME.test(file.mimetype);
    console.debug(mimetype, file.mimetype);
    if (mimetype) {
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
      const videoUuid = await VideoService.uploadVideo(req.file);
      res.status(201);
      res.send({ videoUuid });
    } catch (err) {
      next(err);
    }
  });
});
gifProjectRouter
  .route('/video/:uuid/extractGif')
  .post(async (req, res, next) => {
    console.debug('POST on /extractGif');
    try {
      const gifPath = await VideoService.extractGif(req.params.uuid, req.body);
      res.status(200);
      res.download(gifPath);
    } catch (err) {
      next(err);
    }
  });

export default gifProjectRouter;
