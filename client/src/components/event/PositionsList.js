import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PositionsList = ({ event: { event } }) => {
  let eventText = '';

  eventText = 'Event: ' + event.name;

  let positionsContent;

  if (event.positions.length > 0) {
    positionsContent = event.positions.map((onePosition) => (
      <>
        <tr key={onePosition.id}>
          <td>{onePosition.name}</td>
          <td>{onePosition.requestedSkills.join(', ')}</td>
          <td>{onePosition.volunteer == '' ? 'Empty' : 'Filled'}</td>
        </tr>
      </>
    ));
  }

  const { event_id } = useParams();
  console.log(event_id);

  let goBackLink = '/edit-event/' + event_id;

  return (
    <section className="container">
      <h1 className="large text-primary">Edit Positions</h1>
      <p className="lead">{eventText}</p>
      <>
        <Link to="/create-position" className="btn btn-light">
          <i className="fas fa-plus-square text-primary" /> Add Position
        </Link>
      </>
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
              </tr>
            </thead>
            <tbody>{positionsContent}</tbody>
          </table>
        </>
      ) : (
        <div>
          <p>You have not created any positions yet!</p>
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
  event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event
});

export default connect(mapStateToProps, null)(PositionsList);
