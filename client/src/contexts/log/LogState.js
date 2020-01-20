import React, { useReducer } from 'react';
import axios from 'axios';

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

import logContext from './logContext';
import logReducer from './logReducer';

const LogState = props => {
  const initialState = {
    logs: [],
    current: null,
    loading: false,
    error: null,
    message: null
  };

  const [state, dispatch] = useReducer(logReducer, initialState);
  const { logs, current, loading, error, message } = state;

  // Set Loading
  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  // Get Logs
  const getLogs = async () => {
    try {
      const res = await axios.get('/api/v1/logs');
      const logs = res.data;

      dispatch({
        type: GET_LOGS,
        payload: logs.data
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Add Log
  const addLog = async newLog => {
    try {
      const res = await axios.post('/api/v1/logs', newLog);
      const log = res.data;

      dispatch({
        type: ADD_LOG,
        payload: log.data,
        message: `Added Log: ${log.data.message}`
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Delete Log
  const deleteLog = async log => {
    try {
      await axios.delete(`/api/v1/logs/${log._id}`);

      dispatch({
        type: DELETE_LOG,
        payload: log._id,
        message: `Deleted Log: ${log.message}`
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Set Current Log
  const setCurrentLog = log => {
    dispatch({
      type: SET_CURRENT_LOG,
      payload: log
    });
  };

  // Update Log
  const updateLog = async uptLog => {
    try {
      const res = await axios.put(`/api/v1/logs/${uptLog._id}`, uptLog);
      const log = res.data;

      dispatch({
        type: UPDATE_LOG,
        payload: log.data,
        message: `Updated Log: ${log.data.message}`
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Search Logs
  const searchLogs = async text => {
    try {
      const res = await axios.get(`/api/v1/logs/search?q=${text}`);
      const logs = res.data;

      dispatch({
        type: SEARCH_LOGS,
        payload: logs.data
      });
    } catch (error) {
      dispatch({
        type: LOGS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  return (
    <logContext.Provider
      value={{
        logs,
        current,
        loading,
        error,
        message,
        getLogs,
        addLog,
        deleteLog,
        setCurrentLog,
        updateLog,
        searchLogs,
        setLoading
      }}
    >
      {props.children}
    </logContext.Provider>
  );
};

export default LogState;
