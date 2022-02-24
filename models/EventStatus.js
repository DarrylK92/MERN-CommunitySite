const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventStatusSchema = new Schema({
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('eventStatus', EventStatusSchema);
