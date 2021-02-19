import { Middleware } from 'redux';
import { RootReducer } from '../redux/reducers';

const logger: Middleware<{}, RootReducer> = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

export default logger;
