const { response, user } = require('../classes')
const mongoose = require('mongoose')
const Role = require('../models/role')
const User = require('../models/user')
const { controllers: { users: STRINGS } = {} } = require('../MAGIC_STRINGS')

exports.getRole = async (req, res) => {
    try {
      const { _id, createdTime, email, isActive, roles, username } = res.user
      const user = { _id, createdTime, email, isActive, roles, username }
      response.successed(res, user)
    } catch (err) {
      res.status(200).json(new response.fail(err.message))
    }
  }

exports.deleteRole = async (req, res) => {
    try {
      await res.role.remove()
  
      const { _id } = res.user
      response.successed(res, { _id }, STRINGS.userDeleted)
    } catch (err) {
      return res.status(200).json(new response.fail(err.message))
    }
  }