const SkillsModel = require('../models/skills')

class SkillsController {
  static async getAll(req, res) {
    try {
      res.type('application/json')

      const getAllSkills = SkillsModel.getAll()
      const [skills] = await res.locals.pool.execute(getAllSkills)
      const response = {
        status: 200,
        data: skills,
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

module.exports = SkillsController
