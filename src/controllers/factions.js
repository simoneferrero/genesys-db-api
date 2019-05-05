const FactionsModel = require('../models/factions')

class FactionsController {
  static async getAll(req, res) {
    try {
      res.type('application/json')

      const getAllFactions = FactionsModel.getAll()
      const [factions] = await res.locals.connection.execute(getAllFactions)
      const response = {
        status: 200,
        data: factions,
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
      await res.locals.connection.end()
    }
  }
}

module.exports = FactionsController
