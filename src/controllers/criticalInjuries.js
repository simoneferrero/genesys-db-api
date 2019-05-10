const CriticalInjuriesModel = require('../models/criticalInjuries')

class CriticalInjuriesController {
  static async getAll(req, res) {
    try {
      res.type('application/json')

      const getAllCriticalInjuries = CriticalInjuriesModel.getAll()
      const [criticalInjuries] = await res.locals.pool.execute(
        getAllCriticalInjuries,
      )

      const orderedCriticalInjuries = criticalInjuries
        .sort(
          (a, b) =>
            Number(a['dice_value'].split('-')[0]) -
            Number(b['dice_value'].split('-')[0]),
        )
        .map(({ persistent, ...criticalInjury }) => ({
          ...criticalInjury,
          persistent: !!persistent,
        }))
      const response = {
        status: 200,
        data: orderedCriticalInjuries,
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

module.exports = CriticalInjuriesController
