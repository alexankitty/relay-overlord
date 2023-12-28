const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  relays: {
    type: mongoose.Types.ObjectId,
    ref: "Relay"
  },
  relayAddressing: {
    type: String
  },

  adcs: {
    type: mongoose.Types.ObjectId,
    ref: "ADC"
  },
  adcAddressing: {
    type: String
  },

  gpios: {
    type: mongoose.Types.ObjectId,
    ref: "GPIO"
  },
  gpioAddressing: {
    type: String
  },
  template: {
    type: DeviceTemplate
  },
  relayTemplate: {
    type: RelayTemplate
  },
  adcTemplate: {
    type: ADCTemplate
  },
  gpioTemplate: {
    type: GPIOTemplate
  }
})

module.exports = mongoose.model('Device', deviceSchema)
