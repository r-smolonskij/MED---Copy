CREATE TABLE IF NOT EXISTS fields(id  INTEGER PRIMARY KEY AUTOINCREMENT,titleLV TEXT, titleENG TEXT);
INSERT or IGNORE INTO fields VALUES (1, 'Uroloģija', 'Urology' );
INSERT or IGNORE INTO fields VALUES (2, 'Nefroloģija', 'Nefrology');
INSERT or IGNORE INTO fields VALUES (3, 'Oftalmoloģija', 'Oftamology');

CREATE TABLE IF NOT EXISTS types(id INTEGER PRIMARY KEY AUTOINCREMENT,feature VARCHAR(5), explanation TEXT);
INSERT or IGNORE INTO types VALUES (1, 'J', 'Jautājumi' );
INSERT or IGNORE INTO types VALUES (2, 'V', 'Vārdi,frāzes');
INSERT or IGNORE INTO types VALUES (3, 'N', 'Norādījumi');

 
CREATE TABLE IF NOT EXISTS words(id INTEGER PRIMARY KEY AUTOINCREMENT,wordLV TEXT, wordENG TEXT, typeID INTEGER);
INSERT or IGNORE INTO words VALUES (0, 'Dzīvnieks', 'Animal', 2);
INSERT or IGNORE INTO words VALUES (1, '1Ar kādām hroniskām slimībām jūs esat slimojis?1', 'What chronical diseases have you suffered (masc.) from?1', 1);
INSERT or IGNORE INTO words VALUES (2, '2Ar kādām hroniskām slimībām jūs esat slimojis?2', 'What chronical diseases have you suffered (masc.) from?2', 1);
INSERT or IGNORE INTO words VALUES (3, '3Ar kādām hroniskām slimībām jūs esat slimojis?3', 'What chronical diseases have you suffered (masc.) from?3', 1);
INSERT or IGNORE INTO words VALUES (4, '4Ar kādām hroniskām slimībām jūs esat slimojis?4', 'What chronical diseases have you suffered (masc.) from?4', 1);
INSERT or IGNORE INTO words VALUES (5, 'Aizklājiet labo aci!', 'Cover your right eye!', 3);
INSERT or IGNORE INTO words VALUES (6, '1Es gribētu pārbaudīt jūsu bērna kaklu!1', 'I would like to check your child’s throat!1', 3 );
INSERT or IGNORE INTO words VALUES (7, '2Es gribētu pārbaudīt jūsu bērna kaklu!2', 'I would like to check your child’s throat!2', 3 );
INSERT or IGNORE INTO words VALUES (8, '3Es gribētu pārbaudīt jūsu bērna kaklu!3', 'I would like to check your child’s throat!3', 3 );
INSERT or IGNORE INTO words VALUES (9, 'Sāpes', 'Pain', 2 );
INSERT or IGNORE INTO words VALUES (10, 'Dzert', 'Drink', 2 );
INSERT or IGNORE INTO words VALUES (11, 'Ēst', 'Eat', 2 );
INSERT or IGNORE INTO words VALUES (12, 'Mīlēt', 'Love', 2 );


CREATE TABLE IF NOT EXISTS words_field_relationship(relationshipID INTEGER PRIMARY KEY AUTOINCREMENT,wordsID INTEGER, fieldsID INTEGER);
INSERT or IGNORE INTO words_field_relationship VALUES (1, 1, 1);
INSERT or IGNORE INTO words_field_relationship VALUES (2, 1, 2);
INSERT or IGNORE INTO words_field_relationship VALUES (3, 1, 3);
INSERT or IGNORE INTO words_field_relationship VALUES (4, 2, 1);
INSERT or IGNORE INTO words_field_relationship VALUES (5, 2, 2);
INSERT or IGNORE INTO words_field_relationship VALUES (6, 3, 2);
INSERT or IGNORE INTO words_field_relationship VALUES (7, 3, 3);