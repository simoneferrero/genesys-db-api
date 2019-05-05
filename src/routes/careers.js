const express = require('express')

const CareersController = require('../controllers/careers')

const router = express.Router()

/* GET career list */
router.get('/', CareersController.getAll)

module.exports = router
