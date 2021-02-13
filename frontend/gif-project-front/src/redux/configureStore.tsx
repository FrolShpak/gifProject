import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState: any) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxImmutableStateInvariant())),
  );
}
