import { VideoStateSlice } from '../stateSlices';

export const UPDATE_VIDEO = 'UPDATE_VIDEO';

interface UpdateVideoAction {
  type: typeof UPDATE_VIDEO;
  payload: VideoStateSlice;
}

export type VideoActionTypes = UpdateVideoAction;
