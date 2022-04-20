import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvent, deletePosition, deleteVolunteer } from '../../actions/event';

const PositionsList = ({
  deletePosition,
  getEvent,
  deleteVolunteer,
  event: { event }
}) => {
  let eventId = event._id;

  useEffect(() => {
    getEvent(eventId);
  }, [getEvent, deleteVolunteer]);

  let eventText = '';

  eventText = 'Event: ' + event.name;

  let positionsContent;

  if (event.positions.length > 0) {
    positionsContent = event.positions.map((onePosition) => (
      <>
        <tr key={onePosition.id}>
          <td>{onePosition.name}</td>
          <td>{onePosition.requestedSkills.join(', ')}</td>
          <td>
            {onePosition.volunteer == undefined || onePosition.volunteer == null
              ? 'Empty'
              : 'Filled'}
          </td>
          <td>
            {event.eventStatus.status !== 'Completed' && (
              <button className="btn btn-secondary">
                <Link
                  to={
                    '/edit-event/edit-position/' +
                    event._id +
                    '/' +
                    onePosition._id
                  }
                >
                  Edit
                </Link>
              </button>
            )}
          </td>
          <td>
            {event.eventStatus.status !== 'Completed' && (
              <button
                onClick={() => {
                  deletePosition(eventId, onePosition._id);
                  getEvent(eventId);
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            )}
          </td>
          <td>
            {onePosition.volunteer !== undefined &&
              onePosition.volunteer !== null && (
                <button
                  onClick={() => {
                    deleteVolunteer(eventId, onePosition._id);
                    getEvent(eventId);
                  }}
                  className="btn btn-danger"
                >
                  Remove volunteer
                </button>
              )}
          </td>
        </tr>
      </>
    ));
  }

  const { event_id } = useParams();

  let goBackLink = '/edit-event/' + event_id;
  let addPositionLink = '/edit-event/add-position/' + event_id;

  return (
    <section className="container">
      <h1 className="large text-primary">Edit Positions</h1>
      <p className="lead">{eventText}</p>
      {event.eventStatus.status !== 'Completed' && (
        <>
          <Link to={addPositionLink} className="btn btn-light">
            <i className="fas fa-plus-square text-primary" /> Add Position
          </Link>
        </>
      )}
      {event.positions.length > 0 ? (
        <>
          <h2 className="my-2">Your Positions</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Skills Required</th>
                <th className="hide-sm">Status</th>
                <th />
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{positionsContent}</tbody>
          </table>
        </>
      ) : (
        <div>
          {event.eventStatus.status !== 'Completed' && (
            <p>You have not created any positions yet!</p>
          )}
        </div>
      )}
      <div className="my-2">
        <Link className="btn btn-light my-1" to={goBackLink}>
          Go Back
        </Link>
      </div>
    </section>
  );
};

Event.PropTypes = {
  event: PropTypes.object.isRequired,
  deletePosition: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  deleteVolunteer: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event
});

export default connect(mapStateToProps, {
  deletePosition,
  getEvent,
  deleteVolunteer
})(PositionsList);
