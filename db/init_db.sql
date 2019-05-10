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
