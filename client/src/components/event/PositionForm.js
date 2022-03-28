import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPosition } from '../../actions/event';

let initialState = {
  name: '',
  requestedSkills: '',
  amount: '1',
  _id: ''
};

const AddPosition = ({ createPosition, position }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const { event_id, position_id } = useParams();

  const { name, requestedSkills, amount, _id } = formData;

  let titleText = 'Add Position';
  let goBackLink = '/edit-event/edit-positions/' + event_id;

  if (position_id !== null && position_id !== undefined) {
    titleText = 'Edit Position';
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">{titleText}</h1>
      <p className="lead">Position details:</p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();

          if (position_id !== null && position_id !== undefined) {
            createPosition(event_id, formData, navigate, true);
          } else {
            createPosition(event_id, formData, navigate);
          }
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Position Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <div className="form-group">
            <textarea
              name="requestedSkills"
              cols="30"
              rows="5"
              placeholder="Requested Skills"
              value={requestedSkills}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Amount"
              name="amount"
              value={amount}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to={goBackLink}>
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddPosition.propTypes = {
  createPosition: PropTypes.func.isRequired
};

export default connect(null, { createPosition })(AddPosition);
