const express = require('express')

const UsersController = require('../controllers/users')

const router = express.Router()

/* POST user login */
router.post('/', UsersController.login)

module.exports = router
