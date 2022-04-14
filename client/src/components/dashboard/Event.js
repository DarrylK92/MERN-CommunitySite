import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent, deleteEvent } from '../../actions/event';
import formatDate from '../../utils/formatDate';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Event = ({
  createEvent,
  deleteEvent,
  event: { events },
  auth: { user }
}) => {
  let eventsContent;

  if (user !== null && user !== undefined) {
    if (events !== null && events !== undefined) {
      eventsContent = events.map((oneEvent) => (
        <>
          <tr key={oneEvent._id}>
            <td>{oneEvent.name}</td>
            <td className="hide-sm">{oneEvent.description}</td>
            <td>{formatDate(oneEvent.date)}</td>
            <td>{oneEvent.eventStatus.status}</td>
            {user.type === 'Organizer' && (
              <>
                <td>
                  <button className="btn btn-secondary">
                    <Link to={'/edit-event/' + oneEvent._id}>Edit</Link>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteEvent(oneEvent._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
            {user.type === 'Volunteer' && (
              <>
                <td>
                  <button className="btn btn-secondary">
                    <Link to={'/event/' + oneEvent._id}>Event Details</Link>
                  </button>
                </td>
                <td>
                  <button className="btn btn-secondary">
                    <Link to={'/event/positions/' + oneEvent._id}>
                      View Positions
                    </Link>
                  </button>
                </td>
              </>
            )}
          </tr>
        </>
      ));
    }
  }

  return (
    <Fragment>
      {eventsContent === null || eventsContent === undefined ? (
        <Spinner />
      ) : (
        <>
          <h2 className="my-2">Your Events</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Description</th>
                <th className="hide-sm">Date</th>
                <th className="hide-sm">Status</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{eventsContent}</tbody>
          </table>
        </>
      )}
    </Fragment>
  );
};

Event.propTypes = {
  createEvent: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps, {
  createEvent,
  deleteEvent
})(Event);
