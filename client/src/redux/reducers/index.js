import { combineReducers } from 'redux';
import techReducer from './techReducer';
import logReducer from './logReducer';

export default combineReducers({
  tech: techReducer,
  log: logReducer
});
