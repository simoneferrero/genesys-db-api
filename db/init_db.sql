/* NOTE: set database before running queries */

/* Users */
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` ENUM('gm', 'player') NULL DEFAULT 'player',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
);

/* Archetypes */
CREATE TABLE IF NOT EXISTS `archetypes` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
  `name` VARCHAR(100)
);
INSERT INTO `archetypes`
VALUES  ('biodroid', 'Biodroid'),
        ('clone', 'Clone'),
        ('cyborg', 'Cyborg'),
        ('g_mod', 'G-Mod'),
        ('loonie', 'Loonie'),
        ('natural', 'Natural');

/* Careers */
CREATE TABLE IF NOT EXISTS `careers` (
  `id` VARCHAR(100) NOT NULL PRIMARY KEY UNIQUE,
  `name` VARCHAR(100)
);
INSERT INTO `careers`
VALUES  ('academic', 'Academic'),
        ('bounty_hunter', 'Bounty Hunter'),
        ('con_artist', 'Con Artist'),
        ('courier', 'Courier'),
        ('investigator', 'Investigator'),
        ('ristie', 'Ristie'),
        ('roughneck', 'Roughneck'),
        ('runner', 'Runner'),
        ('soldier', 'Soldier'),
        ('tech', 'Tech');

/* Players' characters */
CREATE TABLE IF NOT EXISTS `players_characters` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `user_id` INT NOT NULL,
  `archetype_id` VARCHAR(100) NOT NULL,
  `career_id` VARCHAR(100) NOT NULL,
  `brawn` INT DEFAULT 0,
  `agility` INT DEFAULT 0,
  `intellect` INT DEFAULT 0,
  `cunning` INT DEFAULT 0,
  `willpower` INT DEFAULT 0,
  `presence` INT DEFAULT 0,
  `soak` INT DEFAULT 0,
  `wounds_total` INT DEFAULT 0,
  `wounds_current` INT DEFAULT 0,
  `strain_total` INT DEFAULT 0,
  `strain_current` INT DEFAULT 0,
  `defense_melee` INT DEFAULT 0,
  `defense_ranged` INT DEFAULT 0,
  `xp_total` INT DEFAULT 0,
  `xp_available` INT DEFAULT 0,
  `strength_type` VARCHAR(30) NOT NULL,
  `strength_description` VARCHAR(1000) NOT NULL,
  `flaw_type` VARCHAR(30) NOT NULL,
  `flaw_description` VARCHAR(1000) NOT NULL,
  `desire_type` VARCHAR(30) NOT NULL,
  `desire_description` VARCHAR(1000) NOT NULL,
  `fear_type` VARCHAR(30) NOT NULL,
  `fear_description` VARCHAR(1000) NOT NULL,
  `notes` TEXT NOT NULL,
  `armor` VARCHAR(1000) NOT NULL,
  `gear` VARCHAR(1000) NOT NULL,
  `money` int DEFAULT 0,
  CONSTRAINT `fk_players_characters_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_players_characters_archetype_id`
    FOREIGN KEY (`archetype_id`)
    REFERENCES `archetypes` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_players_characters_career_id`
    FOREIGN KEY (`career_id`)
    REFERENCES `careers` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* Skills */
CREATE TABLE `skills` (
  `id` VARCHAR(20) NOT NULL PRIMARY KEY UNIQUE,
  `name` TINYTEXT NOT NULL,
  `characteristic` ENUM('brawn', 'agility', 'intellect', 'willpower', 'cunning', 'presence') NOT NULL,
  `type` ENUM('general', 'combat', 'social', 'knowledge') NOT NULL,
  `description` TEXT(1000) NOT NULL
);

/* Players' characters' skills */
CREATE TABLE `players_characters_skills` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `player_character_id` INT NOT NULL,
  `skill_id` VARCHAR(20) NOT NULL,
  `career` TINYINT(1) NULL DEFAULT 0,
  `rank` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `player_character_id_idx` (`player_character_id` ASC),
  INDEX `skill_id_idx` (`skill_id` ASC),
  CONSTRAINT `fk_players_characters_skills_player_character_id`
    FOREIGN KEY (`player_character_id`)
    REFERENCES `players_characters` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_players_characters_skills_skill_id`
    FOREIGN KEY (`skill_id`)
    REFERENCES `skills` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* Factions */
CREATE TABLE `factions` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
  `name` TEXT(50) NOT NULL,
  `description` TEXT(1000) NOT NULL
);

/* Players' characters' favors */
CREATE TABLE `players_characters_favors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `player_character_id` INT NOT NULL,
  `type` ENUM('owed', 'given') NOT NULL,
  `size` ENUM('small', 'normal', 'big') NOT NULL,
  `faction_id` VARCHAR(50) NOT NULL,
  `description` TEXT(1000) NOT NULL,
  `status` ENUM('complete', 'incomplete') NULL DEFAULT 'incomplete',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `player_character_id_idx` (`player_character_id` ASC),
  CONSTRAINT `fk_favors_player_character_id`
    FOREIGN KEY (`player_character_id`)
    REFERENCES `players_characters` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  INDEX `faction_id_idx` (`faction_id` ASC),
  CONSTRAINT `fk_favors_faction_id`
    FOREIGN KEY (`faction_id`)
    REFERENCES `factions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* Weapons */
CREATE TABLE `weapons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `skill_id` VARCHAR(20) NOT NULL,
  `damage` INT NOT NULL,
  `crit` INT NOT NULL,
  `range` ENUM('engaged', 'short', 'medium', 'long', 'extreme') NOT NULL,
  `encumbrance` INT NOT NULL,
  `hard_points` INT NOT NULL,
  `price` INT NOT NULL,
  `restricted` TINYINT(1) NULL DEFAULT 0,
  `rarity` INT NOT NULL,
  `special` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX id_UNIQUE (`id` ASC),
  INDEX `skill_id_idx` (`skill_id` ASC),
  CONSTRAINT `fk_weapons_skill_id`
  	FOREIGN KEY (`skill_id`)
    REFERENCES `skills` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* Players' characters' weapons */
CREATE TABLE `players_characters_weapons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `player_character_id` INT NOT NULL,
  `weapon_id` INT NOT NULL,
  `mods` VARCHAR(100) NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `player_character_id_idx` (`player_character_id` ASC),
  INDEX `weapon_id_idx` (`weapon_id` ASC),
  CONSTRAINT `fk_players_characters_weapons_player_character_id`
    FOREIGN KEY (`player_character_id`)
    REFERENCES `players_characters` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_players_characters_weapons_weapon_id`
    FOREIGN KEY (`weapon_id`)
    REFERENCES `weapons` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* Critical injuries */
CREATE TABLE `critical_injuries` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
  `name` VARCHAR(50) NOT NULL,
  `severity` INT NOT NULL,
  `effects` VARCHAR(1000) NOT NULL,
  `persistent` TINYINT(1) NULL DEFAULT 0,
  `dice_value` VARCHAR(10) NOT NULL
);
INSERT INTO `critical_injuries`
        (`id`, `name`, `severity`, `effects`, `persistent`, `dice_value`)
VALUES  ('minor_nick', 'Minor Nick', 1, 'The target suffers 1 strain.', 0, '01-05'),
        ('slowed_down', 'Slowed Down', 1, 'The target can only act during the last allied Initiative slot on their next turn.', 0, '06-10'),
        ('sudden_jolt', 'Sudden Jolt', 1, 'The target drops whatever is in hand.', 0, '11-15'),
        ('distracted', 'Distracted', 1, 'The target cannot perform a free maneuver during their next turn.', 0, '16-20'),
        ('off_balance', 'Off-Balance', 1, 'Add 1 setback to the target\'s next skill check.', 0, '21-25'),
        ('discouraging_wound', 'Discouraging Wound', 1, 'Move 1 player pool Story Point to the Game Master pool (reverse if NPC).', 0, '26-30'),
        ('stunned', 'Stunned', 1, 'The target is staggered until the end of their next turn.', 0, '31-35'),
        ('stinger', 'Stinger', 1, 'Increase the difficulty of the target\'s next check by one.', 0, '36-40'),
        ('bowled_over', 'Bowled Over', 2, 'The target is knocked prone and suffers 1 strain.', 0, '41-45'),
        ('head_ringer', 'Head Ringer', 2, 'The target increases the difficulty of all Intellect and Cunning checks by one until this Critical Injury is healed.', 1, '46-50'),
        ('fearsome_wound', 'Fearsome Wound', 2, 'The target increases the difficulty of all Presence and Willpower checks by one until this Critical Injury is healed.', 1, '51-55'),
        ('agonizing_wound', 'Agonizing Wound', 2, 'The target increases the difficulty of all Brawn and Agility checks by one until this Critical Injury is healed.', 1, '56-60'),
        ('slightly_dazed', 'Slightly Dazed', 2, 'The target is disoriented until this Critical Injury is healed.', 1, '61-65'),
        ('scattered_senses', 'Scattered Senses', 2, 'The target removes all Boost dice from skill checks until this Critical Injury is healed.', 1, '66-70'),
        ('hamstrung', 'Hamstrung', 2, 'The target loses their free maneuver until this Critical Injury is healed.', 1, '71-75'),
        ('overpowered', 'Overpowered', 2, 'The target leaves themselves open, and the attacker may immediately attempt another attack against them as an incidental, using the exact same pool as the original attack.', 0, '76-80'),
        ('winded', 'Winded', 2, 'The target cannot voluntarily suffer strain to activate any abilities or gain additional maneuvers until this Critical Injury is healed.', 1, '81-85'),
        ('compromised', 'Compromised', 2, 'Increase difficulty of all skill checks by one until this Critical Injury is healed.', 1, '86-90'),
        ('at_the_brink', 'At the Brink', 3, 'The target suffers 2 strain each time they perform an action until this Critical Injury is healed.', 1, '91-95'),
        ('crippled', 'Crippled', 3, 'One of the target\'s limbs (selected by the GM) is impaired until this Critical Injury is healed. Increase difficulty of all checks that require use of that limb by one.', 1, '96-100'),
        ('maimed', 'Maimed', 3, 'One of the target\'s limbs (selected by the GM) is permanently lost. Unless the target has a cybernetic or prosthetic replacement, the target cannot perform actions that would require the use of that limb. All other actions gain 1 Setback die until this Critical Injury is healed.', 1, '101-105'),
        ('horrific_injury', 'Horrific Injury', 3, 'Roll 1d10 to determine which of the target\'s characteristics is affected: 1-3 for Brawn, 4-6 for Agility, 7 for Intellect, 8 for Cunning, 9 for Presence, 10 for Willpower. Until this Critical Injury is healed, treat that characteristic as one point lower.', 1, '106-110'),
        ('temporarily_disabled', 'Temporarily Disabled', 3, 'The target is immobilized until this Critical Injury is healed.', 1, '111-115'),
        ('blinded', 'Blinded', 3, 'The target can no longer see. Upgrade the difficulty of all checks twice, and upgrade the difficulty of Perception and Vigilance checks three times, until this Critical Injury is healed.', 1, '116-120'),
        ('knocked_senseless', 'Knocked Senseless', 3, 'The target is staggered until this Critical Injury is healed.', 1, '121-125'),
        ('gruesome_injury', 'Gruesome Injury', 4, 'Roll 1d10 to determine which of the target\'s characteristics is affected: 1-3 for Brawn, 4-6 for Agility, 7 for Intellect, 8 for Cunning, 9 for Presence, 10 for Willpower. That characteristic is permanently reduced by one, to a minimum of 1.', 1, '126-130'),
        ('bleeding_out', 'Bleeding Out', 4, 'Until this Critical Injury is healed, every round, the target suffers 1 wound and 1 strain at the beginning of their turn. For every 5 wounds they suffer beyond their wound threshold, they suffer one additional Critical Injury. Roll on the chart, suffering the injury (if they suffer this result a second time due to this, roll again).', 1, '131-140'),
        ('the_end_is_nigh', 'The End Is Nigh', 4, 'The target dies after the last Initiative slot during the next round unless this Critical Injury is healed.', 1, '141-150'),
        ('dead', 'Dead', 1000, 'Complete, obliterated death.', 1, '151-∞');

/* Players' characters' critical injuries */
CREATE TABLE `players_characters_critical_injuries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `player_character_id` INT NOT NULL,
  `critical_injury_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `player_character_id_idx` (`player_character_id` ASC),
  INDEX `critical_injury_id_idx` (`critical_injury_id` ASC),
  CONSTRAINT `fk_players_characters_critical_injuries_player_character_id`
    FOREIGN KEY (`player_character_id`)
    REFERENCES `players_characters` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_players_characters_critical_injuries_critical_injury_id`
    FOREIGN KEY (`critical_injury_id`)
    REFERENCES `critical_injuries` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* Talents */
CREATE TABLE `talents` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
  `name` VARCHAR(50) NOT NULL,
  `tier` INT NOT NULL,
  `activation` ENUM('Passive', 'Active (Incidental)', 'Active (Incidental, Out of Turn)', 'Active (Maneuver)', 'Active (Action)') NOT NULL,
  `ranked` TINYINT(1) NULL DEFAULT 0,
  `description` TEXT NOT NULL
);
INSERT INTO `talents`
        (`id`, `name`, `tier`, `activation`, `ranked`, `description`)
VALUES  ("bought_info", "Bought Info", 1, "Active (Action)", 0, "When making any knowledge skill check, your character can instead use this talent to spend an amount of currency equal to fifty times the difficulty of the check and automatically succeed on the knowledge check with one uncanceled {success} (instead of rolling). At your GM's discretion, your character may not be able to use Bought info if the information is particularly sensitive or difficult to find, or buying it doesn't make narrative sense."),
        ("clever_retort", "Clever Retort", 1, "Active (Incidental, Out of Turn)", 0, "Once per encounter, your character may use this talent to add automatic {threat} {threat} to another character's social skill check."),
        ("corporate_drone", "Corporate Drone", 1, "Passive", 0, "When you take this talent, your character gains Knowledge (Society) or Negotiation as a career skill. In addition, once per session, your character may collect a small favor from any other member of a single corporation (chosen when you take this talent), even if they don't owe your character a favor."),
        ("custom_rig", "Custom Rig", 1, "Passive", 1, "When your character selects this talent they choose one computer (such as a rig, PAD, or spinal modem) that they own. The amount of ice or icebreakers (your character's choice) that they can have on that computer is increased by 1 per rank of Custom Rig. (This may be a mix of ice and icebreakers, as long as the combined total increase does not exceed your character's ranks in Custom Rig). If your character loses their affected computer, they may choose a new computer to be affected by this talent."),
        ("custom_code", "Custom Code", 1, "Passive", 0, "When your character selects this talent they choose one icebreaker or piece of ice that they own. If they choose an icebreaker, whenever they use that icebreaker to override ice, they add {advantage} to the results. If they choose a piece of ice, whenever someone else attempts to override it, they add {threat} to the results."),
        ("customer_service_experience", "Customer Service Experience", 1, "Active (Incidental)", 1, "After your character makes a Charm check, they may suffer 1 strain to cancel {threat} equal to your character's ranks in Customer Service Experience."),
        ("deep_pockets", "Deep Pockets", 1, "Active (Maneuver)", 0, "Once per session, your character may use this talent to produce a small but narratively useful item from their pockets, backpack, or similar receptacle (it turns out the item had been there the whole time).
Your GM has final say as to what items can be produced with Deep Pockets, but generally the item should cost less than 100 credits and have an encumbrance of 0 or 1."),
        ("disenfrancisto", "Disenfrancisto", 1, "Passive", 0, "When you take this talent, your character gains Streetwise or Survival (your choice) as a career skill. In addition, once per session, your character may collect a small favor from any other disenfrancisto, even if they do not owe your character a favor."),
        ("former_professor", "Former Professor", 1, "Passive", 0, "When you take this talent, your character gains one Knowledge skill (of your choice) as a career skill. In addition, once per session, your character may collect a small favor from a member of an institute of higher learning (chosen when you take this talent), even if they do not owe your character a favor."),
        ("hand_on_the_throttle", "Hand on the Throttle", 1, "Active (Incidental)", 0, "Once per round while driving or piloting a vehicle, your character may use this talent to increase or decrease its speed by 1, to a minimum of 0 or to a maximum of the vehicle's max speed."),
        ("irijutsu_training", "Irijutsu Training", 1, "Passive", 0, "The first time during an envounter that your character draws a Melee weapon, increase the weapon's damage by 2 for the remainder of the turn."),
        ("knockout_punch", "Knockout Punch", 1, "Passive", 0, "Your character adds the Stun quality to their Brawl combat checks, with a rating equal to two plus your character's ranks in Coordination (this does not stack with other instances of the Stun quality)."),
        ("net_search", "Net Search", 1, "Active (Maneuver)", 0, "If your character has access to the Network, they may use this talent to upgrade the ability of the next Knowledge check they make during their turn twice and the difficulty of that check once. Your GM must spend a {despair} to have your character learn some seemingly relevant and believable information that turns out to be completely (and possibly maliciously) false."),
        ("resourceful_mechanic", "Resourceful Mechanic", 1, "Passive", 1, "When your character makes a Mechanics check to repair system strain or hull trauma on a vehicle, they repair one additional system strain or hull trauma per rank of Resourceful Mechanic."),
        ("street_fighter", "Street Fighter", 1, "Active (Incidental)", 0, "When your character disorients or knocks their target prone while making a Brawl combat check, they may use this talent to cause the target to suffer wounds wqual to your character's ranks in Skullduggery."),
        ("tri_maf_contact", "Tri-Maf Contact", 1, "Passive", 0, "When you take this talent, your character gains Melee or Skullduggery (your choice) as a career skill. In addition, once per session, your character may collect a small favor from a member of a single orgcrime group (chosen when you take this talent), even if they do not owe your character a favor."),
        ("union_member", "Union Member", 1, "Passive", 0, "When you take this talent, your character gains Athletics, Mechanics, or Operating (your choice) as a career skill. In addition, once per session, your character may collect a small favor from a member of Humanity Labor or Human First (chosen when you take this talent), even if they do not owe your character a favor."),
        ("worlds_war_vet", "Worlds War Vet", 1, "Passive", 0, "When you take this talent, your character gains Ranged (Heavy) or Resilience (your choice) as a career skill. In addition, once per session, your character may collect a small favor from a current or former member of a single country's military (chosen when you take this talent), even if they do not owe your character a favor."),
        ("years_on_the_force", "Years on the Force", 1, "Passive", 0, "When you take this talent, your character gains Perception or Ranged (Light) (your choice) as a career skill. In addition, once per session, your character may collect a small favor from a current or former member of the NAPD or New Angeles city government (chosen when you take this talent), even if they do not owe your character a favor."),
        ("defensive_sysops", "Defensive Sysops", 1, "Passive", 0, "When attempting to defend a computer sustem against intrusion (or when someone attempts to hack a computer owned or programmed by your character) your character adds {setback} {setback} to their opponent's checks. If your character has access to the computer system when the intrusion takes place, they are automatically aware of the intrusion."),
        ("desperate_recovery", "Desperate Recovery", 1, "Passive", 0, "Before your character heals strain at the end of an encounter, if their strain is more than half of their strain treshold, they heal two additional strain."),
        ("duelist", "Duelist", 1, "Passive", 0, "Your character adds {boost} to their melee combat checks while engaged with a single opponent. Your character adds {setback} to their melee combat checks while engaged with three or more opponents."),
        ("durable", "Durable", 1, "Passive", 1, "Your character reduces any Critical Injury result they suffer by 10 per rank of Durable, to a minimum of 1."),
        ("forager", "Forager", 1, "Passive", 0, "Your character removes up to {setback} {setback} from any skill checks they make to find food, water, or shelter. Checks to forage or search the area that your character makes take half the time they would normally."),
        ("grit", "Grit", 1, "Passive", 1, "Each rank of Grit increases your Character's strain threshold by one."),
        ("hamstring_shot", "Hamstring Shot", 1, "Active (Action)", 0, "Once per round, your character may use this talent to performa a ranged combat check against one non-vehicle target within range of the weapon used. If the check is successful, halve the damage inflicted by the attack (before reducing damage by the target's soak). The target is immobilized until the end of its next turn."),
        ("jump_up", "Jump Up", 1, "Active (Incidental)", 0, "Once per round during your character's turn, your character may use this talent to stand from a prone or seated position as an incidental"),
        ("knack_for_it", "Knack for It", 1, "Passive", 1, "When you purchase this talent for your character, select one skill. Your character removes {setback} {setback} from any thecks they make using this skill.
Each additional time you purchase this talent for your character, select two additional skills. Your character also removes {setback} {setback} from any checks they make using these skills. You cannot select combat skills when choosing skills for this talent."),
        ("know_somebody", "Know Somebody", 1, "Active (Incidental)", 1, "Once per session, when attempting to purchase a legally available item, your character may use this talent to reduce its rarity by one per rank of Know Somebody."),
        ("lets_ride", "Let's Ride", 1, "Active (Incidental)", 0, "Once per round during your character's turn, your character can use this talent to mount or dismount from a vehicle or animal, or move from one position in a vehicle to another (such as from the cockpit to a gun turrent) as an incidental. In addition, if your character suffers a short-range fall (see page 112 of the Core Rulebook) from a vehicle or animal, they suffer no damage and land on their feet."),
        ("one_with_nature", "One with Nature", 1, "Active (Incidental)", 0, "When in the wilderness, your character may make a simple (-) Survival check, instead of Discipline or cool, to recover strain at the end of an encounter (see page 117 of the Core Rulebook)."),
        ("parry", "Parry", 1, "Active (Incidental, Out of Turn)", 1, "When your character suffers a hit from a melee combat check, after damage is calculated but before soak is applied (so immediately after Step 3 of Perform a Combat check, page 102 of the Core Rulebook), your character may suffer 3 strain to use this talent to reduce the damage of the hit by two plus their ranks in Parry. This talent can only be used once per hit, and your character needs to be wielding a Melee weapon."),
        ("proper_upbringing", "Proper Upbringing", 1, "Active (Incidental)", 1, "When your character makes a social skill check in polite company (as determined by your GM), they may suffer a number of strain to use this talent to add an equal number of {advantage} to the check. The number may not exceed your character's ranks in Proper Upbringing."),
        ("quick_draw", "Quick Draw", 1, "Active (Incidental)", 0, "Once per round on your character's turn, they may use this talent to draw or holster an easily accessible weapon or item as an incidental. Quick Draw also reduces a weapon's Prepare raitng by one, to a minimum of one."),
        ("quick_strike", "Quick Strike", 1, "Passive", 1, "Your character adds {boost} for each rank of Quick strike to any combat checks they make against any target that have not yet taken their turn in the current encounter."),
        ("rapid_reaction", "Rapid Reaction", 1, "Active (Incidental, Out of Turn)", 1, "Your character may suffer a number of strain to use this talent to add an equal number of {success} to a Vigilance or Cool check they make to determine Initiative order. The number may not exceed your character's ranks in Rapid Reaction."),
        ("second_wind", "Second Wind", 1, "Active (Incidental)", 1, "Once per encounter, your character may use this talent to heal an amount of strain equal to their ranks in Second Wind."),
        ("surgeon", "Surgeon", 1, "Passive", 1, "When your character makes a Medicine check to heal wounds, the target heals one additional wound per rank of Surgeon."),
        ("swift", "Swift", 1, "Passive", 0, "Your character does not suffer the penalties for moving through difficult terrain (they move through difficult terrain at normal speed without spending additional maneuvers)."),
        ("toughened", "Toughened", 1, "Passive", 1, "Each rank of Toughened increases your character's wound threshold by two."),
        ("unremarkable", "Unremarkable", 1, "Passive", 0, "Other characters add {failure} to any checks made to find or identify your character in a crowd."),
        ("bad_cop", "Bad Cop", 2, "Active (Incidental)", 1, "Your character may spend {advantage} {advantage} from a Coercion or Deception check to use this talent to upgrade the ability of a single ally's subsequent social skill check a number of times wqual to your character's ranks in Bad Cop. The check must target the same character as your character's initial check, and it must take place during the same encounter.
Only one character may affect a check with this talent."),
        ("big_guns", "Big Guns", 2, "Passive", 0, "Your character's encumbrance threshold is 10 plus their Brawn, instead of 5 plus their Brawn. Your character reduces the Cumbersome rating of any weapon they carry by 1, to a minimum of 3."),
        ("codeslinger", "Codeslinger", 2, "Passive", 0, "When your character performs the activate program maneuver (page 132 of Shadow of the Beanstalk Rulebook) in a hacking encounter, they can choose not to deactivate one other active icebreaker. They may have two icebreakers active at once."),
        ("combat_medicine", "Combat Medicine", 2, "Active (Incidental)", 1, "Before making a Medicine check, your character may use this talent to add {success} equal to their ranks in Combat Medicine to the results. After the check is resolved, the target suffers 2 strain for each rank your character has in Combat Medicine."),
        ("determined_driver", "Determined Driver", 2, "Active (Incidental)", 0, "You may spend a Story Point to use this talent to have your character heal system strain on a vehicle they are currently driving, piloting or operating equal to their ranks in Driving, Piloting or Operating (choose the skill used to direct the vehicle)."),
        ("good_cop", "Good Cop", 2, "Active (Incidental)", 1, "Your character may spend {advantage} {advantage} from a Charm or Negotiation check to use this talent to upgrade the ability of a single ally's subsequent social skill check a number of times equal to your character's ranks in Good Cop. The check must target the same character as your character's initial check, and it must take place during the same encounter.
Only one character may affect a check with this talent."),
        ("haughty_demeanor", "Haughty Demeanor", 2, "Passive", 0, "Other characters add {threat} to social skill checks targeting your character."),
        ("nethunter", "Nethunter", 2, "Passive", 0, "When your character successfully traces another character during a Network encounter, your character gains one additional trace."),
        ("parkour", "Parkour!", 2, "Active (Maneuver)", 0, "Once per round, your character may suffer 1 strain to use this talent and move to any location within short range.
This includes locations that are vertically distant or have no easy access route, but there must be an object to move across or path to move along. Your GM may rule some locations cnanot be reached (such as ones behind locked doors or walls)."),
        ("probing_question", "Probing Question", 2, "Passive", 0, "If your character knows an opponent's Flaw or Fear motivation, when your character inflicts strain on that opponent using a social skill, the opponent suffers 3 additional strain."),
        ("quick_fix", "Quick Fix", 2, "Active (Maneuver)", 0, "You may spend a Story Point to use this talent to have your character temporarily repair one damaged item they are engaged with. For a number of rounds equal to your character's ranks in Mechanics, the item may be used without penalty (see page 89 of the Core Rulebook), even if it is unusable. When the effect ends, the item is damaged one additional step; if it was already suffering from major damage, it is destroyed and cannot be repaired."),
        ("speciel_use_permit", "Special Use Permit", 2, "Passive", 0, "Your character does not treat any Ranged (Heavy) weapons as restricted (R).
This also means your character can carry a Ranged (Heavy) weapon that normally would be restricted in public without being arrested. However, they can still be arrested for using such a weapon in an unlawful manner."),
        ("tactical_focus", "Tactical Focus", 2, "Passive", 0, "When performing a combat check with a Ranged (Heavy) weapon, if your character did not perform a maneuver to ready or stow a weapon or item during this turn, they add {advantage} to the results."),
        ("two_handed_stance", "Two-Handed Stance", 2, "Passive", 0, "When performing a combat check with a Ranged (Light) weapon, if your character has nothing in the other hand, they add {advantage} to the results."),
        ("undercity_contracts", "Undercity Contracts", 2, "Active (Incidental)", 0, "Once per session, you may spend one Story Point to use this talent to let your character learn if a character of your choice is in New Angeles, and if so, what district.
At your GM's discretion, the information may take up to an hour to come back to your character."),
        ("coordinated_assault", "Coordinated Assault", 2, "Active (Maneuver)", 1, "Once per turn, your character may use this talent to have a number of allies engaged with your character equal to your ranks in Leadership add {advantage} to all combat checks they make until the end of your character's next turn. The range of this talent increases by one band per rank of Coordinated Assault beyond the first."),
        ("counteroffer", "Counteroffer", 2, "Active (Action)", 0, "Once per session, your character may use this talent to choose one non-nemesis adversary within medium range and make an opposed Negotiation versus Discipline check. If successful, the target becomes staggered until the end of their next turn.
At your GM's discretion, you may spend {triumph} on this check to have the adversary become an ally until the end of the encounter. However, the duration of this may be shortened or exgtended depending on whether your GM feels your offer is appealing to the adversary and whether your character follows through on their offer!"),
        ("daring_aviator", "Daring Aviator", 2, "Active (Incidental)", 1, "Before your character makes a Driving or Piloting check, they may add a number of {threat} to the results to use this talent to ad ann equal number of {success}. The number may not exceed your character's ranks in Daring Aviator."),
        ("defensive_stance", "Defensive Stance", 2, "Active (Maneuver)", 1, "Once per round, your character may suffer a number of strain no greater than their ranks in Defensive Stance to use this talent. Then, until the end of your character's next turn, upgrade the difficulty of all melee combat checks targeting your character a number of times equal to the strain suffered."),
        ("defensive_sysops_improved", "Defensive Sysops (Improved)", 2, "Active (Incidental)", 0, "Your character must have purchased the Defensive Susops talent to benefit from this talent. Before adding {setback} {setback} from Defensive Sysops to a check, use this talent to add {failure} {threat} to the results of the check instead."),
        ("dual_wielder", "Dual Wielder", 2, "Active (Maneuver)", 0, "Once per round, your character may use this talent to decrease the difficulty of the next combined combat check (see Two-Weapon Combat on page 108 of the Core Rulebook) they make during the same turn by one."),
        ("heightened_awareness", "Heightened Awareness", 2, "Passive", 0, "Allies within short range of your character add {boost} to their Perception and Vigilance checks. Allies engaged with your character add {boost} {boost} instead."),
        ("inspiring_rhetoric", "Inspiring Rhetoric", 2, "Active (Action)", 0, "Your character may use this talent to make an Average ({difficulty} {difficulty}) Leadership check. For each {success} the check generates, one ally within short range heals 1 strain. For each {advantage}, one ally benefiting from Inspiring Rhetoric heals 1 additional strain."),
        ("inventor", "Inspiring Rhetoric", 2, "Active (Incidental)", 1, "When your character makes a check to construct new items or modify existing ones, use this talent to add a number of {boost} to the check equal to the ranks of Inventor. In addition, your character may attempt to reconstruct devices that they have heard described but have not seen and do not have any kinds of plans or schematics for."),
        ("lucky_strike", "Lucky Strike", 2, "Active (Incidental)", 0, "When your character purchases this talent, choose one characteristic. After your character makes a successful combat check, you may spend one Story Point to use this talent to add damage equal to your character's ranks in that characteristic to one hit of the combat check."),
        ("scathing_tirade", "Scathing Tirade", 2, "Active (Action)", 0, "Your character may use this talent to make an Average ({difficulty} {difficulty}) Coercion check. For each {success} the check generates, one enemy within short range suffers 1 strain. For each {advantage}, one enemy affected by Scathing Tirade suffers 1 additional strain."),
        ("side_step", "Side Step", 2, "Active (Maneuver)", 1, "Once per round, your character may suffer a number of strain no greater than their ranks in Side Step to use this talent. Until the end of your character's next turn, upgrade the difficulty of all ranged combat checks targeting your character a number of times equal to the strain suffered."),
        ("applied_research", "Applied Research", 3, "Active (Incidental)", 1, "Your character may use this talent before making a check to use any knowledge skill and Intellect instead of the skill and characteristic the check would normally require. Your character may use this talent a number of times per session equal to their ranks in Applied Research.
When your character uses this talent, you should explain how their mastery of knowledge lets them accomplish this task. In addition, your GM may rule that a particular knowledge skill makes the most sense in a given situation, and require your character to use that specific knowledge skill."),
        ("bad_habit", "Bad Habit", 3, "Active (Maneuver)", 0, "Your character may use this talent to become disoriented for the remainder of the encounter. At the beginning of each of your character's turns, if they are still disoriented due to this talent, they heal 2 strain."),
        ("body_guard", "Body Guard", 3, "Active (Maneuver)", 1, "Once per round, your character may suffer a number of strain no greater than their ranks in Body Guard to use this talent. Choose one ally engaged with your character, until the end of your character's next turn, upgrade the difficulty of all combat checks targeting that ally a number of times equal to the strain suffered."),
        ("dumb_luck", "Dumb Luck", 3, "Active (Incidental)", 0, "Once per session, you may spend a Story Point to use this talent after your character suffers a Critical Injury but before the result is rolled. Their opponent must roll two results, and you select which applies to your character."),
        ("hard_boiled", "Hard-Boiled", 3, "Active (Incidental)", 0, "When your character makes a check to recover from strain at the end of an encounter (as described on page 117 of the Core Rulebook), your character may make a Simple (-) Resilience check instead of Discipline or Cool. If your character does so, they heal 1 strain per {success} and 1 wound per {advantage}."),
        ("hold_it_steady", "Hold It Steady", 3, "Active (Incidental)", 0, "Before performing a combat check using a weapon with the Auto-fire quality, your character may use this talent to use the Auto-fire quality without increasing the difficulty of the combat check. If they do so, each time they trigger an additional hit during the attack, they fuffer 2 strain."),
        ("laugh_it_off", "Laugh It Off", 3, "Active (Incidental, Out of Turn)", 0, "When your character is targeted by a social skill check they may use this talent to spend {threat} {threat} {threat} or {despair} to reduce any strain the check inflicts by a number equal to their ranks in Charm. If they do so, the character who targeted them suffers an amount of strain equal to the amount of strain reduced."),
        ("martial_weapons_master", "Martial Weapons Master", 3, "Active (Action)", 0, "While armed with a Melee weapon, your character may use this talent to make an Average ({difficulty} {difficulty}) Melee check. If successful, your character may force one engaged target to either drop one weapon they are holding or move up to one range band in a direction of your choosing.
If your character forces a named rival or nemesis into dangerous terrain (or off a ledge or cliff) using this talent, your GM can spend a Story Point to allow them to catch themselves at the edge and fall prone instead."),
        ("net_warrior", "Martial Weapons Master", 3, "Active (Action)", 0, "While accessing a system using a brain-machine interface (BMI), your character may use this talent to make an opposed Computers (Hacking) versus Computers (Sysops) check targeting one other character on the system that they are aware of. The target suffers 1 strain per {success}, and if they are using a BMI, they also suffer 1 wound per {success}."),
        ("nimble", "Nimble", 3, "Active (Incidental)", 0, "At the start of your character's turn, you may spend one Story Point to use this talent to allow your character to perform a move maneuver as an incidental. (This does not count against the limit of two maneuvers per turn.) If you use this talent, your character can only perform one additional move maneuver during this turn."),
        ("snare", "Snare", 3, "Active (Action)", 0, "Once per session, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Computers (Sysops) check. If they succeed, once before the end of the encounter, you may spend a Story Point to force one character in the encounter to make a Daunting ({difficulty} {difficulty} {difficulty} {difficulty}) Vigilance check as an incidental. If they fail, they are staggered until the end of their next turn, plus one additional turn per {threat} {threat}."),
        ("suppressing_fire", "Suppressing Fire", 3, "Active (Maneuver)", 1, "If your character does not make a combat check during their turn, they use this talent to target one character (or minion group) within long range. That character must upgrade the difficulty of any ranged combat chekcs they make once until the end of your character's next turn. Your character may choose to affect one additional character for each additional rank of Suppressing Fire.
Your character must be holding a ranged weapon to use this talent. Your GM can rule that your character can't use this talent if they have no line of fire or range to the target."),
        ("takedown", "Takedown", 3, "Active (Action)", 0, "Your character may use this talent to make an opposed Brawl versus Resilience check targeting one engaged opponent. If the check succeeds, the target is knocked prone and is immobilized until the end of your character's next turn. If the target is a minion or rival, your character can spend {triumph} to incapacitate (but not kill) the target instead."),
        ("undercity_contacts_improved", "Undercity Contacts (Improved)", 3, "Active (Incidental)", 0, "Your character must have purchased the Undercity Contacts talent to benefit from this talent. When you use Undercity Contacts, you may choose to spend two Story Points instead of one. If you do, your character learns the target's specific location."),
        ("you_owe_me_one", "You Owe Me One", 3, "Active (Incidental)", 0, "Once per session, you may spend two Story Points to use this talent to have one NPS in the current encounter owe your character a favor. If the favor is not resolved by the end of the encounter, it is forgotten.
It's up to you and your GM to determine exactly why the NPC owes your character a favor."),
        ("animal_companion", "Animal Companion", 3, "Passive", 1, "Your character creates a bond with a single animal approved by your GM. This animal must be silhouette 0 (no largetr than a mid-sized dog). The bond persists as long as your character chooses, although at your GM's discretion, the bond may also be broken due to abusive treatment or other extenuating circumstances.
As long as the bond persists, the animal follows your character, and you dictate the animal's overall behavior (although, since the animal is only bonded with the character, not dominated, it may still perform inconvenient actions such as scratching furniture, consuming rations, and marking territory). Once per round, in structured encounters, your character may spend one maneuver to direct their animal in performing one action and one maneuver during your characters' turn. The animal must be within hearing and visual range of your character (generally medium range) to do this. Otherwise, the animal does not contribute to the encounter. The specifics of its behavior are up to you and your GM.
For every additional rank of Animal Companion your character has, increase the allowed silhouette of the companion by one (this may mean your character gets a new companion, or their companion grows in size).
This talent can also change in flavor depending on the nature of your game setting. In a futuristing setting it may make more sense for the \"animal\" to be a robot or drone, for example."),
        ("barrel_roll", "Barrel Roll", 3, "Active (Incidental, Out of Turn)", 0, "Your character can only use this talent while piloting a stargighter or airplane of Silhouette 3 or less. When your vehicle suffers a hit from a ranged combat check, after damage is calculated but before armor is applied, your character may have their vehicle suffer 3 system strain to use this talent. Then, reduce the damage suffered by a number equal to their ranks in Piloting."),
        ("distinctive_style", "Distinctive Style", 3, "Active (Incidental)", 0, "When making a Computers check to hack a system or break into a secured network, before rolling, your character may use this talent to add {success} {success} {threat} {threat} to the results.
If the check generates {threat} {threat}, your GM should spend it on the I Know You! option in Table I.2-22 on page 234 of the Core Rulebook."),
        ("dodge", "Dodge", 3, "Active (Incidental, Out of Turn)", 1, "When your character is targeted by a combat check (ranged or melee), they may suffer a number of strain no greater than their ranks in Dodge to use this talent. Then, upgrade the difficulty of the combat check targeting your character a number of times equal to the strain suffered."),
        ("eagle_eyes", "Eagle Eyes", 3, "Active (Incidental)", 0, "Once per encounter before making a ranged combat check, you may use this talent to increase your weapon's range by one range band (to a maximum of extreme range). This lasts for the duration of the combat check."),
        ("field_commander", "Field Commander", 3, "Active (Action)", 0, "Your character may use this talent to make an Average ({difficulty} {difficulty}) Leadership check. If successful, a number of allies equal to your character's Presence may immediately suffer 1 strain to perform one Maneuver (out of turn). If there are any questions as to which allies take their maneuvers first, your character is the final arbiter."),
        ("forgot_to_count", "Forgot to Count?", 3, "Active (Incidental, Out of Turn)", 0, "When an opponent makes a ranged combat check, you can spend {threat} {threat} from that check to use this talent to cause their weapon to run out of ammo (see page 104 of the Core Rulebook), as long as the weapon can normally run out of ammonition."),
("full_throttle", "Full Throttle", 3, "Active (Action)", 0, "While driving or flying, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Piloting or Driving check. If successful, the top speed of the vehicle increases by one (to a maximum of 4) for a number of rounds equal to your character's Cunning."),
        ("grenadier", "Grenadier", 3, "Active (Incidental)", 1, "When your character makes a ranged combat check with a weapon that has the Blast item quality, you may spend one Story Point to use this talent to trigger the weapon's Blast quality, instead of spending {advantage} (even if the attack misses). In addition, your character treats grenades as having a range of medium."),
        ("inspiring_rhetoric_improved", "Inspiring Rhetoric (Improved)", 3, "Passive", 0, "Your character must have purchased the Inspiring Rhetoric talent to benefit from this talent. Allies affected by your character's Inspiring Rhetoric add {boost} to all skill checks they make for a number of rounds equal to your character's ranks in Leadership."),
        ("painkiller_specialization", "Painkiller Specialization", 3, "Passive", 1, "When your character uses slap patches, the target heals one additional wound per rank of Painkiller Specialization. The sixth painkiller and beyond each day still has no effect."),
        ("scathing_tirade_improved", "Scathing Tirade (Improved)", 3, "Passive", 0, "Your character must have purchased the Scathing Tirade talent to benefit from this talent. Enemies affected by your character's Scathing Tirade add {setback} to all skill checks they make for a number of rounds equal to your character's ranks in Coercion."),
        ("heroic_will", "Heroic Will", 3, "Active (Incidental, Out of Turn)", 0, "When you purchase this talent for your character, choose two characteristics. You may spend a Story point to use this talent to have your character ignore the effects of all Critical Injuries on any skill checks using those two characteristics until the end of the current encounter. (Your character still suffers the Critical Injuries, they just ignore the effects. See page 114 of the Core Rulebook.)"),
        ("natural", "Natural", 3, "Active (Incidental)", 0, "When your character purchases this talent, choose two skills. Once per session, your character may use this talent to reroll one skill check that uses one of those two skills."),
        ("parry_improved", "Parry (Improved)", 3, "Active (Incidental, Out of Turn)", 0, "Your character must have purchased the Parry talent to benefit from this talent. When your character suffers a hit from a melee combat check and uses Parry to reduce the damage from that hit, after the attack is resolved, you may spend {despair} or {threat} {threat} {threat} from the attacker's check to use this talent. Then, your character automatically hits the attacker once with a Brawl or Melee weapon your character is wielding. The hit deals the weapon's base damage, plus any damage from applicable talents or abilities. Your character can't use this talent if the original attack incapacitates them."),
        ("burn_through", "Burn Through", 4, "Active (Incidental)", 0, "After making a successful break ice action, your character may suffer 3 strain to use this talent. If they do, they may perform a second override ice action on the same system as na incidental."),
        ("elementary", "Elementary", 4, "Active (Action)", 0, "Once per session, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Perception check while present at a crime scene. If they succeed, they identify all prominent physical characteristics of one person who was at the crime scene when the crime was committed (as long as the crime was committed in the past 48 hours). This could include a person's height, weight, body type, clothing, and if they are human or not. Your character may identify all the physical characteristics of one additional person present at the scene per additional {success}."),
        ("offensive_driving", "Offensive Driving", 4, "Active (Action)", 0, "While driving or piloting a vehicle, your character may use this talent to select one other vehicle within medium range and make an opposed Driving or Piloting versus Driving or Piloting check (depending on whether your character and their opponent pilot are using Driving or Piloting to control their vehicle) targeting the other vehicle's driver or pilot. If successful, roll twice on Table III.2-19: Critical Hit Result, on page 230 of the Core Rulebook. Choose one Critical Hit result to apply to your character's vehicle, and the other to apply to the other vehicle. You may spend {triumph} to add +20 to one Critical Hit result. Your GM may spend {despair} to add +20 to both Critical Hit results."),
        ("parkour_improved", "Parkour! (Improved)", 4, "Active (Incidental)", 0, "Your character must have purchased the Parkour! talent to benefit from this talent. Once per round, when using the Parkour! talent, your character may suffer 4 strain instead of 1 strain to move to any location within medium range instead of within short range. All other restrictions of Parkour! apply to this movement."),
        ("quick_witted", "Quick Witted", 4, "Active (Incidental, Out of Turn)", 0, "Once per encounter, after another character makes a social skill check, your character may use this talent to make an Average ({difficulty} {difficulty}) Vigilance check. If successful, you may add a number of {success} or {advantage} (your choice) equal to your character's ranks in Charm to the other character's check. If your character fails, your character suffers 3 strain."),
        ("urban_combatant", "Urban Combatant", 4, "Active (Incidental, Out of Turn)", 0, "When your character is targeted by a combat check while in an urban environment, you may spend one Story Point to use this talent before the dice pool is rolled. If you do so, your character's opponent removes all {setback} added to the check, and instead adds an equal number of {failure} to the results."),
        ("you_owe_me_one_improved", "You Owe Me One (Improved)", 4, "Active (Incidental)", 0, "Your character must have purchased the You Owe Me One talent to benefit from this talent. Once per session, you may spend two Story Points to use You Owe Me One to have one NPC in the current encounter owe your character a big favor instead of a favor. If the big favor is not resolved by the end of the encounter, it is forgotten."),
        ("cant_we_talk_about_this", "Can't We Talk About This?", 4, "Active (Action)", 0, "Your character can use this talent to make an opposed Charm or Deception versus Discipline check targeting a single non-nemesys adversary within medium range. If the check succeeds, the target cannot attack your character (or perform hostile actions against your character) until the end of their next turn. You may spend {advantage} {advantage} to increase the length of the effect by one additional turn, and spend {triumph} to extend the benefits to all of their identified allies within short range.
The effect ends immediately if your character or a known ally attacks the target. In addition, your GM may rule that some targets are immune to this ability. An automated sentry turret, for example, has no interest in resolving a conflict through talking, nor would someone consumed by rage and the desire for revenge against your character."),
        ("deadeye", "Deadeye", 4, "Active (Incidental)", 0, "After your character inflicts a Critical Injury with a ranged weapon and rolls the result, your character may suffer 2 strain to use this talent. Then, you may select any Critical Injury of the same severity to apply to the target instead."),
        ("defensive", "Defensive", 4, "Passive", 1, "Each rank of Defensive increases your character's melee defense and ranged defense by one."),
        ("defensive_driving", "Defensive Driving", 4, "Passive", 1, "Increase the defense of any vehicle your character pilots by one per rank of Defensive Driving."),
        ("enduring", "Enduring", 4, "Passive", 1, "Each rank of Enduring increases your character's soak value by one."),
        ("field_commander_improved", "Field Commander (Improved)", 4, "Passive", 0, "Your character must have purchased the Field Commander talent to benefit from this talent. When your character uses the Field Commander talent, your character affects a number of allies equal to twice the character's Presence. In addition, you may spend {triumph} to allow one ally to suffer 1 strain to perform an action, instead of a maneuver."),
        ("how_convenient", "How Convenient!", 4, "Active (Action)", 0, "Once per session, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Mechanics check. If successful, one device involved in the current encounter (subject to your GM's approval) spontaneously fails. This can be because of your character's actions, or it can simply be incredibly convenient timing!"),
        ("inspiring_rhetoric_supreme", "Inspiring Rhetoric (Supreme)", 4, "Active (Incidental)", 0, "Your character must have purchased the Inspiring Rhetoric talent to benefit from this talent. Your character may choose to suffer 1 strain to use the Inspiring Rhetoric talent as a maneuver, instead of as an action."),
        ("overcharge", "Overcharge", 4, "Active (Action)", 0, "Once per encounter, your character may make a Hard ({difficulty} {difficulty} {difficulty}) Mechanics check and choose one of their cybernetic implants that grants them one of the following: +1 to a characteristic ratink, +1 rank to a skill, +1 rank of a ranked talent. If your character succeeds, until the end of the encounter the chosen cybernetic instead provides +2 of the affected characteristic rating (to a maximum of 7), skill (to a maximum of 5), or ranked talent.
Your GM may spend {despair} or {threat} {threat} {threat} from the check to have the overcharged cybernetic short out at the end of the encounter; it provides no benefit until your character spends several hours making an Average ({difficulty} {difficulty}) Mechanics check to repair it."),
        ("scathing_tirade_supreme", "Scathing Tirade (Supreme)", 4, "Active (Incidental)", 0, "Your character must have purchased the Scathing Tirade talent to benefit from this talent. Your character may choose to suffer 1 strain to use the Scathing Tirade talent as a maneuver, instead of as an action."),
        ("dedication", "Dedication", 5, "Passive", 1, "Each rank of Dedication increases one of your character's characteristics by one. This talent cannot increase a characteristic above 5. You cannot increase the same characteristic with Dedication twice."),
        ("indomitable", "Indomitable", 5, "Active (Incidental, Out of Turn)", 0, "Once per encounter, when your character would be incapacitated due to exceeding their wound or strain threshold, you may spend a Story Point to use this talent. Then, your character is not incapacitated until the end of their next turn. If your character reduces their strain or wounds to below their threshold before the end of their next turn, they are not incapacitated."),
        ("master", "Master", 5, "Active (Incidental)", 0, "When you purchase this talent for your character, choose one skill. Once per round, your character may suffer 2 strain to use this talent to reduce the difficulty of the next check they make using that skill by two, to a minimum of Easy ({difficulty})."),
        ("overcharge_improved", "Overcharge (Improved)", 5, "Passive", 0, "Your character must have purchased the Overcharge talent to benefit from this talent. When using the Overcharge talent, your character may spend {advantage} {advantage} or {triumph} from the Mechanics check to immediately take one additional action. This talent can only be used once per check."),
        ("ruinous_repartee", "Ruinous Repartee", 5, "Active (Action)", 0, "Once per encounter, your character may use this talent to make an opposed Charm or Coercion versus Discipline check targeting one character within medium range (or within earshot). If successful, the target suffers strain equal to twice your character's Presence, plus one additional strain per {success}. Your character heals strain equal to the strain inflicted.
If incapacitated due to the talent, the target could flee the scene in shame, collapse in a dejected heap, or throw themself at your character in fury, depending on your GM and the nature of your character's witty barbs."),
        ("drone_master", "Drone Master", 5, "Passive", 0, "Your character may control two drones or minion groups of drones no larger than your character's Willpower (either via the rules found on page 233 of Shadow of the Beanstalk Rulebook or via the Animal Companion talent). Your character resolves each drone's (or minion group's) turn individually, choosing the order in which they activate."),
        ("ghost_in_the_machine", "Ghost in the Machine", 5, "Active (Action)", 0, "As long as they have some sort of access point to the Network, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Computers (Hacking) check. If they succeed, they may select one drone, vechicle, or piece of equipment involved in the current encounter and dictate its actions until the start of your character's next turn.
Alternatively, your character can select someone with cybernetic implants or who is wearing powered armor or an exosuit and manipulate it until the beginning of your character's next turn. This must be approved by your GM but could include shutting off cybereyes, directing the movements of cyberlimbs, or causing an exosuite to eject its occupant.
Your character may spend {advantage} {advantage} {advantage} on the check to extend the effects for one additional round, or they may spend {triumph} to extend the effects for the remainder of the encounter."),
        ("master_plan", "Master Plan", 5, "Active (Action)", 0, "Once per session, your character may use this talent to make a Hard ({difficulty} {difficulty} {difficulty}) Discipline check. If they succeed, they reveal that whatever terrible circumstances they currently find themselves in are all part of a brilliant plan that they established at an earlier point. They then choose one non-nemesis adversary in the encounter and reveal them to be a close friend or ally who has positioned themselves to help your character at this exact moment.
The details of which character turns out to be an ally depend on the type of encounter and your GM's approval. However, the ally could also have done their work beforehand, such as loading a squadron of drones with blank ammunition, shutting down power to a security system, or planting a tracer in an opponent's vehicle."),
        ("trick_of_the_light", "Trick of the Light", 5, "Active (Incidental)", 0, "When making a combat check with a laser or maser weapon, your character may use this talent to spend {advantage} to inflict one additional hit with this weapon, dealing base damage plus damage equal to the total number of {success} scored on the check. This hit may target the original target or another target within short range of the original target."),
        ("web_of_knowledge", "Web of Knowledge", 5, "Active (Action)", 0, "Once per session your character may make an Average ({difficulty} {difficulty}) Knowledge (Net) check during a Network encounter. If you succeed, your character knows the names, strengths, and other qualities of all ice (active or deactivated) on one system that you currently have access to, as well as all other characters (sysops and runners) that currently are accessing that system.
Your character may spend {advantage} {advantage} {advantage} or {triumph} from this check (whether or not they succeeded) to add {success} to all Computer checks involving that system that they make for the remainder of the encounter."),
        ("a_face_in_the_crowd", "A Face in the Crowd", 1, "Passive", 0, "Characters add {setback} to any checks they make to pick your character out in a crowd. Your character adds {setback} to any social skill checks they make when interacting with people who do not know them specifically."),
        ("g_mod_enhanced_muscle", "G-Mod (Enhanced Muscle)", 1, "Active (Incidental)", 0, "Before making a Brawl or Athletics check, your character may suffer 1 strain to add {success} to the results."),
        ("enhanced_genetic_modification", "Enhanced Genetic Modification", 1, "Active (Incidental)", 0, "Once per session, you may move one Story Point from the Game Master's pool to the player's pool."),
        ("ready_for_anything", "Ready for Anything", 1, "Active (Incidental, Out of Turn)", 0, "Once per session, when your character uses their G-mod to modify a check, you may spend a story point to add {success} {success} to the check."),
        ("adjusted_to_cybernetics", "Adjusted to Cybernetics", 1, "Active (Incidental, Out of Turn)", 0, "Once per session, you may move one Story Point to have your character heal 2 strain."),
        ("low_g_adept", "Low-G Adept", 1, "Passive", 0, "Your character does not count zero-gravity environments as difficult terrain. They add {boost} to Athletics and Coordination checks they make while in low-gravity environments.");

/* Players' characters' talents */
CREATE TABLE `players_characters_talents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `player_character_id` INT NOT NULL,
  `talent_id` VARCHAR(50) NOT NULL,
  `rank` TINYINT(1) NULL,
  `notes` VARCHAR(500) NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `player_character_id_idx` (`player_character_id` ASC),
  INDEX `talent_id_idx` (`talent_id` ASC),
  CONSTRAINT `fk_players_characters_talents_player_character_id`
    FOREIGN KEY (`player_character_id`)
    REFERENCES `players_characters` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_players_characters_talents_talent_id`
    FOREIGN KEY (`talent_id`)
    REFERENCES `talents` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

/* Adversaries */
CREATE TABLE IF NOT EXISTS `adversaries` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `type` ENUM('minion', 'rival', 'nemesis') NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `brawn` INT DEFAULT 0,
  `agility` INT DEFAULT 0,
  `intellect` INT DEFAULT 0,
  `cunning` INT DEFAULT 0,
  `willpower` INT DEFAULT 0,
  `presence` INT DEFAULT 0,
  `soak` INT DEFAULT 0,
  `wounds_total` INT DEFAULT 0,
  `wounds_current` INT DEFAULT 0,
  `strain_total` INT DEFAULT 0,
  `strain_current` INT DEFAULT 0,
  `defense_melee` INT DEFAULT 0,
  `defense_ranged` INT DEFAULT 0,
  `strength_type` VARCHAR(30) NOT NULL,
  `strength_description` VARCHAR(1000) NOT NULL,
  `flaw_type` VARCHAR(30) NOT NULL,
  `flaw_description` VARCHAR(1000) NOT NULL,
  `desire_type` VARCHAR(30) NOT NULL,
  `desire_description` VARCHAR(1000) NOT NULL,
  `fear_type` VARCHAR(30) NOT NULL,
  `fear_description` VARCHAR(1000) NOT NULL,
  `notes` TEXT NOT NULL,
  `armor` VARCHAR(1000) NOT NULL,
  `gear` VARCHAR(1000) NOT NULL
);
