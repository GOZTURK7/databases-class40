const mysql = require("mysql");

const conData = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "dbweek2",
};

const db = mysql.createConnection(conData);

db.connect();

// CREATE RESEARCH PAPERS TABLE
const createResearchPapers = `CREATE TABLE IF NOT EXISTS research_Papers(
    paper_id INT AUTO_INCREMENT PRIMARY KEY,
    paper_title VARCHAR(255),
    conference VARCHAR(255),
    publish_date DATE
)`;

// CREATE AUTHORS_RESEARCHPAPERS TABLE (LINK)
const createAuthorsPapers = `CREATE TABLE IF NOT EXISTS author_researchPapers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    paper_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)
)`;

// AUTHORS VALUES INSERTATION
const insertAuthors = `INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES ?`;

const authorsValues = [
  ["Author_1", "University_1", "1989-01-09", 101, "m", null],
  ["Author_2", "University_2", "1989-01-09", 102, "m", 1],
  ["Author_3", "University_2", "1989-01-09", 103, "m", 1],
  ["Author_4", "University_4", "1989-01-09", 104, "f", 3],
  ["Author_5", "University_4", "1989-01-09", 105, "m", 2],
  ["Author_6", "University_4", "1989-01-09", 106, "m", 5],
  ["Author_7", "University_7", "1989-01-09", 107, "m", 2],
  ["Author_8", "University_9", "1989-01-09", 108, "f", 7],
  ["Author_9", "University_9", "1989-01-09", 109, "m", 8],
  ["Author_10", "University_10", "1989-01-09", 110, "m", 8],
  ["Author_11", "University_11", "1989-01-09", 111, "m", 9],
  ["Author_12", "University_12", "1989-01-09", 112, "f", 9],
  ["Author_13", "University_13", "1989-01-09", 113, "f", 6],
  ["Author_14", "University_13", "1989-01-09", 114, "f", 12],
  ["Author_15", "University_15", "1989-01-09", 115, "m", 1],
];

// RESEARCH PAPERS VALUES INSERTATION
const insertPapers = `INSERT INTO research_Papers (paper_title, conference, publish_date) VALUES ?`;

const papersValues = [
  ["paper_title1", "conference_1", "2022-05-12"],
  ["paper_title2", "conference_2", "2022-05-12"],
  ["paper_title3", "conference_3", "2022-05-12"],
  ["paper_title4", "conference_4", "2022-05-12"],
  ["paper_title5", "conference_5", "2022-05-12"],
  ["paper_title6", "conference_6", "2022-05-12"],
  ["paper_title7", "conference_7", "2022-05-12"],
  ["paper_title8", "conference_8", "2022-05-12"],
  ["paper_title9", "conference_9", "2022-05-12"],
  ["paper_title10", "conference_10", "2022-05-12"],
  ["paper_title11", "conference_11", "2022-05-12"],
  ["paper_title12", "conference_12", "2022-05-12"],
  ["paper_title13", "conference_13", "2022-05-12"],
  ["paper_title14", "conference_14", "2022-05-12"],
  ["paper_title15", "conference_15", "2022-05-12"],
  ["paper_title16", "conference_16", "2022-05-12"],
  ["paper_title17", "conference_17", "2022-05-12"],
  ["paper_title18", "conference_18", "2022-05-12"],
  ["paper_title19", "conference_19", "2022-05-12"],
  ["paper_title20", "conference_20", "2022-05-12"],
  ["paper_title21", "conference_21", "2022-05-12"],
  ["paper_title22", "conference_22", "2022-05-12"],
  ["paper_title23", "conference_23", "2022-05-12"],
  ["paper_title24", "conference_24", "2022-05-12"],
  ["paper_title25", "conference_25", "2022-05-12"],
  ["paper_title26", "conference_26", "2022-05-12"],
  ["paper_title27", "conference_27", "2022-05-12"],
  ["paper_title28", "conference_28", "2022-05-12"],
  ["paper_title29", "conference_29", "2022-05-12"],
  ["paper_title30", "conference_30", "2022-05-12"],
];

// AUTHORSPAPERS VALUES INSERTATION
const insertAuthorsPapers = `INSERT INTO author_researchPapers(author_id, paper_id) VALUES ?`;

const authorsPapersValues = [
  [1, 3],
  [2, 3],
  [3, 4],
  [3, 5],
  [4, 5],
  [6, 7],
  [8, 9],
  [10, 11],
  [11, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [3, 17],
  [2, 18],
  [3, 19],
  [4, 20],
  [5, 21],
  [6, 22],
  [7, 23],
  [8, 24],
  [9, 25],
  [12, 26],
  [11, 27],
  [12, 28],
  [13, 29],
  [14, 30],
  [5, 10],
  [6, 1],
  [7, 2],
];

const executeQuery = (sql, values) => {
  db.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log("DONE");
  });
};

executeQuery(createResearchPapers);
executeQuery(createAuthorsPapers);
executeQuery(insertAuthors, authorsValues);
executeQuery(insertPapers, papersValues);
executeQuery(insertAuthorsPapers, authorsPapersValues);
db.end();
