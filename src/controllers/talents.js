const TalentsModel = require('../models/talents')

class TalentsController {
  static async getAll(req, res) {
    try {
      res.type('application/json')

      const getAllTalents = TalentsModel.getAll()
      const [rawTalents] = await res.locals.pool.execute(getAllTalents)
      const talents = rawTalents.map(({ ranked, ...talent }) => ({
        ...talent,
        ranked: !!ranked,
      }))

      const response = {
        status: 200,
        data: talents,
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
}

module.exports = TalentsController
