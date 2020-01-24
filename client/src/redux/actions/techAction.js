import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_CURRENT_TECH,
  UPDATE_TECH,
  TECHS_ERROR
} from '../types';

export const getTechs = () => async dispatch => {
  const res = await fetch('/api/v1/techs');
  const response = await res.json();
  if (response.success) {
    dispatch({
      type: GET_TECHS,
      payload: response.data
    });
  } else {
    dispatch({
      type: TECHS_ERROR,
      payload: response.error
    });
  }
};

export const addTech = newTech => async dispatch => {
  const res = await fetch('/api/v1/techs', {
    method: 'POST',
    body: JSON.stringify(newTech),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const response = await res.json();
  if (response.success) {
    dispatch({
      type: ADD_TECH,
      payload: response.data,
      message: `${response.data.fullName} Added.`
    });
  } else {
    dispatch({
      type: TECHS_ERROR,
      payload: response.error
    });
  }
};

export const deleteTech = tech => async dispatch => {
  const res = await fetch(`/api/v1/techs/${tech._id}`, {
    method: 'DELETE'
  });
  const response = await res.json();
  if (response.success) {
    dispatch({
      type: DELETE_TECH,
      payload: tech._id,
      message: `${tech.fullName} Deleted.`
    });
  } else {
    dispatch({
      type: TECHS_ERROR,
      payload: response.error
    });
  }
};

export const updateTech = uptTech => async dispatch => {
  const res = await fetch(`/api/v1/techs/${uptTech._id}`, {
    method: 'PUT',
    body: JSON.stringify(uptTech),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const response = await res.json();
  if (response.success) {
    dispatch({
      type: UPDATE_TECH,
      payload: response.data,
      message: `${response.data.fullName} Updated.`
    });
  } else {
    dispatch({
      type: TECHS_ERROR,
      payload: response.error
    });
  }
};

export const setCurrentTech = tech => {
  return {
    type: SET_CURRENT_TECH,
    payload: tech
  };
};
