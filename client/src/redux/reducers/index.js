import { combineReducers } from 'redux';
import techReducer from './techReducer';

export default combineReducers({
  tech: techReducer
});
