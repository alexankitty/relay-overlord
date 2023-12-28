const mongoose = require('mongoose')

const gpioTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  addressingScheme: {
    type: String,
    required: true
  },
  setAddress: {
    type: String,
  },
  getAddress: {
    type: String,
  },
  count: {
    type: String,
    required: true
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  }
})

module.exports = mongoose.model('GPIOTemplate', gpioTemplateSchema)
