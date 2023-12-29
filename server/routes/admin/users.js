const express = require('express')
const router = express.Router()
const { getUser } = require('../../middlewares/user')
const controller = require('../../controllers/users')
const { getGeneric } = require('../../controllers/generic')
const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require('../../middlewares/user/verifySignUp')
const dbQuery = require('../../middlewares/utils/dbQuery')
const Role = require('../../models/role')
const User = require('../../models/user')

router
  .route('/')
  .get(dbQuery(User, [{ path: 'roles' }], ['password']), getGeneric)
  .post(checkDuplicateUsernameOrEmail, checkRolesExisted, controller.createUser)

router.route('/roles').get(dbQuery(Role), getGeneric)

router
  .get('/:id', getUser, controller.getUser)
  .put('/:id', getUser, controller.updateUser)
  .delete('/:id', getUser, controller.deleteUser)

module.exports = router
