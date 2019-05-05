const dotenv = require('dotenv')

dotenv.config()

const definitions = {
  PORT: process.env.PORT,
  DB: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
  },
  SECRET: process.env.SECRET,
  PASSWORD_SALT_ROUNDS: process.env.PASSWORD_SALT_ROUNDS,
}

module.exports = definitions
