const sql = require('sql-bricks')

const { FACTIONS } = require('./constants')

class FactionsModel {
  static getAll() {
    return sql
      .select()
      .from(FACTIONS)
      .toString()
  }
}

module.exports = FactionsModel
