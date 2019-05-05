const express = require('express')

const ArchetypesController = require('../controllers/archetypes')

const router = express.Router()

/* GET archetype list */
router.get('/', ArchetypesController.getAll)

module.exports = router
