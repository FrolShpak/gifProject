import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { runInContext } from 'vm';

class FfmpegService {
  extractGif(videoStream, startTime, duration, gifStream) {
    return new Promise((resolve, reject) => {
      try {
        ffmpeg()
          .input(videoStream)
          .seekInput(startTime)
          .duration(duration)
          .format('gif')
          .on('error', (err) => {
            reject(err);
          })
          .on('end', () => {
            resolve();
          })
          .pipe(gifStream, { end: true });
      } catch (err) {
        reject(err);
      }
    });
  }
  downsizeVideo(input, output) {
    console.debug('downsizing video');
    ffmpeg.ffprobe(input, async (err, metadata) => {
      if (err) {
        console.error(err);
        return;
      }
      console.debug(metadata);
      ffmpeg(input)
        .size('640x?')
        .aspect(metadata.streams[0].display_aspect_ratio)
        .noAudio()
        .format('matroska')
        .on('end', () => {
          console.debug('end of downaizing');
        })
        .pipe(output);
    });
  }
}

export default new FfmpegService();
