import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const DashboardActions = ({ user }) => {
  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [loadUser]);

  let extraButtonsDisplay;

  if (user !== null) {
    if (user.type === 'Organizer') {
      extraButtonsDisplay = (
        <Link to="/add-event" className="btn btn-light">
          <i className="fas fa-plus-square text-primary" /> Add Event
        </Link>
      );
    }
  }

  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Edit Profile
      </Link>
      {extraButtonsDisplay}
    </div>
  );
};

DashboardActions.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(DashboardActions);
