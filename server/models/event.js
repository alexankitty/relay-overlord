const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  valueOn: {
    type: Number,
    required: true
  },
  valueOff: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  isLatching: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  }
})

module.exports = mongoose.model('Event', eventSchema)
