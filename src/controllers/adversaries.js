// const keyBy = require('lodash/keyBy')
//
const { checkIsAuthorised, transformAdversary } = require('../utils/helpers')

const AdversariesModel = require('../models/adversaries')
// const TalentsModel = require('../models/talents')
// const UsersModel = require('../models/users')

class AdversariesController {
  // static async buildData(res, playerCharacterId) {
  //   const getPlayerCharacter = AdversariesModel.get(playerCharacterId)
  //
  //   // playerCharacter generic data
  //   const [
  //     [
  //       {
  //         strength_type,
  //         strength_description,
  //         flaw_type,
  //         flaw_description,
  //         desire_type,
  //         desire_description,
  //         fear_type,
  //         fear_description,
  //         armor,
  //         gear,
  //         money,
  //         ...playerCharacter
  //       },
  //     ],
  //   ] = await res.locals.pool.execute(getPlayerCharacter)
  //
  //   // Transformed fields
  //   const motivations = {
  //     strength: {
  //       type: strength_type,
  //       description: strength_description,
  //     },
  //     flaw: {
  //       type: flaw_type,
  //       description: flaw_description,
  //     },
  //     desire: {
  //       type: desire_type,
  //       description: desire_description,
  //     },
  //     fear: {
  //       type: fear_type,
  //       description: fear_description,
  //     },
  //   }
  //   const equipment = {
  //     armor,
  //     gear,
  //     money,
  //   }
  //
  //   // playerCharacter user data
  //   const getPlayerCharacterUser = UsersModel.get(playerCharacter.user_id)
  //   const [[{ username }]] = await res.locals.pool.execute(
  //     getPlayerCharacterUser,
  //   )
  //
  //   // favors data
  //   const getPlayerCharacterFavors = AdversariesModel.getAllFavors(
  //     playerCharacterId,
  //   )
  //   const [favors] = await res.locals.pool.execute(getPlayerCharacterFavors)
  //
  //   // critical injuries data
  //   const getPlayerCharacterCriticalInjuries = AdversariesModel.getAllCriticalInjuries(
  //     playerCharacterId,
  //   )
  //   const [rawCriticalInjuries] = await res.locals.pool.execute(
  //     getPlayerCharacterCriticalInjuries,
  //   )
  //   const critical_injuries = keyBy(rawCriticalInjuries, 'id')
  //
  //   // skills data
  //   const getPlayerCharacterSkills = AdversariesModel.getAllSkills(
  //     playerCharacterId,
  //   )
  //   const [rawSkills] = await res.locals.pool.execute(getPlayerCharacterSkills)
  //   const skills = rawSkills.map(({ career, ...skill }) => ({
  //     ...skill,
  //     career: !!career,
  //   }))
  //
  //   // talents data
  //   const getPlayerCharacterTalents = AdversariesModel.getAllTalents(
  //     playerCharacterId,
  //   )
  //   const [rawTalents] = await res.locals.pool.execute(
  //     getPlayerCharacterTalents,
  //   )
  //   const talents = keyBy(rawTalents, 'id')
  //
  //   // weapons data
  //   const getPlayerCharacterWeapons = AdversariesModel.getAllWeapons(
  //     playerCharacterId,
  //   )
  //   const [weapons] = await res.locals.pool.execute(getPlayerCharacterWeapons)
  //
  //   return transformAdversary({
  //     ...playerCharacter,
  //     critical_injuries,
  //     equipment,
  //     favors,
  //     motivations,
  //     player_name: username,
  //     skills,
  //     talents,
  //     weapons,
  //   })
  // }
  //
  static async getAll(req, res) {
    try {
      res.type('application/json')

      const { role } = req.user || {}

      checkIsAuthorised(role)

      const getAllAdversaries = AdversariesModel.getAll()
      const [adversaries] = await res.locals.pool.execute(getAllAdversaries)
      const data = adversaries.map((adversary) => transformAdversary(adversary))

      const response = {
        status: 200,
        data,
      }
      res.send(JSON.stringify(response))
    } catch (error) {
      const status = error.status || 500
      const response = {
        status: status || 500,
        error: {
          message: error.message || 'There was an error with the request.',
        },
      }
      res.status(status).send(JSON.stringify(response))
    }
  }

  static async post(req, res) {
    try {
      res.type('application/json')

      const {
        type,
        name,
        characteristics: {
          brawn,
          agility,
          intellect,
          cunning,
          willpower,
          presence,
        },
        attributes: {
          soak,
          wounds: { current: wounds_current, total: wounds_total },
          strain: { current: strain_current, total: strain_total },
          defense: { melee: defense_melee, ranged: defense_ranged },
        },
        armor,
        gear,
        notes,
        motivations: {
          strength: { type: strength_type, description: strength_description },
          flaw: { type: flaw_type, description: flaw_description },
          desire: { type: desire_type, description: desire_description },
          fear: { type: fear_type, description: fear_description },
        },
      } = req.body
      const { role } = req.user || {}

      checkIsAuthorised(role)

      const postAdversary = AdversariesModel.post({
        agility,
        armor,
        brawn,
        cunning,
        defense_melee,
        defense_ranged,
        desire_description,
        desire_type,
        fear_description,
        fear_type,
        flaw_description,
        flaw_type,
        gear,
        intellect,
        name,
        notes,
        presence,
        soak,
        strain_current,
        strain_total,
        strength_description,
        strength_type,
        type,
        willpower,
        wounds_current,
        wounds_total,
      })
      const [{ insertId }] = await res.locals.pool.execute(postAdversary)
      const getAdversary = AdversariesModel.get(insertId)
      const [[adversary]] = await res.locals.pool.execute(getAdversary)

      const response = {
        status: 200,
        data: adversary,
      }
      res.send(JSON.stringify(response))
    } catch (error) {
      const status = error.status || 500
      const response = {
        status: status || 500,
        error: {
          message: error.message || 'There was an error with the request.',
        },
      }
      res.status(status).send(JSON.stringify(response))
    }
  }

  // static async get(req, res) {
  //   try {
  //     res.type('application/json')
  //
  //     const { player_character_id } = req.params
  //     const { user_id, ...data } = await AdversariesController.buildData(
  //       res,
  //       player_character_id,
  //     )
  //
  //     const { id, role } = req.user || {}
  //     checkIsAuthorised(role, id, user_id)
  //
  //     const response = {
  //       status: 200,
  //       data,
  //     }
  //     res.send(JSON.stringify(response))
  //   } catch (error) {
  //     const status = error.status || 500
  //     const response = {
  //       status: status || 500,
  //       error: {
  //         message: error.message || 'There was an error with the request.',
  //       },
  //     }
  //     res.status(status).send(JSON.stringify(response))
  //   }
  // }
  //
  // static async put(req, res) {
  //   try {
  //     res.type('application/json')
  //
  //     const {
  //       characteristics: {
  //         agility,
  //         brawn,
  //         cunning,
  //         intellect,
  //         presence,
  //         willpower,
  //       },
  //       defense_melee,
  //       defense_ranged,
  //       deletedCriticalInjuries,
  //       deletedWeapons,
  //       equipment: { armor, gear, money },
  //       favors,
  //       motivations: { strength, flaw, desire, fear },
  //       notes,
  //       soak,
  //       skills,
  //       strain_current,
  //       strain_total,
  //       talents,
  //       weapons,
  //       wounds_current,
  //       wounds_total,
  //       xp,
  //     } = req.body
  //
  //     const { player_character_id } = req.params
  //     const { id, role } = req.user || {}
  //
  //     const filteredBody = {
  //       agility,
  //       armor,
  //       brawn,
  //       cunning,
  //       defense_melee,
  //       defense_ranged,
  //       intellect,
  //       presence,
  //       willpower,
  //       desire_description: desire.description,
  //       desire_type: desire.type,
  //       fear_description: fear.description,
  //       fear_type: fear.type,
  //       flaw_description: flaw.description,
  //       flaw_type: flaw.type,
  //       gear,
  //       money,
  //       notes,
  //       soak,
  //       strain_current,
  //       strain_total,
  //       strength_description: strength.description,
  //       strength_type: strength.type,
  //       wounds_current,
  //       wounds_total,
  //       xp_available: xp.available,
  //       xp_total: xp.total,
  //     }
  //     const getPlayerCharacterUserId = AdversariesModel.get(player_character_id)
  //     const [[{ user_id }]] = await res.locals.pool.execute(
  //       getPlayerCharacterUserId,
  //     )
  //     checkIsAuthorised(role, id, user_id)
  //
  //     const putPlayerCharacter = AdversariesModel.put(
  //       player_character_id,
  //       filteredBody,
  //     )
  //     await res.locals.pool.execute(putPlayerCharacter)
  //
  //     // Delete critical injuries
  //     if (deletedCriticalInjuries && deletedCriticalInjuries.length > 0) {
  //       const deletePlayerCharacterCriticalInjuries = AdversariesModel.deleteCriticalInjuries(
  //         deletedCriticalInjuries,
  //       )
  //       await res.locals.pool.execute(deletePlayerCharacterCriticalInjuries)
  //     }
  //
  //     // Favors
  //     favors &&
  //       favors.forEach(async ({ id, status }) => {
  //         const putPlayerCharacterFavor = AdversariesModel.putFavor(id, status)
  //         await res.locals.pool.execute(putPlayerCharacterFavor)
  //       })
  //
  //     // Skills
  //     skills &&
  //       skills.forEach(async (skill) => {
  //         if (skill.rank > 5) {
  //           throw new Error('Skill ranks cannot be greater than 5.')
  //         }
  //
  //         const getPlayerCharacterSkill = AdversariesModel.getSkill(
  //           player_character_id,
  //           skill.id,
  //         )
  //
  //         const [[playerCharacterSkill]] = await res.locals.pool.execute(
  //           getPlayerCharacterSkill,
  //         )
  //         if (!playerCharacterSkill) {
  //           const postPlayerCharacterSkill = AdversariesModel.postSkill({
  //             player_character_id,
  //             skill_id: skill.id,
  //             rank: skill.rank,
  //             career: skill.career ? 1 : 0,
  //           })
  //           await res.locals.pool.execute(postPlayerCharacterSkill)
  //         } else {
  //           const putPlayerCharacterSkill = AdversariesModel.putSkill(
  //             playerCharacterSkill.id,
  //             skill.rank,
  //             skill.career,
  //           )
  //           await res.locals.pool.execute(putPlayerCharacterSkill)
  //         }
  //       })
  //
  //     // Talents
  //     talents &&
  //       talents.forEach(async ({ id, notes, rank }) => {
  //         const putPlayerCharacterTalent = AdversariesModel.putTalent(
  //           id,
  //           rank,
  //           notes,
  //         )
  //         await res.locals.pool.execute(putPlayerCharacterTalent)
  //       })
  //
  //     // Edit weapons
  //     weapons &&
  //       weapons.forEach(async ({ id, mods }) => {
  //         const putPlayerCharacterWeapon = AdversariesModel.putWeapon(id, mods)
  //         await res.locals.pool.execute(putPlayerCharacterWeapon)
  //       })
  //
  //     // Delete weapons
  //     if (deletedWeapons && deletedWeapons.length > 0) {
  //       const deletePlayerCharacterWeapons = AdversariesModel.deleteWeapons(
  //         deletedWeapons,
  //       )
  //       await res.locals.pool.execute(deletePlayerCharacterWeapons)
  //     }
  //
  //     const data = await AdversariesController.buildData(
  //       res,
  //       player_character_id,
  //     )
  //
  //     const response = {
  //       status: 200,
  //       data,
  //     }
  //     res.send(JSON.stringify(response))
  //   } catch (error) {
  //     const status = error.status || 500
  //     const response = {
  //       status: status || 500,
  //       error: {
  //         message: error.message || 'There was an error with the request.',
  //       },
  //     }
  //     res.status(status).send(JSON.stringify(response))
  //   }
  // }
  //
  // static async postCriticalInjury(req, res) {
  //   try {
  //     res.type('application/json')
  //
  //     const { critical_injury_id } = req.body
  //     const { player_character_id } = req.params
  //     const { id, role } = req.user || {}
  //
  //     const getPlayerCharacterUserId = AdversariesModel.get(player_character_id)
  //     const [[{ user_id }]] = await res.locals.pool.execute(
  //       getPlayerCharacterUserId,
  //     )
  //     checkIsAuthorised(role, id, user_id)
  //
  //     const postPlayerCharacterCriticalInjury = AdversariesModel.postCriticalInjury(
  //       {
  //         critical_injury_id,
  //         player_character_id,
  //       },
  //     )
  //     const [{ insertId }] = await res.locals.pool.execute(
  //       postPlayerCharacterCriticalInjury,
  //     )
  //     const getPlayerCharacterCriticalInjury = AdversariesModel.getCriticalInjury(
  //       insertId,
  //     )
  //     const [[criticalInjury]] = await res.locals.pool.execute(
  //       getPlayerCharacterCriticalInjury,
  //     )
  //
  //     const response = {
  //       status: 200,
  //       data: criticalInjury,
  //     }
  //     res.send(JSON.stringify(response))
  //   } catch (error) {
  //     const status = error.status || 500
  //     const response = {
  //       status: status || 500,
  //       error: {
  //         message: error.message || 'There was an error with the request.',
  //       },
  //     }
  //     res.status(status).send(JSON.stringify(response))
  //   }
  // }
  //
  // static async postTalent(req, res) {
  //   try {
  //     res.type('application/json')
  //
  //     const { talent_id } = req.body
  //     const { player_character_id } = req.params
  //     const { id, role } = req.user || {}
  //
  //     const getPlayerCharacterUserId = AdversariesModel.get(player_character_id)
  //     const [[{ user_id }]] = await res.locals.pool.execute(
  //       getPlayerCharacterUserId,
  //     )
  //     checkIsAuthorised(role, id, user_id)
  //
  //     const getTalent = TalentsModel.get(talent_id)
  //     const [[{ ranked }]] = await res.locals.pool.execute(getTalent)
  //
  //     const postPlayerCharacterTalent = AdversariesModel.postTalent({
  //       player_character_id: Number(player_character_id),
  //       talent_id,
  //       ...(ranked && { rank: 1 }),
  //     })
  //     const [{ insertId }] = await res.locals.pool.execute(
  //       postPlayerCharacterTalent,
  //     )
  //     const getPlayerCharacterTalent = AdversariesModel.getTalent(insertId)
  //     const [[characterTalent]] = await res.locals.pool.execute(
  //       getPlayerCharacterTalent,
  //     )
  //
  //     const response = {
  //       status: 200,
  //       data: characterTalent,
  //     }
  //     res.send(JSON.stringify(response))
  //   } catch (error) {
  //     const status = error.status || 500
  //     const response = {
  //       status: status || 500,
  //       error: {
  //         message: error.message || 'There was an error with the request.',
  //       },
  //     }
  //     res.status(status).send(JSON.stringify(response))
  //   }
  // }
  //
  // static async postWeapon(req, res) {
  //   try {
  //     res.type('application/json')
  //
  //     const { weapon_id } = req.body
  //     const { player_character_id } = req.params
  //     const { id, role } = req.user || {}
  //
  //     const getPlayerCharacterUserId = AdversariesModel.get(player_character_id)
  //     const [[{ user_id }]] = await res.locals.pool.execute(
  //       getPlayerCharacterUserId,
  //     )
  //     checkIsAuthorised(role, id, user_id)
  //
  //     const postPlayerCharacterWeapon = AdversariesModel.postWeapon({
  //       player_character_id,
  //       weapon_id,
  //     })
  //     const [{ insertId }] = await res.locals.pool.execute(
  //       postPlayerCharacterWeapon,
  //     )
  //     const getPlayerCharacterWeapon = AdversariesModel.getWeapon(insertId)
  //     const [[weapon]] = await res.locals.pool.execute(getPlayerCharacterWeapon)
  //
  //     const response = {
  //       status: 200,
  //       data: weapon,
  //     }
  //     res.send(JSON.stringify(response))
  //   } catch (error) {
  //     const status = error.status || 500
  //     const response = {
  //       status: status || 500,
  //       error: {
  //         message: error.message || 'There was an error with the request.',
  //       },
  //     }
  //     res.status(status).send(JSON.stringify(response))
  //   }
  // }
}

module.exports = AdversariesController
