import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_CURRENT_TECH,
  UPDATE_TECH,
  TECHS_ERROR
} from '../types';

const initialState = {
  techs: [],
  current: null,
  message: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload
      };
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
        message: action.message,
        error: null
      };
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(tech => tech._id !== action.payload),
        message: action.message,
        error: null
      };
    case UPDATE_TECH:
      return {
        ...state,
        techs: state.techs.map(tech =>
          tech._id === action.payload._id ? action.payload : tech
        ),
        message: action.message,
        error: null
      };
    case SET_CURRENT_TECH:
      return {
        ...state,
        current: action.payload,
        error: null,
        message: null
      };
    case TECHS_ERROR:
      return {
        ...state,
        error: action.payload,
        message: null
      };
    default:
      return state;
  }
};
