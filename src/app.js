const express = require('express')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mysql = require('mysql2/promise')
const jwt = require('express-jwt')

const { DB, NODE_ENV, SECRET } = require('./utils/definitions')

// Routes
const indexRouter = require('./routes/index')
const archetypesRouter = require('./routes/archetypes')
const careersRouter = require('./routes/careers')
const criticalInjuriesRouter = require('./routes/criticalInjuries')
const factionsRouter = require('./routes/factions')
const loginRouter = require('./routes/login')
const playersCharactersRouter = require('./routes/playersCharacters')
const registerRouter = require('./routes/register')
const skillsRouter = require('./routes/skills')
const talentsRouter = require('./routes/talents')
const weaponsRouter = require('./routes/weapons')

let pool
const app = express()

try {
  app.use(logger(NODE_ENV === 'development' ? 'dev' : 'tiny'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '../public')))

  // Database pool
  app.use(async function(req, res, next) {
    if (!pool) {
      pool = await mysql.createPool({
        host: DB.HOST,
        user: DB.USER,
        password: DB.PASSWORD,
        database: DB.DATABASE,
        waitForConnections: true,
        connectionLimit: DB.CONNECTION_LIMIT,
        queueLimit: 0,
      })
    }
    res.locals.pool = pool

    next()
  })

  // CORS setup
  app.use(async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    )
    next()
  })

  // JWT setup
  app.use(
    jwt({
      secret: SECRET,
      credentialsRequired: false,
      getToken: ({ headers: { authorization = '' } }) => {
        const [type, token] = authorization.split(' ')
        if (type === 'Bearer') {
          return token
        }

        return null
      },
    }),
  )

  app.use('/', indexRouter)
  app.use('/archetypes', archetypesRouter)
  app.use('/careers', careersRouter)
  app.use('/critical-injuries', criticalInjuriesRouter)
  app.use('/factions', factionsRouter)
  app.use('/login', loginRouter)
  app.use('/players-characters', playersCharactersRouter)
  app.use('/register', registerRouter)
  app.use('/skills', skillsRouter)
  app.use('/talents', talentsRouter)
  app.use('/weapons', weaponsRouter)

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404))
  })

  // error handler
  app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(500).json({ error: err })
  })
} catch (e) {
  console.error(e) // eslint-disable-line no-console
}

module.exports = app
