const sql = require('sql-bricks')

const { PLAYERS_CHARACTERS, USERS } = require('./constants')

class UsersModel {
  static checkExists(username) {
    return sql
      .select('COUNT(*) length')
      .from(USERS)
      .where({ username })
      .toString()
  }

  static register(username, password) {
    return sql
      .insert(USERS, {
        username,
        password,
      })
      .toString()
  }

  static get(id, username) {
    return sql
      .select([
        `${USERS}.id`,
        `${USERS}.role`,
        `${USERS}.password`,
        `${USERS}.username`,
        `${PLAYERS_CHARACTERS}.id player_character_id`,
      ])
      .from(USERS)
      .leftJoin(PLAYERS_CHARACTERS, {
        [`${PLAYERS_CHARACTERS}.user_id`]: `${USERS}.id`,
      })
      .where(
        sql.or({ [`${USERS}.id`]: id }, { [`${USERS}.username`]: username }),
      )
      .toString()
  }
}

module.exports = UsersModel
