const sql = require('sql-bricks')

const { TALENTS } = require('./constants')

class CriticalInjuriesModel {
  static getAll() {
    return sql
      .select()
      .from(TALENTS)
      .toString()
  }
}

module.exports = CriticalInjuriesModel
