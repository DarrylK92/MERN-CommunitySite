import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOpenEvents } from '../../actions/event';
const moment = require('moment');

const FindEvent = ({ getOpenEvents, event: { events } }) => {
  useEffect(() => {
    getOpenEvents();
  }, [getOpenEvents]);

  let eventsContent;

  if (events.length > 0) {
    eventsContent = events.map((oneEvent) => (
      <>
        <tr key={oneEvent.id}>
          <td>{oneEvent.user.name}</td>
          <td>{oneEvent.name}</td>
          <td>{moment(oneEvent.date).format('YYYY-MM-DD')}</td>
          <td>{oneEvent.city}</td>
          <td>{oneEvent.state}</td>
          <td>
            <button className="btn btn-secondary">
              <Link to={'/event/' + oneEvent.id}>Event Details</Link>
            </button>
          </td>
          <td>
            <button className="btn btn-secondary">
              <Link to={'/event/positions/' + oneEvent.id}>View Positions</Link>
            </button>
          </td>
        </tr>
      </>
    ));
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Open Events</h1>
      {events.length > 0 ? (
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
  getOpenEvents: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event
});

export default connect(mapStateToProps, { getOpenEvents })(FindEvent);
