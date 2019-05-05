const sql = require('sql-bricks')

const { SKILLS, WEAPONS } = require('./constants')

class WeaponsModel {
  static getAll() {
    return sql
      .select([
        `${WEAPONS}.id`,
        `${WEAPONS}.name`,
        `${SKILLS}.name skill`,
        'damage',
        'crit',
        `${WEAPONS}.range`,
        `encumbrance`,
        `hard_points`,
        `price`,
        `restricted`,
        `rarity`,
        'special',
      ])
      .from(WEAPONS)
      .join(SKILLS, {
        [`${WEAPONS}.skill_id`]: `${SKILLS}.id`,
      })
      .toString()
  }

  static get(id) {
    return sql
      .select([
        `${WEAPONS}.id`,
        `${WEAPONS}.name`,
        `${SKILLS}.name skill`,
        'damage',
        'crit',
        `${WEAPONS}.range`,
        `encumbrance`,
        `hard_points`,
        `price`,
        `restricted`,
        `rarity`,
        'special',
      ])
      .from(WEAPONS)
      .join(SKILLS, {
        [`${WEAPONS}.skill_id`]: `${SKILLS}.id`,
      })
      .where({ [`${WEAPONS}.id`]: id })
      .toString()
  }

  static post({ range, ...values }) {
    return sql
      .insert(WEAPONS, {
        ...values,
        [`${WEAPONS}.range`]: range,
      })
      .toString()
  }
}

module.exports = WeaponsModel
