const Role = require('../models/user')
const { response } = require('../classes')

exports.getRole = async (req, res, next) => {
    let role
    try {
        role = await Role.findById(req.params.id)
        if (!role) {
            return res.status(404).json(new response.fail('Can not find the user'))
        }
    } catch (err) {
        next(new response.fail())
    }
    res.role = role
    next()
}