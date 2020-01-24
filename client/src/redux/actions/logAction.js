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

export const getLogs = () => async dispatch => {
  const res = await fetch('/api/v1/logs');
  const response = await res.json();

  if (response.success) {
    dispatch({
      type: GET_LOGS,
      payload: response.data
    });
  } else {
    dispatch({
      type: LOGS_ERROR,
      payload: response.error
    });
  }
};

export const addLog = newLog => async dispatch => {
  const res = await fetch('/api/v1/logs', {
    method: 'POST',
    body: JSON.stringify(newLog),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const response = await res.json();

  if (response.success) {
    dispatch({
      type: ADD_LOG,
      payload: response.data,
      message: `${response.data.message} Added.`
    });
  } else {
    dispatch({
      type: LOGS_ERROR,
      payload: response.error
    });
  }
};

export const deleteLog = log => async dispatch => {
  const res = await fetch(`/api/v1/logs/${log._id}`, {
    method: 'DELETE'
  });
  const response = await res.json();

  if (response.success) {
    dispatch({
      type: DELETE_LOG,
      payload: log._id,
      message: `${log.message} Deleted.`
    });
  } else {
    dispatch({
      type: LOGS_ERROR,
      payload: response.error
    });
  }
};

export const updateLog = uptLog => async dispatch => {
  const res = await fetch(`/api/v1/logs/${uptLog._id}`, {
    method: 'PUT',
    body: JSON.stringify(uptLog),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const response = await res.json();

  if (response.success) {
    dispatch({
      type: UPDATE_LOG,
      payload: response.data,
      message: `${response.data.message} Updated.`
    });
  } else {
    dispatch({
      type: LOGS_ERROR,
      payload: response.error
    });
  }
};

export const searchLogs = text => async dispatch => {
  const res = await fetch(`/api/v1/logs/search?q=${text}`);
  const response = await res.json();

  if (response.success) {
    dispatch({
      type: SEARCH_LOGS,
      payload: response.data
    });
  } else {
    dispatch({
      type: LOGS_ERROR,
      payload: response.error
    });
  }
};

export const setCurrentLog = log => {
  return {
    type: SET_CURRENT_LOG,
    payload: log
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
