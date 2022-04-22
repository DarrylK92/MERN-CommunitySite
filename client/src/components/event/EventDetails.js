import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEvent } from '../../actions/event';
const moment = require('moment');

let initialState = {
  name: '',
  date: '',
  description: '',
  address: '',
  city: '',
  state: '',
  _id: ''
};

const EventDetails = ({ getEvent, event: { event, loading } }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const location = useLocation();
  const backUrl = location.state.backUrl;

  const { id } = useParams();
  useEffect(() => {
    if (id !== null && id !== undefined) {
      if (event === null) {
        getEvent(id);
      }

      if (!loading && event) {
        const eventData = { ...initialState };
        for (const key in event) {
          if (key in eventData) eventData[key] = event[key];

          if (key == 'date') {
            eventData[key] = moment(event[key]).format('YYYY-MM-DD');
          }
        }

        setFormData(eventData);
      }
    }
  }, [loading, getEvent, event]);

  const { name, date, description, address, city, state } = formData;

  let titleText = 'Event Details';

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">{titleText}</h1>
      <h2>Name</h2>
      <p className="details-display">{name}</p>
      <h2>Date</h2>
      <p className="details-display">{date}</p>
      <h2>Description</h2>
      <p className="details-display">{description}</p>
      <h2>Address</h2>
      <p className="details-display">{address}</p>
      <h2>City</h2>
      <p className="details-display">{city}</p>
      <h2>State</h2>
      <p className="details-display">{state}</p>
      <Link className="btn btn-light my-1" to={backUrl}>
        Go Back
      </Link>
    </section>
  );
};

EventDetails.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvent })(EventDetails);
