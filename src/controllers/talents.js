const { checkIsAuthorised } = require('../utils/helpers')

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

  static async post(req, res) {
    try {
      res.type('application/json')

      const { activation, description, name, ranked, tier } = req.body
      const { role } = req.user || {}

      checkIsAuthorised(role)

      const transformedId = name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]*/g, (match) => {
          if (match.includes(' ') || match.includes('-')) {
            return '_'
          }

          return ''
        })

      const postTalent = TalentsModel.post({
        activation,
        description,
        id: transformedId,
        name,
        ranked: ranked ? 1 : 0,
        tier,
      })
      await res.locals.pool.execute(postTalent)
      const getTalent = TalentsModel.get(transformedId)
      const [[rawTalent]] = await res.locals.pool.execute(getTalent)

      const data = {
        ...rawTalent,
        ranked: !!rawTalent.ranked,
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
    }
  }
}

module.exports = TalentsController
