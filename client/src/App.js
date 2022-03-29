import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import RegisterVolunteer from './components/auth/RegisterVolunteer';
import RegisterOrganization from './components/auth/RegisterOrganization';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import ProfileForm from './components/profile-forms/ProfileForm';
import PositionsList from './components/event/PositionsList';
import EventForm from './components/event/EventForm';
import PositionForm from './components/event/PositionForm';
import Profile from './components/profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register-volunteer" element={<RegisterVolunteer />} />
          <Route
            path="register-organization"
            element={<RegisterOrganization />}
          />
          <Route path="login" element={<Login />} />
          <Route
            path="profile/:id"
            element={<PrivateRoute component={Profile} />}
          />
          <Route
            path="create-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="edit-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="create-event"
            element={<PrivateRoute component={EventForm} />}
          />
          <Route
            path="edit-event/:id"
            element={<PrivateRoute component={EventForm} />}
          />
          <Route
            path="edit-event/edit-positions/:event_id"
            element={<PrivateRoute component={PositionsList} />}
          />
          <Route
            path="edit-event/add-position/:event_id"
            element={<PrivateRoute component={PositionForm} />}
          />
          <Route
            path="edit-event/edit-position/:event_id/:position_id"
            element={<PrivateRoute component={PositionForm} />}
          />
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
