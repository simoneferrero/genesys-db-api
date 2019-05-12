const sql = require('sql-bricks')

const { CRITICAL_INJURIES } = require('./constants')

class CriticalInjuriesModel {
  static getAll() {
    return sql
      .select()
      .from(CRITICAL_INJURIES)
      .toString()
  }
}

module.exports = CriticalInjuriesModel
