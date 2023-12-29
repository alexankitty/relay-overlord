const { response, user } = require('../classes')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Role = require('../models/role')
const User = require('../models/user')
const { randomInt } = require('node:crypto')
const { controllers: { users: STRINGS } = {} } = require('../MAGIC_STRINGS')

exports.getUser = async (req, res) => {
  try {
    const { _id, createdTime, email, isActive, roles, username } = res.user
    const user = { _id, createdTime, email, isActive, roles, username }

    response.successed(res, user)
  } catch (err) {
    res.status(200).json(new response.fail(err.message))
  }
}

exports.getUsers = async (req, res) => {
  try{
    const users = await User.find().toObject()
    console.log(users)
    response.successed(res, users)
  }catch (err) {
    res.status(200).json(new response.fail(err.message))
  }
}

exports.updateUser = async (req, res) => {
  try {
    let anyError = []
    const { _id, username, email, isActive, password } = req.body
    let { roles } = req.body

    if (username && username.length < 4) {
      anyError.push('Username should be more than 3 characters.')
    }

    if (email && !user.mail.validateEmail(email)) {
      anyError.push('Email adress should be a valid email.')
    }

    if (password && password.length < 8) {
      anyError.push('Password should be more than 7 characters.')
    }

    if (roles.length === 0) {
      anyError.push(STRINGS.rolesCanNotBeEmpty)
    }
    else {
      Role.find({ "_id": { $in: roles } }).exec((err, role) => {
        if (err) {
          return res.status(200).send(new response.fail(err))
        }
          res.user.roles = role

      })
    }

    if (anyError.length > 0) {
      response.failed(res, anyError)
    } else {
      if (username !== res.user.username) {
        res.user.username = username
      }

      if (email !== res.user.email) {
        res.user.email = email
      }

      if (password) {
        res.user.password = bcrypt.hashSync(password, 8)
      }

      if (isActive) {
        res.user.isActive = isActive
      }
      res.user.markModified('roles')
      await res.user.save(async (err, user ) => console.log(user.toObject()))
      response.successed(res, { ...res.user.toObject() }, 'User has been successfully updated!')
    }
  } catch (err) {
    response.failed(res, err.message)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await res.user.remove()

    const { _id } = res.user
    response.successed(res, { _id }, STRINGS.userDeleted)
  } catch (err) {
    return res.status(200).json(new response.fail(err.message))
  }
}

exports.createUser = async (req, res) => {
  const { email, password, roles, username } = req.body
  try {
    let anyError = []
    if (username && username.length < 4) {
      anyError.push('Username should be more than 3 characters.')
    }

    if (password && password.length < 8) {
      anyError.push('Password should be more than 7 characters.')
    }

    if (roles.length === 0) {
      anyError.push(STRINGS.rolesCanNotBeEmpty)
    }
    if (anyError.length > 0) {
      response.failed(res, anyError)
      return
    }
    const authCode =
      randomInt(1000_000_000).toString().padStart(12, '0') + randomInt(1000_000_000).toString().padStart(12, '0')

    let user = new User({
      authCode,
      email,
      password: bcrypt.hashSync(password, 8),
      username
    })
    await user.save(async (err, user) => {
      if (err) {
        return res.status(200).send(new response.fail(err))
      }
      Role.find({ "_id": { $in: roles } }, async (err, role) => {
        if (err) {
          return res.status(200).send(new response.fail(err))
        }

        user.roles = role
        console.log(role)
        await user.save((err, user) => {
          if (err) {
            return res.status(200).send(new response.fail(err))
          }
          
          response.successed(
            res,
            {...user.toObject()},
            STRINGS.userCreated
          )
        })
      })
    })
    user = User.findById(user._id)
  } catch (err) {
    return res.status(200).json(new response.fail(err.message))
  }
}
