const mongoose = require('mongoose')

const Role = mongoose.model(
  'Role',
  new mongoose.Schema({
    name: String,
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

module.exports = Role
