const mongoose = require('mongoose')

const relaySchema = new mongoose.Schema({
  name: {
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
  device: {
    type: Device
  },
  events: {
    type: mongoose.Types.ObjectId,
    ref: "Event"
  },
  template: {
    type: Template
  }
})

module.exports = mongoose.model('Relay', relaySchema)
