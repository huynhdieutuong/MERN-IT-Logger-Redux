import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_LOADING,
  LOGS_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [action.payload, ...state.logs],
        error: null,
        message: action.message
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload),
        error: null,
        message: action.message
      };
    case SET_CURRENT_LOG:
      return {
        ...state,
        current: action.payload,
        error: null,
        message: null
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(log =>
          log._id === action.payload._id ? action.payload : log
        ),
        error: null,
        message: action.message
      };
    case SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload
      };
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
