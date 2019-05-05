const express = require('express')

const FactionsController = require('../controllers/factions')

const router = express.Router()

/* GET faction list */
router.get('/', FactionsController.getAll)

module.exports = router
