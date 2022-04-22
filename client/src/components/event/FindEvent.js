import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOpenEvents, clearEvent } from '../../actions/event';
import Spinner from '../layout/Spinner';
const moment = require('moment');

const FindEvent = ({ getOpenEvents, clearEvent, event: { events, loading } }) => {
  useEffect(() => {
    clearEvent();
    getOpenEvents();
  }, [getOpenEvents, clearEvent]);

  let eventsContent;

  const backUrl = '/find-event';

  if (events.length > 0) {
    eventsContent = events.map((oneEvent) => (
      <>
        <tr key={oneEvent._id}>
          <td>{oneEvent.user.name}</td>
          <td>{oneEvent.name}</td>
          <td>{moment(oneEvent.date).format('YYYY-MM-DD')}</td>
          <td>{oneEvent.city}</td>
          <td>{oneEvent.state}</td>
          <td>
            <button className="btn btn-secondary">
              <Link to={'/event/' + oneEvent._id} state={{ backUrl: backUrl }}>
                Event Details
              </Link>
            </button>
          </td>
          <td>
            <button className="btn btn-secondary">
              <Link to={'/event/positions/' + oneEvent._id} state={{ backUrl: backUrl }}>
                View Positions
              </Link>
            </button>
          </td>
        </tr>
      </>
    ));
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Open Events</h1>
      {loading === true && <Spinner />}
      {events.length > 0 && loading === false ? (
        <>
          <h2 className="my-2">Events List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Organization</th>
                <th className="hide-sm">Name</th>
                <th className="hide-sm">Date</th>
                <th className="hide-sm">City</th>
                <th className="hide-sm">State</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{eventsContent}</tbody>
          </table>
        </>
      ) : (
        <div>
          <p>There are no events!</p>
        </div>
      )}
      <div className="my-2">
        <Link className="btn btn-light my-1" to="/Dashboard">
          Go Back
        </Link>
      </div>
    </section>
  );
};

Event.PropTypes = {
  event: PropTypes.object.isRequired,
  getOpenEvents: PropTypes.func.isRequired,
  clearEvent: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event
});

export default connect(mapStateToProps, { getOpenEvents, clearEvent })(FindEvent);
