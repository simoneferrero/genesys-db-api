const express = require('express')

const UsersController = require('../controllers/users')

const router = express.Router()

/* POST user registration */
router.post('/', UsersController.register)

module.exports = router
