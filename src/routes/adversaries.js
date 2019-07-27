const express = require('express')

const AdversariesController = require('../controllers/adversaries')

const router = express.Router()

/* GET adversaries list */
router.get('/', AdversariesController.getAll)

// /* GET adversary */
// router.get('/:adversary_id', AdversariesController.get)

/* POST adversary */
router.post('/', AdversariesController.post)

// /* PUT adversary */
// router.put('/:adversary_id', AdversariesController.put)
//
// /* POST adversary criticalInjury */
// router.post(
//   '/:adversary_id/critical-injury',
//   AdversariesController.postCriticalInjury,
// )
//
// /* POST adversary talent */
// router.post('/:adversary_id/talent', AdversariesController.postTalent)
//
// /* POST adversary weapon */
// router.post('/:adversary_id/weapon', AdversariesController.postWeapon)

module.exports = router
