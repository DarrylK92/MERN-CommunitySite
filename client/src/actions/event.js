import api from '../utils/api';
import { setAlert } from './alert';

import {
  EVENT_CREATED,
  EVENT_DELETED,
  EVENT_UPDATED,
  GET_EVENT,
  GET_EVENTS,
  EVENT_ERROR
} from './types';

//Create or update event
export const createEvent =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post('/event', formData);

      dispatch({
        type: GET_EVENT,
        payload: res.data
      });

      dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));

      if (!edit) {
        navigate('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: EVENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

//Delete event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/event/${id}`);

    dispatch({
      type: EVENT_DELETED
    });

    dispatch(setAlert('Event deleted'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get all events for user
export const getAllEvents = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/event/all/${id}`);

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {}
};

//Get event
export const getEvent = (id) => async (dispatch) => {
  try {
    const res = await api.get(`event/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
