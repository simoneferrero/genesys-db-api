const express = require('express')

const SkillsController = require('../controllers/skills')

const router = express.Router()

/* GET skill list */
router.get('/', SkillsController.getAll)

module.exports = router
