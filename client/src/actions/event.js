import api from '../utils/api';
import { setAlert } from './alert';

import {
  EVENT_CREATED,
  EVENT_DELETED,
  EVENT_UPDATED,
  GET_EVENT,
  GET_EVENTS,
  EVENT_ERROR,
  CLEAR_EVENT
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

//Get all open events
export const getOpenEvents = () => async (dispatch) => {
  try {
    const res = await api.get(`/event/all/open/`);

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {}
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

//Clear event
export const clearEvent = () => async (dispatch) => {
  dispatch({
    type: CLEAR_EVENT
  });
};

//Create or update position
export const createPosition =
  (event_id, formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post(`/event/position/${event_id}`, formData);

      dispatch({
        type: GET_EVENT,
        payload: res.data
      });

      dispatch(
        setAlert(edit ? 'Position Updated' : 'Position Created', 'success')
      );

      navigate('/edit-event/edit-positions/' + formData.id);
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

//Get position data
export const getPosition = (event_id, position_id) => async (dispatch) => {
  try {
    const res = await api.get(`/event/position/${event_id}/${position_id}`);

    return res;
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

//Delete position
export const deletePosition = (event_id, position_id) => async (dispatch) => {
  try {
    const res = await api.delete(`/event/position/${event_id}/${position_id}`);

    dispatch({
      type: EVENT_DELETED
    });

    dispatch(setAlert('Position deleted'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete volunteer
export const deleteVolunteer = (event_id, position_id) => async (dispatch) => {
  try {
    const res = await api.delete(
      `/event/position/volunteer/${event_id}/${position_id}`
    );

    dispatch({
      type: EVENT_DELETED
    });

    dispatch(setAlert('Volunteer removed'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add volunteer
export const addVolunteer = (event_id, position_id) => async (dispatch) => {
  try {
    const res = await api.put(
      `/event/position/volunteer/${event_id}/${position_id}`
    );

    dispatch({
      type: EVENT_UPDATED
    });

    dispatch(setAlert('Signed up for event!'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};