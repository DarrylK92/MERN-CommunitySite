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

// @route    POST api/event/position/:event_id
// @desc     Create an event
// @access   Private
router.post(
  '/event/position/:event_id',
  auth,
  checkObjectId('event_id'),
  check('name', 'Name is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const event = await Event.findById(req.params.event_id);

      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      const { name, requestedSkills } = req.body;

      const newPosition = {
        event: event_id,
        name: name,
        requestedSkills: Array.isArray(requestedSkills)
          ? requestedSkills
          : requestedSkills
              .split(',')
              .map((requestedSkills) => ' ' + requestedSkills.trim())
      };

      event.positions.unshift(newPosition);

      await event.save();

      res.json(event.positions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/event/position/:event_id/:position_id
// @desc     Delete position
// @access   Private
router.delete(
  '/event/position/:event_id/:position_id',
  auth,
  checkObjectId('event_id'),
  checkObjectId('position_id'),
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.event_id);

      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      const position = event.positions.find(
        (position) => position.id === req.params.position_id
      );

      if (!position) {
        return res.status(404).json({ msg: 'Position does not exist' });
      }

      if (event.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      event.positions = event.positions.filter(
        ({ id }) => id !== req.params.position_id
      );

      await event.save();

      return res.json(event.positions);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/event/volunteer/:event_id
// @desc     Create an volunteer
// @access   Private
router.post(
  '/event/position/volunteer/:event_id/:position_id',
  auth,
  checkObjectId('event_id'),
  checkObjectId('position_id'),
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.event_id);

      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      alreadyRegisteredVolunteer = event.volunteers.filter(
        ({ position }) => position === req.params.position_id
      );

      if (alreadyRegisteredVolunteer) {
        return res.status(401).json({ msg: 'Position already filled' });
      }

      if (req.user.type === 'Organizer') {
        return res.status(401).json({ msg: 'Organizers cannot volunteer' });
      }

      const newVolunteer = {
        user: req.user.id,
        event: req.params.event_id,
        position: req.params.position_id
      };

      event.volunteers.unshift(newVolunteer);

      await event.save();

      res.json(event.volunteers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/event/position/volunteer/:event_id/:position_id/:volunteer_id
// @desc     Delete volunteer
// @access   Private
router.delete(
  '/event/position/volunteer/:event_id/:position_id/:volunteer_id',
  auth,
  checkObjectId('event_id'),
  checkObjectId('position_id'),
  checkObjectId('volunteer_id'),
  async (req, res) => {
    try {
      const event = await Event.findById(req.params.event_id);

      if (!event) {
        return res.status(404).json({ msg: 'Event not found' });
      }

      const position = await Position.findById(req.params.position_id);

      if (!position) {
        return res.status(404).json({ msg: 'Position does not exist' });
      }

      const volunteer = await Volunteer.findById(req.params.volunteer_id);

      if (!volunteer) {
        return res.status(404).json({ msg: 'Volunteer does not exist' });
      }

      if (volunteer.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      event.volunteers = event.volunteers.filter(
        ({ id }) => id !== req.params.volunteer_id
      );

      await event.save();

      return res.json(event.volunteers);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
