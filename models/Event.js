const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  eventStatus: {
    type: Schema.Types.ObjectId,
    ref: 'eventStatus'
  },
  positions: [
    {
      position: {
        type: Schema.Types.ObjectId,
        ref: 'position'
      }
    }
  ],
  volunteers: [
    {
      volunteer: {
        type: Schema.Types.ObjectId,
        ref: 'volunteer'
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('event', EventSchema);
