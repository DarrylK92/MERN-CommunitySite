import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import {
  getAllEvents,
  clearEvent,
  getEventsSignedUpFor
} from '../../actions/event';
import Spinner from '../layout/Spinner';
import Event from './Event';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  getAllEvents,
  getEventsSignedUpFor,
  clearEvent,
  auth: { user },
  profile: { profile },
  event: { loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    clearEvent();
    if (user !== null) {
      if (user.type === 'Organizer') {
        getAllEvents(user._id);
      } else if (user.type === 'Volunteer') {
        getEventsSignedUpFor(user._id);
      }
    } else {
      window.location.reload(false);
    }
  }, [getCurrentProfile, getAllEvents, clearEvent, getEventsSignedUpFor]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {loading === true && <Spinner />}
      {profile !== null && loading === false ? (
        <>
          <DashboardActions />

          <Event />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getAllEvents: PropTypes.func.isRequired,
  clearEvent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getEventsSignedUpFor: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  event: state.event
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getAllEvents,
  clearEvent,
  getEventsSignedUpFor
})(Dashboard);
