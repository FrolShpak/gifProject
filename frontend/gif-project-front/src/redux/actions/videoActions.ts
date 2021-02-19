import { VideoStateSlice } from '../stateSlices';
import { UPDATE_VIDEO, VideoActionTypes } from './types';

export function updateVideo(video: VideoStateSlice): VideoActionTypes {
  return {
    type: UPDATE_VIDEO,
    payload: video,
  };
}
