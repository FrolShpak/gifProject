import { UPDATE_VIDEO, VideoActionTypes } from '../actions/types';
import { VideoStateSlice } from '../stateSlices';

const initialState: VideoStateSlice = {
  path: '',
  id: '',
};

const videoReducer = (
  state = initialState,
  action: VideoActionTypes,
): VideoStateSlice => {
  switch (action.type) {
    case UPDATE_VIDEO:
      return { ...state, path: action.payload.path, id: action.payload.id };
    default:
      return state;
  }
};

export default videoReducer;
