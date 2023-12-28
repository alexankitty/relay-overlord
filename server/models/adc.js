const mongoose = require('mongoose')

const adcSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  formula: {
    type: String,
  },
  unit: {
    type: String
  },
  device: {
    type: Device
  },
  events: {
    type: mongoose.Types.ObjectId,
    ref: "Events"
  },
  template: {
    type: Template
  }
})

module.exports = mongoose.model('ADC', adcSchema)
