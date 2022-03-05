import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById, getCurrentProfile } from '../../actions/profile';
import setAuthToken from '../../utils/setAuthToken';

const Profile = ({
  getProfileById,
  getCurrentProfile,
  profile: { profile },
  auth
}) => {
  const { id } = useParams();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (id === 'me') {
      getCurrentProfile();
    } else {
      getProfileById(id);
    }
  }, [getProfileById, getCurrentProfile, id]);

  let backButtonText;
  if (auth.user.type === 'Volunteer') {
    backButtonText = 'Back To Volunteers';
  } else {
    backButtonText = 'Back To Organizers';
  }

  return (
    <section className="container">
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            {backButtonText}
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById, getCurrentProfile })(
  Profile
);
