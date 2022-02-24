const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'event'
  },
  name: {
    type: String,
    required: true
  },
  requestedSkills: {
    type: [String]
  }
});

module.exports = mongoose.model('position', PositionSchema);
