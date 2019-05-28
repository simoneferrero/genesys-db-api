const sql = require('sql-bricks')

const { TALENTS } = require('./constants')

class TalentsModel {
  static getAll() {
    return sql
      .select()
      .from(TALENTS)
      .toString()
  }

  static get(id) {
    return sql
      .select()
      .from(TALENTS)
      .where({ id })
      .toString()
  }

  static post(values) {
    return sql.insert(TALENTS, values).toString()
  }
}

module.exports = TalentsModel
