const sql = require('sql-bricks')

const {
  PLAYERS_CHARACTERS_CRITICAL_INJURIES,
  PLAYERS_CHARACTERS_FAVORS,
  PLAYERS_CHARACTERS_SKILLS,
  PLAYERS_CHARACTERS_TALENTS,
  PLAYERS_CHARACTERS_WEAPONS,
  PLAYERS_CHARACTERS,
  SKILLS,
  USERS,
  WEAPONS,
} = require('./constants')

class PlayersCharactersModel {
  static getAll() {
    return sql
      .select([
        `${PLAYERS_CHARACTERS}.id`,
        'name',
        `${USERS}.username player_name`,
        'archetype_id',
        'career_id',
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
      .from(PLAYERS_CHARACTERS)
      .join(USERS, {
        [`${PLAYERS_CHARACTERS}.user_id`]: `${USERS}.id`,
      })
      .toString()
  }

  static get(id) {
    return sql
      .select()
      .from(PLAYERS_CHARACTERS)
      .where({ id })
      .toString()
  }

  static put(id, fields) {
    return sql
      .update(PLAYERS_CHARACTERS)
      .set(fields)
      .where({ id })
      .toString()
  }

  static getAllCriticalInjuries(player_character_id) {
    return sql
      .select('id', 'critical_injury_id')
      .from(PLAYERS_CHARACTERS_CRITICAL_INJURIES)
      .where({ player_character_id })
      .toString()
  }

  static getCriticalInjury(id) {
    return sql
      .select('id', 'critical_injury_id')
      .from(PLAYERS_CHARACTERS_CRITICAL_INJURIES)
      .where({ id })
      .toString()
  }

  static postCriticalInjury(criticalInjury) {
    return sql
      .insert(PLAYERS_CHARACTERS_CRITICAL_INJURIES, {
        ...criticalInjury,
      })
      .toString()
  }

  static deleteCriticalInjuries(ids) {
    return sql
      .delete()
      .from(PLAYERS_CHARACTERS_CRITICAL_INJURIES)
      .where(sql.in('id', ...ids))
      .toString()
  }

  static getAllFavors(player_character_id) {
    return sql
      .select('id', 'size', 'type', 'faction_id', 'description', 'status')
      .from(PLAYERS_CHARACTERS_FAVORS)
      .where({ player_character_id })
      .toString()
  }

  static getFavor(id) {
    return sql
      .select('id', 'size', 'type', 'faction_id', 'description', 'status')
      .from(PLAYERS_CHARACTERS_FAVORS)
      .where({ id })
      .toString()
  }

  static postFavor(favor) {
    return sql
      .insert(PLAYERS_CHARACTERS_FAVORS, {
        ...favor,
      })
      .toString()
  }

  static putFavor(id, status) {
    return sql
      .update(PLAYERS_CHARACTERS_FAVORS)
      .set({ status })
      .where({ id })
      .toString()
  }

  static getAllSkills(id) {
    return sql
      .select(
        `${SKILLS}.id`,
        `${PLAYERS_CHARACTERS_SKILLS}.career`,
        `${PLAYERS_CHARACTERS_SKILLS}.rank`,
        `${SKILLS}.type`,
      )
      .from(PLAYERS_CHARACTERS_SKILLS)
      .rightJoin(SKILLS, {
        [`${PLAYERS_CHARACTERS_SKILLS}.skill_id`]: `${SKILLS}.id`,
      })
      .on(`${PLAYERS_CHARACTERS_SKILLS}.player_character_id`, id)
      .orderBy(`${SKILLS}.type`, `${SKILLS}.id`)
      .toString()
  }

  static getSkill(player_character_id, skillId) {
    return sql
      .select('id', `${PLAYERS_CHARACTERS_SKILLS}.rank`)
      .from(PLAYERS_CHARACTERS_SKILLS)
      .where({ player_character_id, skill_id: skillId })
      .toString()
  }

  static postSkill({ rank, ...skill }) {
    return sql
      .insert(PLAYERS_CHARACTERS_SKILLS, {
        ...skill,
        [`${PLAYERS_CHARACTERS_SKILLS}.rank`]: rank,
      })
      .toString()
  }

  static putSkill(id, rank, career) {
    return sql
      .update(PLAYERS_CHARACTERS_SKILLS)
      .set({ [`${PLAYERS_CHARACTERS_SKILLS}.rank`]: rank, career })
      .where({ id })
      .toString()
  }

  static getAllTalents(player_character_id) {
    return sql
      .select('id', 'talent_id', `${PLAYERS_CHARACTERS_TALENTS}.rank`, 'notes')
      .from(PLAYERS_CHARACTERS_TALENTS)
      .where({ player_character_id })
      .toString()
  }

  static getTalent(id) {
    return sql
      .select('id', 'talent_id', `${PLAYERS_CHARACTERS_TALENTS}.rank`, 'notes')
      .from(PLAYERS_CHARACTERS_TALENTS)
      .where({ id })
      .toString()
  }

  static postTalent({ rank, ...talent }) {
    return sql
      .insert(PLAYERS_CHARACTERS_TALENTS, {
        ...talent,
        [`${PLAYERS_CHARACTERS_TALENTS}.rank`]: rank,
      })
      .toString()
  }

  static putTalent(id, rank, notes) {
    return sql
      .update(PLAYERS_CHARACTERS_TALENTS)
      .set({ [`${PLAYERS_CHARACTERS_TALENTS}.rank`]: rank, notes })
      .where({ id })
      .toString()
  }

  static getAllWeapons(player_character_id) {
    return sql
      .select([
        `${PLAYERS_CHARACTERS_WEAPONS}.id`,
        'weapon_id',
        `${WEAPONS}.name`,
        'mods',
      ])
      .from(PLAYERS_CHARACTERS_WEAPONS)
      .join(WEAPONS, {
        [`${PLAYERS_CHARACTERS_WEAPONS}.weapon_id`]: `${WEAPONS}.id`,
      })
      .where({ player_character_id })
      .toString()
  }

  static getWeapon(id) {
    return sql
      .select([
        `${PLAYERS_CHARACTERS_WEAPONS}.id`,
        'weapon_id',
        `${WEAPONS}.name`,
        'mods',
      ])
      .from(PLAYERS_CHARACTERS_WEAPONS)
      .join(WEAPONS, {
        [`${PLAYERS_CHARACTERS_WEAPONS}.weapon_id`]: `${WEAPONS}.id`,
      })
      .where({ [`${PLAYERS_CHARACTERS_WEAPONS}.id`]: id })
      .toString()
  }

  static postWeapon(weapon) {
    return sql
      .insert(PLAYERS_CHARACTERS_WEAPONS, {
        ...weapon,
      })
      .toString()
  }

  static putWeapon(id, mods) {
    return sql
      .update(PLAYERS_CHARACTERS_WEAPONS)
      .set({ mods })
      .where({ id })
      .toString()
  }

  static deleteWeapons(ids) {
    return sql
      .delete()
      .from(PLAYERS_CHARACTERS_WEAPONS)
      .where(sql.in('id', ...ids))
      .toString()
  }
}

module.exports = PlayersCharactersModel
