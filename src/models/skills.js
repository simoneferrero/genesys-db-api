const sql = require('sql-bricks')

const { SKILLS } = require('./constants')

class SkillsModel {
  static getAll() {
    return sql
      .select()
      .from(SKILLS)
      .toString()
  }
}

module.exports = SkillsModel
