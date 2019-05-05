const sql = require('sql-bricks')

const { ARCHETYPES } = require('./constants')

class ArchetypesModel {
  static getAll() {
    return sql
      .select()
      .from(ARCHETYPES)
      .toString()
  }
}

module.exports = ArchetypesModel
