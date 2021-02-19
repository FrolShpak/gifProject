import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
const rootReducer = combineReducers({ video: videoReducer });

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
