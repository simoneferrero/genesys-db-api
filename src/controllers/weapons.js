const { checkIsAuthorised } = require('../utils/helpers')

const WeaponsModel = require('../models/weapons')

class WeaponsController {
  static async getAll(req, res) {
    try {
      res.type('application/json')

      const getAllWeapons = WeaponsModel.getAll()
      const [weapons] = await res.locals.connection.execute(getAllWeapons)
      const response = {
        status: 200,
        data: weapons,
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
        name,
        skill_id,
        damage,
        crit,
        range,
        encumbrance,
        hard_points,
        price,
        restricted,
        rarity,
        special,
      } = req.body
      const { role } = req.user || {}

      checkIsAuthorised(role)

      const postWeapon = WeaponsModel.post({
        name,
        skill_id,
        damage,
        crit,
        range,
        encumbrance,
        hard_points,
        price,
        restricted: restricted ? 1 : 0,
        rarity,
        special,
      })
      const [{ insertId }] = await res.locals.connection.execute(postWeapon)
      const getWeapon = WeaponsModel.get(insertId)
      const [[rawWeapon]] = await res.locals.connection.execute(getWeapon)

      const data = {
        ...rawWeapon,
        restricted: !!rawWeapon.restricted,
      }
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
}

module.exports = WeaponsController