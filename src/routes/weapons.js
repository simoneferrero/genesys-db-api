const express = require('express')

const WeaponsController = require('../controllers/weapons')

const router = express.Router()

/* GET weapon list */
router.get('/', WeaponsController.getAll)

/* POST weapon */
router.post('/', WeaponsController.post)

module.exports = router
