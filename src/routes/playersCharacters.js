const express = require('express')

const PlayersCharactersController = require('../controllers/playersCharacters')

const router = express.Router()

/* GET playersCharacters list */
router.get('/', PlayersCharactersController.getAll)

/* GET playerCharacter */
router.get('/:player_character_id', PlayersCharactersController.get)

/* PUT playerCharacter */
router.put('/:player_character_id', PlayersCharactersController.put)

/* POST playerCharacter criticalInjury */
router.post(
  '/:player_character_id/critical-injury',
  PlayersCharactersController.postCriticalInjury,
)

/* POST playerCharacter favor */
router.post(
  '/:player_character_id/favor',
  PlayersCharactersController.postFavor,
)

/* POST playerCharacter weapon */
router.post(
  '/:player_character_id/weapon',
  PlayersCharactersController.postWeapon,
)

module.exports = router
