const express = require('express')

const TalentsController = require('../controllers/talents')

const router = express.Router()

/* GET talent list */
router.get('/', TalentsController.getAll)

/* POST talent */
router.post('/', TalentsController.post)

module.exports = router
