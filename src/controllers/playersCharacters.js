const {
  checkIsAuthorised,
  transformPlayerCharacter,
} = require('../utils/helpers')

const PlayersCharactersModel = require('../models/playersCharacters')
const UsersModel = require('../models/users')

class PlayersCharactersController {
  static async buildData(res, playerCharacterId) {
    const getPlayerCharacter = PlayersCharactersModel.get(playerCharacterId)

    // playerCharacter generic data
    const [
      [
        {
          strength_type,
          strength_description,
          flaw_type,
          flaw_description,
          desire_type,
          desire_description,
          fear_type,
          fear_description,
          armor,
          gear,
          money,
          ...playerCharacter
        },
      ],
    ] = await res.locals.connection.execute(getPlayerCharacter)

    // Transformed fields
    const motivations = {
      strength: {
        type: strength_type,
        description: strength_description,
      },
      flaw: {
        type: flaw_type,
        description: flaw_description,
      },
      desire: {
        type: desire_type,
        description: desire_description,
      },
      fear: {
        type: fear_type,
        description: fear_description,
      },
    }
    const equipment = {
      armor,
      gear,
      money,
    }

    // playerCharacter user data
    const getPlayerCharacterUser = UsersModel.get(playerCharacter.user_id)
    const [[{ username }]] = await res.locals.connection.execute(
      getPlayerCharacterUser,
    )

    // favors data
    const getPlayerCharacterFavors = PlayersCharactersModel.getAllFavors(
      playerCharacterId,
    )
    const [favors] = await res.locals.connection.execute(
      getPlayerCharacterFavors,
    )

    // skills data
    const getPlayerCharacterSkills = PlayersCharactersModel.getAllSkills(
      playerCharacterId,
    )
    const [rawSkills] = await res.locals.connection.execute(
      getPlayerCharacterSkills,
    )
    const skills = rawSkills.map(({ career, ...skill }) => ({
      ...skill,
      career: !!career,
    }))

    // weapons data
    const getPlayerCharacterWeapons = PlayersCharactersModel.getAllWeapons(
      playerCharacterId,
    )
    const [weapons] = await res.locals.connection.execute(
      getPlayerCharacterWeapons,
    )

    const test = transformPlayerCharacter({
      ...playerCharacter,
      player_name: username,
      equipment,
      motivations,
      favors,
      skills,
      weapons,
    })
    return test
  }

  static async getAll(req, res) {
    try {
      res.type('application/json')

      const { role } = req.user || {}

      checkIsAuthorised(role)

      const getAllPlayersCharacters = PlayersCharactersModel.getAll()
      const [playersCharacters] = await res.locals.connection.execute(
        getAllPlayersCharacters,
      )
      const data = playersCharacters.map((playerCharacter) =>
        transformPlayerCharacter(playerCharacter),
      )

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
    } finally {
      res.locals.connection.end()
    }
  }

  static async get(req, res) {
    try {
      res.type('application/json')

      const { player_character_id } = req.params
      const { user_id, ...data } = await PlayersCharactersController.buildData(
        res,
        player_character_id,
      )

      const { id, role } = req.user || {}
      checkIsAuthorised(role, id, user_id)

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
    } finally {
      res.locals.connection.end()
    }
  }

  static async put(req, res) {
    try {
      res.type('application/json')

      const {
        deletedWeapons,
        equipment: { armor, gear, money },
        favors,
        motivations: { strength, flaw, desire, fear },
        notes,
        skills,
        strain_current,
        weapons,
        wounds_current,
        xp_available,
        xp_total,
      } = req.body
      const { player_character_id } = req.params
      const { id, role } = req.user || {}

      const filteredBody = {
        armor,
        desire_description: desire.description,
        desire_type: desire.type,
        fear_description: fear.description,
        fear_type: fear.type,
        flaw_description: flaw.description,
        flaw_type: flaw.type,
        gear,
        money,
        notes,
        strain_current,
        strength_description: strength.description,
        strength_type: strength.type,
        wounds_current,
        xp_available,
        xp_total,
      }
      const getPlayerCharacterUserId = PlayersCharactersModel.get(
        player_character_id,
      )
      const [[{ user_id }]] = await res.locals.connection.execute(
        getPlayerCharacterUserId,
      )
      checkIsAuthorised(role, id, user_id)

      const putPlayerCharacter = PlayersCharactersModel.put(
        player_character_id,
        filteredBody,
      )
      await res.locals.connection.execute(putPlayerCharacter)

      // Favors
      favors.forEach(async ({ id, status }) => {
        const putPlayerCharacterFavor = PlayersCharactersModel.putFavor(
          id,
          status,
        )
        await res.locals.connection.execute(putPlayerCharacterFavor)
      })

      // Skills
      skills.forEach(async (skill) => {
        if (skill.rank > 5) {
          throw new Error('Skill ranks cannot be greater than 5.')
        }

        const getPlayerCharacterSkill = PlayersCharactersModel.getSkill(
          player_character_id,
          skill.id,
        )

        const [[playerCharacterSkill]] = await res.locals.connection.execute(
          getPlayerCharacterSkill,
        )
        if (!playerCharacterSkill) {
          const postPlayerCharacterSkill = PlayersCharactersModel.postSkill({
            player_character_id,
            skill_id: skill.id,
            rank: skill.rank,
          })
          await res.locals.connection.execute(postPlayerCharacterSkill)
        } else if (playerCharacterSkill.rank > skill.rank) {
          throw new Error('Skill ranks cannot be lowered.')
        } else {
          const putPlayerCharacterSkill = PlayersCharactersModel.putSkill(
            playerCharacterSkill.id,
            skill.rank,
          )
          await res.locals.connection.execute(putPlayerCharacterSkill)
        }
      })

      // Edit weapons
      weapons.forEach(async ({ id, mods }) => {
        const putPlayerCharacterWeapon = PlayersCharactersModel.putWeapon(
          id,
          mods,
        )
        await res.locals.connection.execute(putPlayerCharacterWeapon)
      })

      // Delete weapons
      if (deletedWeapons.length > 0) {
        const deletePlayerCharacterWeapon = PlayersCharactersModel.deleteWeapons(
          deletedWeapons,
        )
        await res.locals.connection.execute(deletePlayerCharacterWeapon)
      }

      const data = await PlayersCharactersController.buildData(
        res,
        player_character_id,
      )

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
    } finally {
      res.locals.connection.end()
    }
  }

  static async postFavor(req, res) {
    try {
      res.type('application/json')

      const { description, faction_id, size, type } = req.body
      const { player_character_id } = req.params
      const { id, role } = req.user || {}

      const getPlayerCharacterUserId = PlayersCharactersModel.get(
        player_character_id,
      )
      const [[{ user_id }]] = await res.locals.connection.execute(
        getPlayerCharacterUserId,
      )
      checkIsAuthorised(role, id, user_id)

      const postPlayerCharacterFavor = PlayersCharactersModel.postFavor({
        description,
        faction_id,
        player_character_id,
        size,
        type,
      })
      const [{ insertId }] = await res.locals.connection.execute(
        postPlayerCharacterFavor,
      )
      const getPlayerCharacterFavor = PlayersCharactersModel.getFavor(insertId)
      const [[favor]] = await res.locals.connection.execute(
        getPlayerCharacterFavor,
      )

      const response = {
        status: 200,
        data: favor,
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
    } finally {
      res.locals.connection.end()
    }
  }

  static async postWeapon(req, res) {
    try {
      res.type('application/json')

      const { weapon_id } = req.body
      const { player_character_id } = req.params
      const { id, role } = req.user || {}

      const getPlayerCharacterUserId = PlayersCharactersModel.get(
        player_character_id,
      )
      const [[{ user_id }]] = await res.locals.connection.execute(
        getPlayerCharacterUserId,
      )
      checkIsAuthorised(role, id, user_id)

      const postPlayerCharacterWeapon = PlayersCharactersModel.postWeapon({
        player_character_id,
        weapon_id,
      })
      const [{ insertId }] = await res.locals.connection.execute(
        postPlayerCharacterWeapon,
      )
      const getPlayerCharacterWeapon = PlayersCharactersModel.getWeapon(
        insertId,
      )
      const [[weapon]] = await res.locals.connection.execute(
        getPlayerCharacterWeapon,
      )

      const response = {
        status: 200,
        data: weapon,
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
    } finally {
      res.locals.connection.end()
    }
  }
}

module.exports = PlayersCharactersController
