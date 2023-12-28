const mongoose = require('mongoose')

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isActive: {
      type: Boolean,
      default: false
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
      }
    ],
    createdTime: {
      type: Date,
      required: true,
      default: +new Date()
    },
    authCode: {
      type: String,
      required: false
    },
    permissions: {
      type: mongoose.Types.ObjectId,
      ref: "Permission"},
    relays: {
      type: mongoose.Types.ObjectId,
      ref: "Relay"},
    adcs: {
      type: mongoose.Types.ObjectId,
      ref: "ADC"},
    gpios: {
      type: mongoose.Types.ObjectId,
      ref: "GPIO"}
  })
)

module.exports = User
