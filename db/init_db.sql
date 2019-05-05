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
