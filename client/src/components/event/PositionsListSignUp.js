import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvent, deleteVolunteer, addVolunteer } from '../../actions/event';

const PositionsListSignUp = ({
  addVolunteer,
  getEvent,
  deleteVolunteer,
  event: { event },
  auth: { user }
}) => {
  let { event_id } = useParams();
  const location = useLocation();
  const backUrl = location.state.backUrl;

  useEffect(() => {
    getEvent(event_id);
  }, [getEvent, deleteVolunteer, addVolunteer]);

  let eventText = 'Event: ';
  let positionsContent;

  let alreadySignedUpForPosition;

  if (event !== null && event !== undefined) {
    eventText = 'Event: ' + event.name;

    alreadySignedUpForPosition = event.positions.find(
      (position) => position.volunteer === user._id
    );

    if (event.positions.length > 0) {
      positionsContent = event.positions.map((onePosition) => (
        <>
          <tr key={onePosition.id}>
            <td>{onePosition.name}</td>
            <td>{onePosition.requestedSkills.join(', ')}</td>
            <td>
              {onePosition.volunteer == undefined ||
              onePosition.volunteer == null
                ? 'Empty'
                : 'Filled'}
            </td>
            <td>
              {event.eventStatus.status !== 'Completed' &&
                (onePosition.volunteer === undefined ||
                  onePosition.volunteer === null) &&
                (alreadySignedUpForPosition === undefined ||
                  alreadySignedUpForPosition === null) && (
                  <button
                    onClick={() => {
                      addVolunteer(event_id, onePosition._id);
                      window.location.reload(false);
                    }}
                    className="btn btn-danger"
                  >
                    Sign Up
                  </button>
                )}
            </td>
            <td>
              {event.eventStatus.status !== 'Completed' &&
                onePosition.volunteer === user._id && (
                  <button
                    onClick={() => {
                      deleteVolunteer(event_id, onePosition._id);
                      window.location.reload(false);
                    }}
                    className="btn btn-danger"
                  >
                    Cancel Sign Up
                  </button>
                )}
            </td>
          </tr>
        </>
      ));
    }
  }

  return (
    <section className="container">
      <h1 className="large text-primary">View Positions</h1>
      <p className="lead">{eventText}</p>
      {event !== null && event !== undefined && event.positions.length > 0 ? (
        <>
          <h2 className="my-2">Positions</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Skills Required</th>
                <th className="hide-sm">Status</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{positionsContent}</tbody>
          </table>
        </>
      ) : (
        <div>
          <p>There are no positions for this event!</p>
        </div>
      )}
      <div className="my-2">
        <Link className="btn btn-light my-1" to={backUrl}>
          Go Back
        </Link>
      </div>
    </section>
  );
};

Event.PropTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addVolunteer: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  deleteVolunteer: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps, {
  addVolunteer,
  getEvent,
  deleteVolunteer
})(PositionsListSignUp);
