import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_CURRENT_TECH,
  UPDATE_TECH,
  TECHS_ERROR
} from '../types';

export default (state, action) => {
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
        error: null,
        message: action.message
      };
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter(tech => tech._id !== action.payload),
        error: null,
        message: action.message
      };
    case SET_CURRENT_TECH:
      return {
        ...state,
        current: action.payload,
        error: null,
        message: null
      };
    case UPDATE_TECH:
      return {
        ...state,
        techs: state.techs.map(tech =>
          tech._id === action.payload._id ? action.payload : tech
        ),
        error: null,
        message: action.message,
        current: null
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
