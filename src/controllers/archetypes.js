const ArchetypesModel = require('../models/archetypes')

class ArchetypesController {
  static async getAll(req, res) {
    try {
      res.type('application/json')

      const getAllArchetypes = ArchetypesModel.getAll()
      const [archetypes] = await res.locals.connection.execute(getAllArchetypes)
      const response = {
        status: 200,
        data: archetypes,
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
      console.log('Closed getAllArchetypes')
    }
  }
}

module.exports = ArchetypesController
