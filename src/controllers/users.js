const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { PASSWORD_SALT_ROUNDS, SECRET } = require('../utils/definitions')

const UsersModel = require('../models/users')

class UsersController {
  static async login(req, res) {
    try {
      res.type('application/json')

      const { username, password } = req.body
      const getUser = UsersModel.get(null, username)
      const [[user]] = await res.locals.connection.execute(getUser)

      const isValid = await bcrypt.compare(password, user ? user.password : '')

      if (!isValid) {
        throw { status: 401, message: 'Username or password are invalid' }
      }

      const signedJwt = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 * 4, // 28 days
          id: user.id,
          role: user.role,
        },
        SECRET,
      )
      const response = {
        status: 200,
        data: {
          jwt: signedJwt,
          playerCharacterId: user.player_character_id,
          role: user.role,
          username: user.username,
        },
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

  static async register(req, res) {
    try {
      res.type('application/json')

      const { username, password } = req.body
      const checkUserExists = UsersModel.checkExists(username)
      const [[{ length }]] = await res.locals.connection.execute(
        checkUserExists,
      )
      if (length > 0) {
        throw { status: 409, message: 'Username already in use' }
      }

      const hashedPassword = await bcrypt.hash(
        password,
        Number(PASSWORD_SALT_ROUNDS),
      )
      const registerUser = UsersModel.register(username, hashedPassword)
      await res.locals.connection.execute(registerUser)

      const response = {
        status: 202,
      }
      res.status(202).send(JSON.stringify(response))
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

module.exports = UsersController
