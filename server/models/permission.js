const mongoose = require('mongoose')

const Permission = mongoose.model(
  'Permission',
  new mongoose.Schema({
    name: String,
    page: String
  })
)

module.exports = Permission
