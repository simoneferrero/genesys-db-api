const express = require('express')

const TalentsController = require('../controllers/talents')

const router = express.Router()

/* GET talent list */
router.get('/', TalentsController.getAll)

module.exports = router
