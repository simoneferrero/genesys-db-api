const dotenv = require('dotenv')

dotenv.config()

const definitions = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    CONNECTION_LIMIT: Number(process.env.DB_CONNECTION_LIMIT),
  },
  SECRET: process.env.SECRET,
  PASSWORD_SALT_ROUNDS: process.env.PASSWORD_SALT_ROUNDS,
}

module.exports = definitions
