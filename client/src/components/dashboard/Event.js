import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent, deleteEvent } from '../../actions/event';
import formatDate from '../../utils/formatDate';
import Spinner from '../layout/Spinner';

const Event = ({ createEvent, deleteEvent, event: { events } }) => {
  let eventsContent;

  if (events !== null && events !== undefined) {
    eventsContent = events.map((oneEvent) => (
      <>
        <tr key={oneEvent._id}>
          <td>{oneEvent.name}</td>
          <td className="hide-sm">{oneEvent.description}</td>
          <td>{formatDate(oneEvent.date)}</td>
          <td>
            <button
              onClick={() => createEvent(oneEvent._id)}
              className="btn btn-secondary"
            >
              Edit
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
        </tr>
        ;
      </>
    ));
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
  event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event
});

export default connect(mapStateToProps, {
  createEvent,
  deleteEvent
})(Event);
