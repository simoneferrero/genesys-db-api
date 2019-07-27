const transformPlayerCharacter = ({
  agility,
  brawn,
  cunning,
  defense_melee,
  defense_ranged,
  intellect,
  presence,
  soak,
  strain_current,
  strain_total,
  willpower,
  wounds_current,
  wounds_total,
  xp_available,
  xp_total,
  ...fields
}) => ({
  ...fields,
  characteristics: {
    brawn,
    agility,
    intellect,
    cunning,
    willpower,
    presence,
  },
  attributes: {
    soak,
    wounds: {
      current: wounds_current,
      total: wounds_total,
    },
    strain: {
      current: strain_current,
      total: strain_total,
    },
    defense: {
      melee: defense_melee,
      ranged: defense_ranged,
    },
  },
  xp: {
    available: xp_available,
    total: xp_total,
  },
})

const transformAdversary = ({
  agility,
  brawn,
  cunning,
  defense_melee,
  defense_ranged,
  intellect,
  presence,
  soak,
  strain_current,
  strain_total,
  willpower,
  wounds_current,
  wounds_total,
  ...fields
}) => ({
  ...fields,
  characteristics: {
    brawn,
    agility,
    intellect,
    cunning,
    willpower,
    presence,
  },
  attributes: {
    soak,
    wounds: {
      current: wounds_current,
      total: wounds_total,
    },
    strain: {
      current: strain_current,
      total: strain_total,
    },
    defense: {
      melee: defense_melee,
      ranged: defense_ranged,
    },
  },
})

const checkIsAuthorised = (role, id, authorisedId) => {
  if (role === 'gm' || (id && id === authorisedId)) {
    return
  }

  throw {
    status: 401,
    message: 'You are not authorised to see this content',
  }
}

module.exports = {
  checkIsAuthorised,
  transformAdversary,
  transformPlayerCharacter,
}
