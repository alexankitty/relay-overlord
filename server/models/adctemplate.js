const mongoose = require('mongoose')

const adcTemplateSchema = new mongoose.Schema({
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
  },
  formula: {
    type: String
  },
  unit: {
    type: String
  }
})

module.exports = mongoose.model('ADCTemplate', adcTemplateSchema)
