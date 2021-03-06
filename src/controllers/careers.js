const CareersModel = require('../models/careers')

class CareersController {
  static async getAll(req, res) {
    try {
      res.type('application/json')

      const getAllCareers = CareersModel.getAll()
      const [careers] = await res.locals.pool.execute(getAllCareers)
      const response = {
        status: 200,
        data: careers,
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

module.exports = CareersController
