const mongoose = require('mongoose')

const gpioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  inverse: {
    type: Boolean,
    required: true
  },
  disabled: {
    type: Boolean,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  startup: {
    type: String,
    required: true
    },
  address: {
    type: String,
    required: true
  },
  events: {
    type: mongoose.Types.ObjectId,
    ref: "Events"
  },
  template: {
    type: Template
  }
})

module.exports = mongoose.model('GPIO', gpioSchema)
