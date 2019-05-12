/* eslint-disable */

const transformToSql = (talents) => `
INSERT INTO \`talents\`
        (\`id\`, \`name\`, \`tier\`, \`activation\`, \`ranked\`, \`description\`)
VALUES ${talents
  .map(
    ({ id, name, tier, activation, ranked, description }) =>
      `("${id}", "${name}", ${tier}, "${activation}", ${ranked}, "${description}")`,
  )
  .join(',\n')};
`
const talents = [
  {
    id: 'bought_info',
    name: 'Bought Info',
    tier: 1,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "When making any knowledge skill check, your character can instead use this talent to spend an amount of currency equal to fifty times the difficulty of the check and automatically succeed on the knowledge check with one uncanceled {success} (instead of rolling). At your GM's discretion, your character may not be able to use Bought info if the information is particularly sensitive or difficult to find, or buying it doesn't make narrative sense.",
  },
  {
    id: 'clever_retort',
    name: 'Clever Retort',
    tier: 1,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 0,
    description:
      "Once per encounter, your character may use this talent to add automatic {threat} {threat} to another character's social skill check.",
  },
  {
    id: 'corporate_drone',
    name: 'Corporate Drone',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      "When you take this talent, your character gains Knowledge (Society) or Negotiation as a career skill. In addition, once per session, your character may collect a small favor from any other member of a single corporation (chosen when you take this talent), even if they don't owe your character a favor.",
  },
  {
    id: 'custom_rig',
    name: 'Custom Rig',
    tier: 1,
    activation: 'Passive',
    ranked: 1,
    description:
      "When your character selects this talent they choose one computer (such as a rig, PAD, or spinal modem) that they own. The amount of ice or icebreakers (your character's choice) that they can have on that computer is increased by 1 per rank of Custom Rig. (This may be a mix of ice and icebreakers, as long as the combined total increase does not exceed your character's ranks in Custom Rig). If your character loses their affected computer, they may choose a new computer to be affected by this talent.",
  },
  {
    id: 'custom_code',
    name: 'Custom Code',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'When your character selects this talent they choose one icebreaker or piece of ice that they own. If they choose an icebreaker, whenever they use that icebreaker to override ice, they add {advantage} to the results. If they choose a piece of ice, whenever someone else attempts to override it, they add {threat} to the results.',
  },
  {
    id: 'customer_service_experience',
    name: 'Customer Service Experience',
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      "After your character makes a Charm check, they may suffer 1 strain to cancel {threat} equal to your character's ranks in Customer Service Experience.",
  },
  {
    id: 'deep_pockets',
    name: 'Deep Pockets',
    tier: 1,
    activation: 'Active (Maneuver)',
    ranked: 0,
    description:
      'Once per session, your character may use this talent to produce a small but narratively useful item from their pockets, backpack, or similar receptacle (it turns out the item had been there the whole time).\nYour GM has final say as to what items can be produced with Deep Pockets, but generally the item should cost less than 100 credits and have an encumbrance of 0 or 1.',
  },
  {
    id: 'disenfrancisto',
    name: 'Disenfrancisto',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'When you take this talent, your character gains Streetwise or Survival (your choice) as a career skill. In addition, once per session, your character may collect a small favor from any other disenfrancisto, even if they do not owe your character a favor.',
  },
  {
    id: 'former_professor',
    name: 'Former Professor',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'When you take this talent, your character gains one Knowledge skill (of your choice) as a career skill. In addition, once per session, your character may collect a small favor from a member of an institute of higher learning (chosen when you take this talent), even if they do not owe your character a favor.',
  },
  {
    id: 'hand_on_the_throttle',
    name: 'Hand on the Throttle',
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "Once per round while driving or piloting a vehicle, your character may use this talent to increase or decrease its speed by 1, to a minimum of 0 or to a maximum of the vehicle's max speed.",
  },
  {
    id: 'irijutsu_training',
    name: 'Irijutsu Training',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      "The first time during an envounter that your character draws a Melee weapon, increase the weapon's damage by 2 for the remainder of the turn.",
  },
  {
    id: 'knockout_punch',
    name: 'Knockout Punch',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      "Your character adds the Stun quality to their Brawl combat checks, with a rating equal to two plus your character's ranks in Coordination (this does not stack with other instances of the Stun quality).",
  },
  {
    id: 'net_search',
    name: 'Net Search',
    tier: 1,
    activation: 'Active (Maneuver)',
    ranked: 0,
    description:
      'If your character has access to the Network, they may use this talent to upgrade the ability of the next Knowledge check they make during their turn twice and the difficulty of that check once. Your GM must spend a {despair} to have your character learn some seemingly relevant and believable information that turns out to be completely (and possibly maliciously) false.',
  },
  {
    id: 'resourceful_mechanic',
    name: 'Resourceful Mechanic',
    tier: 1,
    activation: 'Passive',
    ranked: 1,
    description:
      'When your character makes a Mechanics check to repair system strain or hull trauma on a vehicle, they repair one additional system strain or hull trauma per rank of Resourceful Mechanic.',
  },
  {
    id: 'street_fighter',
    name: 'street Fighter',
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "When your character disorients or knocks their target prone while making a Brawl combat check, they may use this talent to cause the target to suffer wounds wqual to your character's ranks in Skullduggery.",
  },
  {
    id: 'tri_maf_contact',
    name: 'Tri-Maf Contact',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'When you take this talent, your character gains Melee or Skullduggery (your choice) as a career skill. In addition, once per session, your character may collect a small favor from a member of a single orgcrime group (chosen when you take this talent), even if they do not owe your character a favor.',
  },
  {
    id: 'union_member',
    name: 'Union Member',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'When you take this talent, your character gains Athletics, Mechanics, or Operating (your choice) as a career skill. In addition, once per session, your character may collect a small favor from a member of Humanity Labor or Human First (chosen when you take this talent), even if they do not owe your character a favor.',
  },
  {
    id: 'worlds_war_vet',
    name: 'Worlds War Vet',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      "When you take this talent, your character gains Ranged (Heavy) or Resilience (your choice) as a career skill. In addition, once per session, your character may collect a small favor from a current or former member of a single country's military (chosen when you take this talent), even if they do not owe your character a favor.",
  },
  {
    id: 'years_on_the_force',
    name: 'Years on the Force',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'When you take this talent, your character gains Perception or Ranged (Light) (your choice) as a career skill. In addition, once per session, your character may collect a small favor from a current or former member of the NAPD or New Angeles city government (chosen when you take this talent), even if they do not owe your character a favor.',
  },
  {
    id: 'defensive_sysops',
    name: 'Defensive Sysops',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      "When attempting to defend a computer sustem against intrusion (or when someone attempts to hack a computer owned or programmed by your character) your character adds {setback} {setback} to their opponent's checks. If your character has access to the computer system when the intrusion takes place, they are automatically aware of the intrusion.",
  },
  {
    id: 'desperate_recovery',
    name: 'Desperate Recovery',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'Before your character heals strain at the end of an encounter, if their strain is more than half of their strain treshold, they heal two additional strain.',
  },
  {
    id: 'duelist',
    name: 'Duelist',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'Your character adds {boost} to their melee combat checks while engaged with a single opponent. Your character adds {setback} to their melee combat checks while engaged with three or more opponents.',
  },
  {
    id: 'durable',
    name: 'Durable',
    tier: 1,
    activation: 'Passive',
    ranked: 1,
    description:
      'Your character reduces any Critical Injury result they suffer by 10 per rank of Durable, to a minimum of 1.',
  },
  {
    id: 'forager',
    name: 'Forager',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'Your character removes up to {setback} {setback} from any skill checks they make to find food, water, or shelter. Checks to forage or search the area that your character makes take half the time they would normally.',
  },
  {
    id: 'grit',
    name: 'Grit',
    tier: 1,
    activation: 'Passive',
    ranked: 1,
    description:
      "Each rank of Grit increases your Character's strain threshold by one.",
  },
  {
    id: 'hamstring_shot',
    name: 'Hamstring Shot',
    tier: 1,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "Once per round, your character may use this talent to performa a ranged combat check against one non-vehicle target within range of the weapon used. If the check is successful, halve the damage inflicted by the attack (before reducing damage by the target's soak). The target is immobilized until the end of its next turn.",
  },
  {
    id: 'jump_up',
    name: 'Jump Up',
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "Once per round during your character's turn, your character may use this talent to stand from a prone or seated position as an incidental",
  },
  {
    id: 'knack_for_it',
    name: 'Knack for It',
    tier: 1,
    activation: 'Passive',
    ranked: 1,
    description:
      'When you purchase this talent for your character, select one skill. Your character removes {setback} {setback} from any thecks they make using this skill.\nEach additional time you purchase this talent for your character, select two additional skills. Your character also removes {setback} {setback} from any checks they make using these skills. You cannot select combat skills when choosing skills for this talent.',
  },
  {
    id: 'know_somebody',
    name: 'Know Somebody',
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      'Once per session, when attempting to purchase a legally available item, your character may use this talent to reduce its rarity by one per rank of Know Somebody.',
  },
  {
    id: 'lets_ride',
    name: "Let's Ride",
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "Once per round during your character's turn, your character can use this talent to mount or dismount from a vehicle or animal, or move from one position in a vehicle to another (such as from the cockpit to a gun turrent) as an incidental. In addition, if your character suffers a short-range fall (see page 112 of the Core Rulebook) from a vehicle or animal, they suffer no damage and land on their feet.",
  },
  {
    id: 'one_with_nature',
    name: 'One with Nature',
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'When in the wilderness, your character may make a simple (-) Survival check, instead of Discipline or cool, to recover strain at the end of an encounter (see page 117 of the Core Rulebook).',
  },
  {
    id: 'parry',
    name: 'Parry',
    tier: 1,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 1,
    description:
      'When your character suffers a hit from a melee combat check, after damage is calculated but before soak is applied (so immediately after Step 3 of Perform a Combat check, page 102 of the Core Rulebook), your character may suffer 3 strain to use this talent to reduce the damage of the hit by two plus their ranks in Parry. This talent can only be used once per hit, and your character needs to be wielding a Melee weapon.',
  },
  {
    id: 'proper_upbringing',
    name: 'Proper Upbringing',
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      "When your character makes a social skill check in polite ocmpany (as determined by your GM), they may suffer a number of strain to use this talent to add an equal number of {advantage} to the check. The number may not exceed your character's ranks in Proper Upbringing.",
  },
  {
    id: 'quick_draw',
    name: 'Quick Draw',
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "Once per round on your character's turn, they may use this talent to draw or holster an easily accessible weapon or item as an incidental. Quick Draw also reduces a weapon's Prepare raitng by one, to a minimum of one.",
  },
  {
    id: 'quick_strike',
    name: 'Quick Strike',
    tier: 1,
    activation: 'Passive',
    ranked: 1,
    description:
      'Your character adds {boost} for each rank of Quick strike to any combat checks they make against any target that have not yet taken their turn in the current encounter.',
  },
  {
    id: 'rapid_reaction',
    name: 'Rapid Reaction',
    tier: 1,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 1,
    description:
      "Your character may suffer a number of strain to use this talent to add an equal number of {success} to a Vigilance or Cool check they make to determine Initiative order. The number may not exceed your character's ranks in Rapid Reaction.",
  },
  {
    id: 'second_wind',
    name: 'second Wind',
    tier: 1,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      'Once per encounter, your character may use this talent to heal an amount of strain equal to their ranks in Second Wind.',
  },
  {
    id: 'surgeon',
    name: 'surgeon',
    tier: 1,
    activation: 'Passive',
    ranked: 1,
    description:
      'When your character makes a Medicine check to heal wounds, the target heals one additional wound per rank of Surgeon.',
  },
  {
    id: 'swift',
    name: 'swift',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'Your character does not suffer the penalties for moving through difficult terrain (they move through difficult terrain at normal speed without spending additional maneuvers).',
  },
  {
    id: 'toughened',
    name: 'Toughened',
    tier: 1,
    activation: 'Passive',
    ranked: 1,
    description:
      "Each rank of Toughened increases your character's wound threshold by two.",
  },
  {
    id: 'unremarkable',
    name: 'Unremarkable',
    tier: 1,
    activation: 'Passive',
    ranked: 0,
    description:
      'Other characters add {failure} to any checks made to find or identify your character in a crowd.',
  },
  {
    id: 'bad_cop',
    name: 'Bad Cop',
    tier: 2,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      "Your character may spend {advantage} {advantage} from a Coercion or Deception check to use this talent to upgrade the ability of a single ally's subsequent social skill check a number of times wqual to your character's ranks in Bad Cop. The check must target the same character as your character's initial check, and it must take place during the same encounter.\nOnly one character may affect a check with this talent.",
  },
  {
    id: 'big_guns',
    name: 'Big Guns',
    tier: 2,
    activation: 'Passive',
    ranked: 0,
    description:
      "Your character's encumbrance threshold is 10 plus their Brawn, instead of 5 plus their Brawn. Your character reduces the Cumbersome rating of any weapon they carry by 1, to a minimum of 3.",
  },
  {
    id: 'codeslinger',
    name: 'Codeslinger',
    tier: 2,
    activation: 'Passive',
    ranked: 0,
    description:
      'When your character performs the activate program maneuver (page 132 of Shadow of the Beanstalk Rulebook) in a hacking encounter, they can choose not to deactivate one other active icebreaker. They may have two icebreakers active at once.',
  },
  {
    id: 'combat_medicine',
    name: 'Combat Medicine',
    tier: 2,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      'Before making a Medicine check, your character may use this talent to add {success} equal to their ranks in Combat Medicine to the results. After the check is resolved, the target suffers 2 strain for each rank your character has in Combat Medicine.',
  },
  {
    id: 'determined_driver',
    name: 'Determined Driver',
    tier: 2,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'You may spend a Story Point to use this talent to have your character heal system strain on a vehicle they are currently driving, piloting or operating equal to their ranks in Driving, Piloting or Operating (choose the skill used to direct the vehicle).',
  },
  {
    id: 'good_cop',
    name: 'Good Cop',
    tier: 2,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      "Your character may spend {advantage} {advantage} from a Charm or Negotiation check to use this talent to upgrade the ability of a single ally's subsequent social skill check a number of times equal to your character's ranks in Good Cop. The check must target the same character as your character's initial check, and it must take place during the same encounter.\nOnly one character may affect a check with this talent.",
  },
  {
    id: 'haughty_demeanor',
    name: 'Haughty Demeanor',
    tier: 2,
    activation: 'Passive',
    ranked: 0,
    description:
      'Other characters add {threat} to social skill checks targeting your character.',
  },
  {
    id: 'nethunter',
    name: 'Nethunter',
    tier: 2,
    activation: 'Passive',
    ranked: 0,
    description:
      'When your character successfully traces another character during a Network encounter, your character gains one additional trace.',
  },
  {
    id: 'parkour',
    name: 'Parkour!',
    tier: 2,
    activation: 'Active (Maneuver)',
    ranked: 0,
    description:
      'Once per round, your character may suffer 1 strain to use this talent and move to any location within short range.\nThis includes locations that are vertically distant or have no easy access route, but there must be an object to move across or path to move along. Your GM may rule some locations cnanot be reached (such as ones behind locked doors or walls).',
  },
  {
    id: 'probing_question',
    name: 'Probing Question',
    tier: 2,
    activation: 'Passive',
    ranked: 0,
    description:
      "If your character knows an opponent's Flaw or Fear motivation, when your character inflicts strain on that opponent using a social skill, the opponent suffers 3 additional strain.",
  },
  {
    id: 'quick_fix',
    name: 'Quick Fix',
    tier: 2,
    activation: 'Active (Maneuver)',
    ranked: 0,
    description:
      "You may spend a Story Point to use this talent to have your character temporarily repair one damaged item they are engaged with. For a number of rounds equal to your character's ranks in Mechanics, the item may be used without penalty (see page 89 of the Core Rulebook), even if it is unusable. When the effect ends, the item is damaged one additional step; if it was already suffering from major damage, it is destroyed and cannot be repaired.",
  },
  {
    id: 'speciel_use_permit',
    name: 'Special Use Permit',
    tier: 2,
    activation: 'Passive',
    ranked: 0,
    description:
      'Your character does not treat any Ranged (Heavy) weapons as restricted (R).\nThis also means your character can carry a Ranged (Heavy) weapon that normally would be restricted in public without being arrested. However, they can still be arrested for using such a weapon in an unlawful manner.',
  },
  {
    id: 'tactical_focus',
    name: 'Tactical Focus',
    tier: 2,
    activation: 'Passive',
    ranked: 0,
    description:
      'When performing a combat check with a Ranged (Heavy) weapon, if your character did not perform a maneuver to ready or stow a weapon or item during this turn, they add {advantage} to the results.',
  },
  {
    id: 'two_handed_stance',
    name: 'Two-Handed Stance',
    tier: 2,
    activation: 'Passive',
    ranked: 0,
    description:
      'When performing a combat check with a Ranged (Light) weapon, if your character has nothing in the other hand, they add {advantage} to the results.',
  },
  {
    id: 'undercity_contracts',
    name: 'Undercity Contracts',
    tier: 2,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "Once per session, you may spend one Story Point to use this talent to let your character learn if a character of your choice is in New Angeles, and if so, what district.\nAt your GM's discretion, the information may take up to an hour to come back to your character.",
  },
  {
    id: 'coordinated_assault',
    name: 'Coordinated Assault',
    tier: 2,
    activation: 'Active (Maneuver)',
    ranked: 1,
    description:
      "Once per turn, your character may use this talent to have a number of allies engaged with your character equal to your ranks in Leadership add {advantage} to all combat checks they make until the end of your character's next turn. The range of this talent increases by one band per rank of Coordinated Assault beyond the first.",
  },
  {
    id: 'counteroffer',
    name: 'Counteroffer',
    tier: 2,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "Once per session, your character may use this talent to choose one non-nemesis adversary within medium range and make an opposed Negotiation versus Discipline check. If successful, the target becomes staggered until the end of their next turn.\nAt your GM's discretion, you may spend {triumph} on this check to have the adversary become an ally until the end of the encounter. However, the duration of this may be shortened or exgtended depending on whether your GM feels your offer is appealing to the adversary and whether your character follows through on their offer!",
  },
  {
    id: 'daring_aviator',
    name: 'Daring Aviator',
    tier: 2,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      "Before your character makes a Driving or Piloting check, they may add a number of {threat} to the results to use this talent to ad ann equal number of {success}. The number may not exceed your character's ranks in Daring Aviator.",
  },
  {
    id: 'defensive_stance',
    name: 'Defensive Stance',
    tier: 2,
    activation: 'Active (Maneuver)',
    ranked: 1,
    description:
      "Once per round, your character may suffer a number of strain no greater than their ranks in Defensive Stance to use this talent. Then, until the end of your character's next turn, upgrade the difficulty of all melee combat checks targeting your character a number of times equal to the strain suffered.",
  },
  {
    id: 'defensive_sysops_improved',
    name: 'Defensive Sysops (Improved)',
    tier: 2,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'Your character must have purchased the Defensive Susops talent to benefit from this talent. Before adding {setback} {setback} from Defensive Sysops to a check, use this talent to add {failure} {threat} to the results of the check instead.',
  },
  {
    id: 'dual_wielder',
    name: 'Dual Wielder',
    tier: 2,
    activation: 'Active (Maneuver)',
    ranked: 0,
    description:
      'Once per round, your character may use this talent to decrease the difficulty of the next combined combat check (see Two-Weapon Combat on page 108 of the Core Rulebook) they make during the same turn by one.',
  },
  {
    id: 'heightened_awareness',
    name: 'Heightened Awareness',
    tier: 2,
    activation: 'Passive',
    ranked: 0,
    description:
      'Allies within short range of your character add {boost} to their Perception and Vigilance checks. Allies engaged with your character add {boost} {boost} instead.',
  },
  {
    id: 'inspiring_rhetoric',
    name: 'Inspiring Rhetoric',
    tier: 2,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      'Your character may use this talent to make an Average ({difficulty} {difficulty}) Leadership check. For each {success} the check generates, one ally within short range heals 1 strain. For each {advantage}, one ally benefiting from Inspiring Rhetoric heals 1 additional strain.',
  },
  {
    id: 'inventor',
    name: 'Inspiring Rhetoric',
    tier: 2,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      'When your character makes a check to construct new items or modify existing ones, use this talent to add a number of {boost} to the check equal to the ranks of Inventor. In addition, your character may attempt to reconstruct devices that they have heard described but have not seen and do not have any kinds of plans or schematics for.',
  },
  {
    id: 'lucky_strike',
    name: 'Lucky Strike',
    tier: 2,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "When your character purchases this talent, choose one characteristic. After your character makes a successful combat check, you may spend one Story Point to use this talent to add damage equal to your character's ranks in that characteristic to one hit of the combat check.",
  },
  {
    id: 'scathing_tirade',
    name: 'Scathing Tirade',
    tier: 2,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      'Your character may use this talent to make an Average ({difficulty} {difficulty}) Coercion check. For each {success} the check generates, one enemy within short range suffers 1 strain. For each {advantage}, one enemy affected by Scathing Tirade suffers 1 additional strain.',
  },
  {
    id: 'side_step',
    name: 'Side Step',
    tier: 2,
    activation: 'Active (Maneuver)',
    ranked: 1,
    description:
      "Once per round, your character may suffer a number of strain no greater than their ranks in Side Step to use this talent. Until the end of your character's next turn, upgrade the difficulty of all ranged combat checks targeting your character a number of times equal to the strain suffered.",
  },
  {
    id: 'applied_research',
    name: 'Applied Research',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      'Your character may use this talent before making a check to use any knowledge skill and Intellect instead of the skill and characteristic the check would normally require. Your character may use this talent a number of times per session equal to their ranks in Applied Research.\nWhen your character uses this talent, you should explain how their mastery of knowledge lets them accomplish this task. In addition, your GM may rule that a particular knowledge skill makes the most sense in a given situation, and require your character to use that specific knowledge skill.',
  },
  {
    id: 'bad_habit',
    name: 'Bad Habit',
    tier: 3,
    activation: 'Active (Maneuver)',
    ranked: 0,
    description:
      "Your character may use this talent to become disoriented for the remainder of the encounter. At the beginning of each of your character's turns, if they are still disoriented due to this talent, they heal 2 strain.",
  },
  {
    id: 'body_guard',
    name: 'Body Guard',
    tier: 3,
    activation: 'Active (Maneuver)',
    ranked: 1,
    description:
      "Once per round, your character may suffer a number of strain no greater than their ranks in Body Guard to use this talent. Choose one ally engaged with your character, until the end of your character's next turn, upgrade the difficulty of all combat checks targeting that ally a number of times equal to the strain suffered.",
  },
  {
    id: 'dumb_luck',
    name: 'Dumb Luck',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'Once per session, you may spend a Story Point to use this talent after your character suffers a Critical Injury but before the result is rolled. Their opponent must roll two results, and you select which applies to your character.',
  },
  {
    id: 'hard_boiled',
    name: 'Hard-Boiled',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'When your character makes a check to recover from strain at the end of an encounter (as described on page 117 of the Core Rulebook), your character may make a Simple (-) Resilience check instead of Discipline or Cool. If your character does so, they heal 1 strain per {success} and 1 wound per {advantage}.',
  },
  {
    id: 'hold_it_steady',
    name: 'Hold It Steady',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'Before performing a combat check using a weapon with the Auto-fire quality, your character may use this talent to use the Auto-fire quality without increasing the difficulty of the combat check. If they do so, each time they trigger an additional hit during the attack, they fuffer 2 strain.',
  },
  {
    id: 'laugh_it_off',
    name: 'Laugh It Off',
    tier: 3,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 0,
    description:
      'When your character is targeted by a social skill check they may use this talent to spend {threat} {threat} {threat} or {despair} to reduce any strain the check inflicts by a number equal to their ranks in Charm. If they do so, the character who targeted them suffers an amount of strain equal to the amount of strain reduced.',
  },
  {
    id: 'martial_weapons_master',
    name: 'Martial Weapons Master',
    tier: 3,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      'While armed with a Melee weapon, your character may use this talent to make an Average ({difficulty} {difficulty}) Melee check. If successful, your character may force one engaged target to either drop one weapon they are holding or move up to one range band in a direction of your choosing.\nIf your character forces a named rival or nemesis into dangerous terrain (or off a ledge or cliff) using this talent, your GM can spend a Story Point to allow them to catch themselves at the edge and fall prone instead.',
  },
  {
    id: 'net_warrior',
    name: 'Martial Weapons Master',
    tier: 3,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      'While accessing a system using a brain-machine interface (BMI), your character may use this talent to make an opposed Computers (Hacking) versus Computers (Sysops) check targeting one other character on the system that they are aware of. The target suffers 1 strain per {success}, and if they are using a BMI, they also suffer 1 wound per {success}.',
  },
  {
    id: 'nimble',
    name: 'Nimble',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "At the start of your character's turn, you may spend one Story Point to use this talent to allow your character to perform a move maneuver as an incidental. (This does not count against the limit of two maneuvers per turn.) If you use this talent, your character can only perform one additional move maneuver during this turn.",
  },
  {
    id: 'snare',
    name: 'Snare',
    tier: 3,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      'Once per session, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Computers (Sysops) check. If they succeed, once before the end of the encounter, you may spend a Story Point to force one character in the encounter to make a Daunting ({difficulty} {difficulty} {difficulty} {difficulty}) Vigilance check as an incidental. If they fail, they are staggered until the end of their next turn, plus one additional turn per {threat} {threat}.',
  },
  {
    id: 'suppressing_fire',
    name: 'Suppressing Fire',
    tier: 3,
    activation: 'Active (Maneuver)',
    ranked: 1,
    description:
      "If your character does not make a combat check during their turn, they use this talent to target one character (or minion group) within long range. That character must upgrade the difficulty of any ranged combat chekcs they make once until the end of your character's next turn. Your character may choose to affect one additional character for each additional rank of Suppressing Fire.\nYour character must be holding a ranged weapon to use this talent. Your GM can rule that your character can't use this talent if they have no line of fire or range to the target.",
  },
  {
    id: 'takedown',
    name: 'Takedown',
    tier: 3,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "Your character may use this talent to make an opposed Brawl versus Resilience check targeting one engaged opponent. If the check succeeds, the target is knocked prone and is immobilized until the end of your character's next turn. If the target is a minion or rival, your character can spend {triumph} to incapacitate (but not kill) the target instead.",
  },
  {
    id: 'undercity_contacts_improved',
    name: 'Undercity Contacts (Improved)',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "Your character must have purchased the Undercity Contacts talent to benefit from this talent. When you use Undercity Contacts, you may choose to spend two Story Points instead of one. If you do, your character learns the target's specific location.",
  },
  {
    id: 'you_owe_me_one',
    name: 'You Owe Me One',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "Once per session, you may spend two Story Points to use this talent to have one NPS in the current encounter owe your character a favor. If the favor is not resolved by the end of the encounter, it is forgotten.\nIt's up to you and your GM to determine exactly why the NPC owes your character a favor.",
  },
  {
    id: 'animal_companion',
    name: 'Animal Companion',
    tier: 3,
    activation: 'Passive',
    ranked: 1,
    description:
      "Your character creates a bond with a single animal approved by your GM. This animal must be silhouette 0 (no largetr than a mid-sized dog). The bond persists as long as your character chooses, although at your GM's discretion, the bond may also be broken due to abusive treatment or other extenuating circumstances.\nAs long as the bond persists, the animal follows your character, and you dictate the animal's overall behavior (although, since the animal is only bonded with the character, not dominated, it may still perform inconvenient actions such as scratching furniture, consuming rations, and marking territory). Once per round, in structured encounters, your character may spend one maneuver to direct their animal in performing one action and one maneuver during your characters' turn. The animal must be within hearing and visual range of your character (generally medium range) to do this. Otherwise, the animal does not contribute to the encounter. The specifics of its behavior are up to you and your GM.\nFor every additional rank of Animal Companion your character has, increase the allowed silhouette of the companion by one (this may mean your character gets a new companion, or their companion grows in size).\nThis talent can also change in flavor depending on the nature of your game setting. In a futuristing setting it may make more sense for the \"animal\" to be a robot or drone, for example.",
  },
  {
    id: 'barrel_roll',
    name: 'Barrel Roll',
    tier: 3,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 0,
    description:
      'Your character can only use this talent while piloting a stargighter or airplane of Silhouette 3 or less. When your vehicle suffers a hit from a ranged combat check, after damage is calculated but before armor is applied, your character may have their vehicle suffer 3 system strain to use this talent. Then, reduce the damage suffered by a number equal to their ranks in Piloting.',
  },
  {
    id: 'distinctive_style',
    name: 'Distinctive Style',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'When making a Computers check to hack a system or break into a secured network, before rolling, your character may use this talent to add {success} {success} {threat} {threat} to the results.\nIf the check generates {threat} {threat}, your GM should spend it on the I Know You! option in Table I.2-22 on page 234 of the Core Rulebook.',
  },
  {
    id: 'dodge',
    name: 'Dodge',
    tier: 3,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 1,
    description:
      'When your character is targeted by a combat check (ranged or melee), they may suffer a number of strain no greater than their ranks in Dodge to use this talent. Then, upgrade the difficulty of the combat check targeting your character a number of times equal to the strain suffered.',
  },
  {
    id: 'eagle_eyes',
    name: 'Eagle Eyes',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      "Once per encounter before making a ranged combat check, you may use this talent to increase your weapon's range by one range band (to a maximum of extreme range). This lasts for the duration of the combat check.",
  },
  {
    id: 'field_commander',
    name: 'Field Commander',
    tier: 3,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "Your character may use this talent to make an Average ({difficulty} {difficulty}) Leadership check. If successful, a number of allies equal to your character's Presence may immediately suffer 1 strain to perform one Maneuver (out of turn). If there are any questions as to which allies take their maneuvers first, your character is the final arbiter.",
  },
  {
    id: 'forgot_to_count',
    name: 'Forgot to Count?',
    tier: 3,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 0,
    description:
      'When an opponent makes a ranged combat check, you can spend {threat} {threat} from that check to use this talent to cause their weapon to run out of ammo (see page 104 of the Core Rulebook), as long as the weapon can normally run out of ammonition.',
  },
  {
    id: 'full_throttle',
    name: 'Full Throttle',
    tier: 3,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "While driving or flying, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Piloting or Driving check. If successful, the top speed of the vehicle increases by one (to a maximum of 4) for a number of rounds equal to your character's Cunning.",
  },
  {
    id: 'grenadier',
    name: 'Grenadier',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 1,
    description:
      "When your character makes a ranged combat check with a weapon that has the Blast item quality, you may spend one Story Point to use this talent to trigger the weapon's Blast quality, instead of spending {advantage} (even if the attack misses). In addition, your character treats grenades as having a range of medium.",
  },
  {
    id: 'inspiring_rhetoric_improved',
    name: 'Inspiring Rhetoric (Improved)',
    tier: 3,
    activation: 'Passive',
    ranked: 0,
    description:
      "Your character must have purchased the Inspiring Rhetoric talent to benefit from this talent. Allies affected by your character's Inspiring Rhetoric add {boost} to all skill checks they make for a number of rounds equal to your character's ranks in Leadership.",
  },
  {
    id: 'painkiller_specialization',
    name: 'Painkiller Specialization',
    tier: 3,
    activation: 'Passive',
    ranked: 1,
    description:
      'When your character uses slap patches, the target heals one additional wound per rank of Painkiller Specialization. The sixth painkiller and beyond each day still has no effect.',
  },
  {
    id: 'scathing_tirade_improved',
    name: 'Scathing Tirade (Improved)',
    tier: 3,
    activation: 'Passive',
    ranked: 0,
    description:
      "Your character must have purchased the Scathing Tirade talent to benefit from this talent. Enemies affected by your character's Scathing Tirade add {setback} to all skill checks they make for a number of rounds equal to your character's ranks in Coercion.",
  },
  {
    id: 'heroic_will',
    name: 'Heroic Will',
    tier: 3,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 0,
    description:
      'When you purchase this talent for your character, choose two characteristics. You may spend a Story point to use this talent to have your character ignore the effects of all Critical Injuries on any skill checks using those two characteristics until the end of the current encounter. (Your character still suffers the Critical Injuries, they just ignore the effects. See page 114 of the Core Rulebook.)',
  },
  {
    id: 'natural',
    name: 'Natural',
    tier: 3,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'When your character purchases this talent, choose two skills. Once per session, your character may use this talent to reroll one skill check that uses one of those two skills.',
  },
  {
    id: 'parry_improved',
    name: 'Parry (Improved)',
    tier: 3,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 0,
    description:
      "Your character must have purchased the Parry talent to benefit from this talent. When your character suffers a hit from a melee combat check and uses Parry to reduce the damage from that hit, after the attack is resolved, you may spend {despair} or {threat} {threat} {threat} from the attacker's check to use this talent. Then, your character automatically hits the attacker once with a Brawl or Melee weapon your character is wielding. The hit deals the weapon's base damage, plus any damage from applicable talents or abilities. Your character can't use this talent if the original attack incapacitates them.",
  },
  {
    id: 'burn_through',
    name: 'Burn Through',
    tier: 4,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'After making a successful break ice action, your character may suffer 3 strain to use this talent. If they do, they may perform a second override ice action on the same system as na incidental.',
  },
  {
    id: 'elementary',
    name: 'Elementary',
    tier: 4,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "Once per session, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Perception check while present at a crime scene. If they succeed, they identify all prominent physical characteristics of one person who was at the crime scene when the crime was committed (as long as the crime was committed in the past 48 hours). This could include a person's height, weight, body type, clothing, and if they are human or not. Your character may identify all the physical characteristics of one additional person present at the scene per additional {success}.",
  },
  {
    id: 'offensive_driving',
    name: 'Offensive Driving',
    tier: 4,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "While driving or piloting a vehicle, your character may use this talent to select one other vehicle within medium range and make an opposed Driving or Piloting versus Driving or Piloting check (depending on whether your character and their opponent pilot are using Driving or Piloting to control their vehicle) targeting the other vehicle's driver or pilot. If successful, roll twice on Table III.2-19: Critical Hit Result, on page 230 of the Core Rulebook. Choose one Critical Hit result to apply to your character's vehicle, and the other to apply to the other vehicle. You may spend {triumph} to add +20 to one Critical Hit result. Your GM may spend {despair} to add +20 to both Critical Hit results.",
  },
  {
    id: 'parkour_improved',
    name: 'Parkour! (Improved)',
    tier: 4,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'Your character must have purchased the Parkour! talent to benefit from this talent. Once per round, when using the Parkour! talent, your character may suffer 4 strain instead of 1 strain to move to any location within medium range instead of within short range. All other restrictions of Parkour! apply to this movement.',
  },
  {
    id: 'quick_witted',
    name: 'Quick Witted',
    tier: 4,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 0,
    description:
      "Once per encounter, after another character makes a social skill check, your character may use this talent to make an Average ({difficulty} {difficulty}) Vigilance check. If successful, you may add a number of {success} or {advantage} (your choice) equal to your character's ranks in Charm to the other character's check. If your character fails, your character suffers 3 strain.",
  },
  {
    id: 'urban_combatant',
    name: 'Urban Combatant',
    tier: 4,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 0,
    description:
      "When your character is targeted by a combat check while in an urban environment, you may spend one Story Point to use this talent before the dice pool is rolled. If you do so, your character's opponent removes all {setback} added to the check, and instead adds an equal number of {failure} to the results.",
  },
  {
    id: 'you_owe_me_one_improved',
    name: 'You Owe Me One (Improved)',
    tier: 4,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'Your character must have purchased the You Owe Me One talent to benefit from this talent. Once per session, you may spend two Story Points to use You Owe Me One to have one NPC in the current encounter owe your character a big favor instead of a favor. If the big favor is not resolved by the end of the encounter, it is forgotten.',
  },
  {
    id: 'cant_we_talk_about_this',
    name: "Can't We Talk About This?",
    tier: 4,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      'Your character can use this talent to make an opposed Charm or Deception versus Discipline check targeting a single non-nemesys adversary within medium range. If the check succeeds, the target cannot attack your character (or perform hostile actions against your character) until the end of their next turn. You may spend {advantage} {advantage} to increase the length of the effect by one additional turn, and spend {triumph} to extend the benefits to all of their identified allies within short range.\nThe effect ends immediately if your character or a known ally attacks the target. In addition, your GM may rule that some targets are immune to this ability. An automated sentry turret, for example, has no interest in resolving a conflict through talking, nor would someone consumed by rage and the desire for revenge against your character.',
  },
  {
    id: 'deadeye',
    name: 'Deadeye',
    tier: 4,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'After your character inflicts a Critical Injury with a ranged weapon and rolls the result, your character may suffer 2 strain to use this talent. Then, you may select any Critical Injury of the same severity to apply to the target instead.',
  },
  {
    id: 'defensive',
    name: 'Defensive',
    tier: 4,
    activation: 'Passive',
    ranked: 1,
    description:
      "Each rank of Defensive increases your character's melee defense and ranged defense by one.",
  },
  {
    id: 'defensive_driving',
    name: 'Defensive Driving',
    tier: 4,
    activation: 'Passive',
    ranked: 1,
    description:
      'Increase the defense of any vehicle your character pilots by one per rank of Defensive Driving.',
  },
  {
    id: 'enduring',
    name: 'Enduring',
    tier: 4,
    activation: 'Passive',
    ranked: 1,
    description:
      "Each rank of Enduring increases your character's soak value by one.",
  },
  {
    id: 'field_commander_improved',
    name: 'Field Commander (Improved)',
    tier: 4,
    activation: 'Passive',
    ranked: 0,
    description:
      "Your character must have purchased the Field Commander talent to benefit from this talent. When your character uses the Field Commander talent, your character affects a number of allies equal to twice the character's Presence. In addition, you may spend {triumph} to allow one ally to suffer 1 strain to perform an action, instead of a maneuver.",
  },
  {
    id: 'how_convenient',
    name: 'How Convenient!',
    tier: 4,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "Once per session, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Mechanics check. If successful, one device involved in the current encounter (subject to your GM's approval) spontaneously fails. This can be because of your character's actions, or it can simply be incredibly convenient timing!",
  },
  {
    id: 'inspiring_rhetoric_supreme',
    name: 'Inspiring Rhetoric (Supreme)',
    tier: 4,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'Your character must have purchased the Inspiring Rhetoric talent to benefit from this talent. Your character may choose to suffer 1 strain to use the Inspiring Rhetoric talent as a maneuver, instead of as an action.',
  },
  {
    id: 'overcharge',
    name: 'Overcharge',
    tier: 4,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      'Once per encounter, your character may make a Hard ({difficulty} {difficulty} {difficulty}) Mechanics check and choose one of their cybernetic implants that grants them one of the following: +1 to a characteristic ratink, +1 rank to a skill, +1 rank of a ranked talent. If your character succeeds, until the end of the encounter the chosen cybernetic instead provides +2 of the affected characteristic rating (to a maximum of 7), skill (to a maximum of 5), or ranked talent.\nYour GM may spend {despair} or {threat} {threat} {threat} from the check to have the overcharged cybernetic short out at the end of the encounter; it provides no benefit until your character spends several hours making an Average ({difficulty} {difficulty}) Mechanics check to repair it.',
  },
  {
    id: 'scathing_tirade_supreme',
    name: 'Scathing Tirade (Supreme)',
    tier: 4,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'Your character must have purchased the Scathing Tirade talent to benefit from this talent. Your character may choose to suffer 1 strain to use the Scathing Tirade talent as a maneuver, instead of as an action.',
  },
  {
    id: 'dedication',
    name: 'Dedication',
    tier: 5,
    activation: 'Passive',
    ranked: 1,
    description:
      "Each rank of Dedication increases one of your character's characteristics by one. This talent cannot increase a characteristic above 5. You cannot increase the same characteristic with Dedication twice.",
  },
  {
    id: 'indomitable',
    name: 'Indomitable',
    tier: 5,
    activation: 'Active (Incidental, Out of Turn)',
    ranked: 0,
    description:
      'Once per encounter, when your character would be incapacitated due to exceeding their wound or strain threshold, you may spend a Story Point to use this talent. Then, your character is not incapacitated until the end of their next turn. If your character reduces their strain or wounds to below their threshold before the end of their next turn, they are not incapacitated.',
  },
  {
    id: 'master',
    name: 'Master',
    tier: 5,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'When you purchase this talent for your character, choose one skill. Once per round, your character may suffer 2 strain to use this talent to reduce the difficulty of the next check they make using that skill by two, to a minimum of Easy ({difficulty}).',
  },
  {
    id: 'overcharge_improved',
    name: 'Overcharge (Improved)',
    tier: 5,
    activation: 'Passive',
    ranked: 0,
    description:
      'Your character must have purchased the Overcharge talent to benefit from this talent. When using the Overcharge talent, your character may spend {advantage} {advantage} or {triumph} from the Mechanics check to immediately take one additional action. This talent can only be used once per check.',
  },
  {
    id: 'ruinous_repartee',
    name: 'Ruinous Repartee',
    tier: 5,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "Once per encounter, your character may use this talent to make an opposed Charm or Coercion versus Discipline check targeting one character within medium range (or within earshot). If successful, the target suffers strain equal to twice your character's Presence, plus one additional strain per {success}. Your character heals strain equal to the strain inflicted.\nIf incapacitated due to the talent, the target could flee the scene in shame, collapse in a dejected heap, or throw themself at your character in fury, depending on your GM and the nature of your character's witty barbs.",
  },
  {
    id: 'drone_master',
    name: 'Drone Master',
    tier: 5,
    activation: 'Passive',
    ranked: 0,
    description:
      "Your character may control two drones or minion groups of drones no larger than your character's Willpower (either via the rules found on page 233 of Shadow of the Beanstalk Rulebook or via the Animal Companion talent). Your character resolves each drone's (or minion group's) turn individually, choosing the order in which they activate.",
  },
  {
    id: 'ghost_in_the_machine',
    name: 'Ghost in the Machine',
    tier: 5,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "As long as they have some sort of access point to the Network, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Computers (Hacking) check. If they succeed, they may select one drone, vechicle, or piece of equipment involved in the current encounter and dictate its actions until the start of your character's next turn.\nAlternatively, your character can select someone with cybernetic implants or who is wearing powered armor or an exosuit and manipulate it until the beginning of your character's next turn. This must be approved by your GM but could include shutting off cybereyes, directing the movements of cyberlimbs, or causing an exosuite to eject its occupant.\nYour character may spend {advantage} {advantage} {advantage} on the check to extend the effects for one additional round, or they may spend {triumph} to extend the effects for the remainder of the encounter.",
  },
  {
    id: 'master_plan',
    name: 'Master Plan',
    tier: 5,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      "Once per session, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Discipline check. If they succeed, they reveal that whatever terrible circumstances they currently find themselves in are all part of a brilliant plan that they established at an earlier point. They then choose one non-nemesis adversary in the encounter and reveal them to be a close friend or ally who has positioned themselves to help your character at this exact moment.\nThe details of which character turns out to be an ally depend on the type of encounter and your GM's approval. However, the ally could also have done their work beforehand, such as loading a squadron of drones with blank ammunition, shutting down power to a security system, or planting a tracer in an opponent's vehicle.",
  },
  {
    id: 'trick_of_the_light',
    name: 'Trick of the Light',
    tier: 5,
    activation: 'Active (Incidental)',
    ranked: 0,
    description:
      'When making a combat check with a laser or maser weapon, your character may use this talent to spend {advantage} to inflict one additional hit with this weapon, dealing base damage plus damage equal to the total number of {success} scored on the check. This hit may target the original target or another target within short range of the original target.',
  },
  {
    id: 'web_of_knowledge',
    name: 'Web of Knowledge',
    tier: 5,
    activation: 'Active (Action)',
    ranked: 0,
    description:
      'Once per session your character may make an Average ({difficulty} {difficulty}) Knowledge (Net) check during a Network encounter. If you succeed, your character knows the names, strengths, and other qualities of all ice (active or deactivated) on one system that you currently have access to, as well as all other characters (sysops and runners) that currently are accessing that system.\nYour character may spend {advantage} {advantage} {advantage} or {triumph} from this check (whether or not they succeeded) to add {success} to all Computer checks involving that system that they make for the remainder of the encounter.',
  },
]

console.log(transformToSql(talents))
