import api from '../utils/api';
import { setAlert } from './alert';

import {
  EVENT_CREATED,
  EVENT_DELETED,
  EVENT_UPDATED,
  GET_EVENT,
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
