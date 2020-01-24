import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  LOGS_ERROR,
  SET_LOADING
} from '../types';

const initialState = {
  logs: [],
  current: null,
  message: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
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
        message: action.message,
        error: null
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload),
        message: action.message,
        error: null
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(log =>
          log._id === action.payload._id ? action.payload : log
        ),
        message: action.message,
        error: null
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
    case SET_CURRENT_LOG:
      return {
        ...state,
        current: action.payload,
        message: null,
        error: null
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
