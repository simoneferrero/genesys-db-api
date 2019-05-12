const express = require('express')

const CriticalInjuriesController = require('../controllers/criticalInjuries')

const router = express.Router()

/* GET critical injury list */
router.get('/', CriticalInjuriesController.getAll)

module.exports = router
