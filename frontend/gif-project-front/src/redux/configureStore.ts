import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import loggerMiddleware from '../middleware/logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState: any) {
  const middlewares = [
    loggerMiddleware,
    thunkMiddleware,
    reduxImmutableStateInvariant(),
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middlewareEnhancer),
  );
}
