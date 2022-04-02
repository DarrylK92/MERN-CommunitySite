import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const FindEvent = ({ event: { events } }) => {
  let eventsContent;

  return (
    <section className="container">
      <h1 className="large text-primary">Open Events</h1>
      <p className="lead">Events</p>
      {events.length > 0 ? (
        <>
          <h2 className="my-2">Events</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Organization</th>
                <th className="hide-sm">Name</th>
                <th className="hide-sm">Date</th>
                <th className="hide-sm">City</th>
                <th className="hide-sm">State</th>
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
  event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event
});

export default connect(mapStateToProps, null)(FindEvent);
