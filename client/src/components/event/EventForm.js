import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent, getEvent } from '../../actions/event';

let initialState = {
  name: '',
  date: '',
  description: '',
  address: '',
  city: '',
  state: ''
};

const AddEvent = ({ createEvent, getEvent, event: { event, loading } }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const { id } = useParams();
  useEffect(() => {
    if (id !== null && id !== undefined) {
      getEvent(id);

      if (!loading && event) {
        const eventData = { ...initialState };
        for (const key in event) {
          if (key in eventData) eventData[key] = event[key];
        }

        setFormData(eventData);
      }
    }
  }, [loading, getEvent, event]);

  const { name, date, description, address, city, state } = formData;

  let titleText = 'Add Event';

  if (id !== null && id !== undefined) {
    titleText = 'Edit Event';
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">{titleText}</h1>
      <p className="lead">Event details:</p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          createEvent(formData, navigate);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Event Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <div className="form-group">
            <h4>Event Date</h4>
            <input type="date" name="date" value={date} onChange={onChange} />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Event Description"
              value={description}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Event Address"
              name="address"
              value={address}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Event City"
              name="city"
              value={city}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <select name="state" value={state} onChange={onChange}>
              <option>* Select State</option>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AZ">AZ</option>
              <option value="AR">AR</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="IA">IA</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="ME">ME</option>
              <option value="MD">MD</option>
              <option value="MA">MA</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MS">MS</option>
              <option value="MO">MO</option>
              <option value="MT">MT</option>
              <option value="NE">NE</option>
              <option value="NV">NV</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NY">NY</option>
              <option value="NC">NC</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WV">WV</option>
              <option value="WI">WI</option>
              <option value="WY">WY</option>
            </select>
            <small className="form-text">Event State</small>
          </div>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event
});

export default connect(mapStateToProps, { createEvent, getEvent })(AddEvent);
