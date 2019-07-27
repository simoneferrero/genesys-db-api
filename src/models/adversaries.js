const sql = require('sql-bricks')

const {
  // ADVERSARIES_CRITICAL_INJURIES,
  // ADVERSARIES_SKILLS,
  // ADVERSARIES_TALENTS,
  // ADVERSARIES_WEAPONS,
  ADVERSARIES,
  // SKILLS,
  // WEAPONS,
} = require('./constants')

class AdversariesModel {
  static getAll() {
    return sql
      .select([
        'id',
        'type',
        'name',
        'brawn',
        'agility',
        'intellect',
        'cunning',
        'willpower',
        'presence',
        'soak',
        'wounds_total',
        'wounds_current',
        'strain_total',
        'strain_current',
        'defense_melee',
        'defense_ranged',
      ])
      .from(ADVERSARIES)
      .toString()
  }

  static post(adversary) {
    return sql.insert(ADVERSARIES, adversary).toString()
  }

  static get(id) {
    return sql
      .select()
      .from(ADVERSARIES)
      .where({ id })
      .toString()
  }

  // static put(id, fields) {
  //   return sql
  //     .update(ADVERSARIES)
  //     .set(fields)
  //     .where({ id })
  //     .toString()
  // }
  //
  // static getAllCriticalInjuries(player_character_id) {
  //   return sql
  //     .select('id', 'critical_injury_id')
  //     .from(ADVERSARIES_CRITICAL_INJURIES)
  //     .where({ player_character_id })
  //     .toString()
  // }
  //
  // static getCriticalInjury(id) {
  //   return sql
  //     .select('id', 'critical_injury_id')
  //     .from(ADVERSARIES_CRITICAL_INJURIES)
  //     .where({ id })
  //     .toString()
  // }
  //
  // static postCriticalInjury(criticalInjury) {
  //   return sql
  //     .insert(ADVERSARIES_CRITICAL_INJURIES, {
  //       ...criticalInjury,
  //     })
  //     .toString()
  // }
  //
  // static deleteCriticalInjuries(ids) {
  //   return sql
  //     .delete()
  //     .from(ADVERSARIES_CRITICAL_INJURIES)
  //     .where(sql.in('id', ...ids))
  //     .toString()
  // }
  //
  // static getAllSkills(id) {
  //   return sql
  //     .select(
  //       `${SKILLS}.id`,
  //       `${ADVERSARIES_SKILLS}.career`,
  //       `${ADVERSARIES_SKILLS}.rank`,
  //       `${SKILLS}.type`,
  //     )
  //     .from(ADVERSARIES_SKILLS)
  //     .rightJoin(SKILLS, {
  //       [`${ADVERSARIES_SKILLS}.skill_id`]: `${SKILLS}.id`,
  //     })
  //     .on(`${ADVERSARIES_SKILLS}.player_character_id`, id)
  //     .orderBy(`${SKILLS}.type`, `${SKILLS}.id`)
  //     .toString()
  // }
  //
  // static getSkill(player_character_id, skillId) {
  //   return sql
  //     .select('id', `${ADVERSARIES_SKILLS}.rank`)
  //     .from(ADVERSARIES_SKILLS)
  //     .where({ player_character_id, skill_id: skillId })
  //     .toString()
  // }
  //
  // static postSkill({ rank, ...skill }) {
  //   return sql
  //     .insert(ADVERSARIES_SKILLS, {
  //       ...skill,
  //       [`${ADVERSARIES_SKILLS}.rank`]: rank,
  //     })
  //     .toString()
  // }
  //
  // static putSkill(id, rank, career) {
  //   return sql
  //     .update(ADVERSARIES_SKILLS)
  //     .set({ [`${ADVERSARIES_SKILLS}.rank`]: rank, career })
  //     .where({ id })
  //     .toString()
  // }
  //
  // static getAllTalents(player_character_id) {
  //   return sql
  //     .select('id', 'talent_id', `${ADVERSARIES_TALENTS}.rank`, 'notes')
  //     .from(ADVERSARIES_TALENTS)
  //     .where({ player_character_id })
  //     .toString()
  // }
  //
  // static getTalent(id) {
  //   return sql
  //     .select('id', 'talent_id', `${ADVERSARIES_TALENTS}.rank`, 'notes')
  //     .from(ADVERSARIES_TALENTS)
  //     .where({ id })
  //     .toString()
  // }
  //
  // static postTalent({ rank, ...talent }) {
  //   return sql
  //     .insert(ADVERSARIES_TALENTS, {
  //       ...talent,
  //       [`${ADVERSARIES_TALENTS}.rank`]: rank,
  //     })
  //     .toString()
  // }
  //
  // static putTalent(id, rank, notes) {
  //   return sql
  //     .update(ADVERSARIES_TALENTS)
  //     .set({ [`${ADVERSARIES_TALENTS}.rank`]: rank, notes })
  //     .where({ id })
  //     .toString()
  // }
  //
  // static getAllWeapons(player_character_id) {
  //   return sql
  //     .select([
  //       `${ADVERSARIES_WEAPONS}.id`,
  //       'weapon_id',
  //       `${WEAPONS}.name`,
  //       'mods',
  //     ])
  //     .from(ADVERSARIES_WEAPONS)
  //     .join(WEAPONS, {
  //       [`${ADVERSARIES_WEAPONS}.weapon_id`]: `${WEAPONS}.id`,
  //     })
  //     .where({ player_character_id })
  //     .toString()
  // }
  //
  // static getWeapon(id) {
  //   return sql
  //     .select([
  //       `${ADVERSARIES_WEAPONS}.id`,
  //       'weapon_id',
  //       `${WEAPONS}.name`,
  //       'mods',
  //     ])
  //     .from(ADVERSARIES_WEAPONS)
  //     .join(WEAPONS, {
  //       [`${ADVERSARIES_WEAPONS}.weapon_id`]: `${WEAPONS}.id`,
  //     })
  //     .where({ [`${ADVERSARIES_WEAPONS}.id`]: id })
  //     .toString()
  // }
  //
  // static postWeapon(weapon) {
  //   return sql
  //     .insert(ADVERSARIES_WEAPONS, {
  //       ...weapon,
  //     })
  //     .toString()
  // }
  //
  // static putWeapon(id, mods) {
  //   return sql
  //     .update(ADVERSARIES_WEAPONS)
  //     .set({ mods })
  //     .where({ id })
  //     .toString()
  // }
  //
  // static deleteWeapons(ids) {
  //   return sql
  //     .delete()
  //     .from(ADVERSARIES_WEAPONS)
  //     .where(sql.in('id', ...ids))
  //     .toString()
  // }
}

module.exports = AdversariesModel
