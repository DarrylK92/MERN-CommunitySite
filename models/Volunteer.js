const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'event'
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: 'position'
  }
});

module.exports = mongoose.model('volunteer', VolunteerSchema);
