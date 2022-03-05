const mongoose = require('mongoose');

const OrganizerProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('organizerProfile', OrganizerProfileSchema);