const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const checkObjectId = require('../../middleware/checkObjectId');

const Event = require('../../models/Event');
const Profile = require('../../models/Profile');
const Volunteer = require('../../models/Volunteer');
const EventStatus = require('../../models/EventStatus');

// @route    GET api/event/:event_id
// @desc     Get event by event ID
// @access   Public
router.get(
  '/:event_id',
  checkObjectId('event_id'),
  async ({ params: { event_id } }, res) => {
    try {
      const event = await Event.findById(req.params.event_id);

      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      res.json(event);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/event
// @desc     Create an event
// @access   Private
router.post(
  '/',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('date', 'Date is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('address', 'Address is required').notEmpty(),
  check('address', 'Address is required').notEmpty(),
  check('city', 'City is required').notEmpty(),
  check('state', 'State is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const eventStatus = await EventStatus.findOne({ status: 'Open' });

      const newEvent = new Event({
        name: req.body.name,
        date: req.body.date,
        description: req.body.description,
        address: req.body.address,
        city: req.body.city,
        stsate: req.body.state,
        eventStats: eventStatus.id,
        userId: user.id
      });

      const event = await newEvent.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/event/:event_id
// @desc     Update an event
// @access   Private
router.post(
  '/',
  [auth, checkObjectId('event_id')],
  check('name', 'Name is required').notEmpty(),
  check('date', 'Date is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('address', 'Address is required').notEmpty(),
  check('address', 'Address is required').notEmpty(),
  check('city', 'City is required').notEmpty(),
  check('state', 'State is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const event = await Event.findById(req.params.event_id);
      const user = await User.findById(req.user.id).select('-password');
      const eventStatus = await EventStatus.findOne({ status: 'Open' });

      event.name = req.body.name;
      event.date = req.body.date;
      event.description = req.body.description;
      event.address = req.body.address;
      event.city = req.body.city;
      event.state = req.body.state;

      await event.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/event/:event_id
// @desc     Delete event
// @access   Private
router.delete(
  '/:event_id',
  [auth, checkObjectId('event_id')],
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.event_id);

      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      // Check user
      if (event.userId.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      await event.remove();

      res.json({ msg: 'Event deleted' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);
