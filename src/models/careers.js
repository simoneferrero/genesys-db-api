const sql = require('sql-bricks')

const { CAREERS } = require('./constants')

class CareersModel {
  static getAll() {
    return sql
      .select()
      .from(CAREERS)
      .toString()
  }
}

module.exports = CareersModel
