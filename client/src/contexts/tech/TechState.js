import React, { useReducer } from 'react';
import axios from 'axios';

import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_CURRENT_TECH,
  UPDATE_TECH,
  TECHS_ERROR
} from '../types';

import techReducer from './techReducer';
import techContext from './techContext';

const TechState = props => {
  const initialState = {
    techs: [],
    current: null,
    error: null,
    message: null
  };

  const [state, dispatch] = useReducer(techReducer, initialState);

  const { techs, current, error, message } = state;

  // Get Techs
  const getTechs = async () => {
    try {
      const res = await axios.get('/api/v1/techs');
      const techs = res.data;

      dispatch({
        type: GET_TECHS,
        payload: techs.data
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Add Tech
  const addTech = async newTech => {
    try {
      const res = await axios.post('/api/v1/techs', newTech);
      const tech = res.data;

      dispatch({
        type: ADD_TECH,
        payload: tech.data,
        message: `${tech.data.fullName} Added.`
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Delete Tech
  const deleteTech = async tech => {
    try {
      await axios.delete(`/api/v1/techs/${tech._id}`);

      dispatch({
        type: DELETE_TECH,
        payload: tech._id,
        message: `${tech.fullName} Deleted.`
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Set Current Tech
  const setCurrentTech = tech => {
    dispatch({
      type: SET_CURRENT_TECH,
      payload: tech
    });
  };

  // Update Tech
  const updateTech = async uptTech => {
    try {
      const res = await axios.put(`/api/v1/techs/${uptTech._id}`, uptTech);
      const tech = res.data;

      dispatch({
        type: UPDATE_TECH,
        payload: tech.data,
        message: `${tech.data.fullName} Updated.`
      });
    } catch (error) {
      dispatch({
        type: TECHS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  return (
    <techContext.Provider
      value={{
        techs,
        current,
        error,
        message,
        getTechs,
        addTech,
        deleteTech,
        setCurrentTech,
        updateTech
      }}
    >
      {props.children}
    </techContext.Provider>
  );
};

export default TechState;
