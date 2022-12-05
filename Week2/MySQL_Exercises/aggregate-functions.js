const mysql = require("mysql");

const conData = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "dbweek2",
};

const db = mysql.createConnection(conData);

db.connect();

const executeQuery = (sql) => {
  db.query(sql, (err, results) => {
    if (err) throw err;
    results.forEach((element) => {
      console.log(element);
    });
  });
};

// All research papers and the number of authors that wrote that paper.
const sql = `
SELECT rp.paper_title, COUNT(arp.author_id) AS Total_Authors FROM research_Papers AS rp 
LEFT JOIN author_researchPapers AS arp 
    ON rp.paper_id = arp.paper_id
GROUP BY rp.paper_title`;

// Sum of the research papers published by all female authors.
const sql1 = `
SELECT authors.gender, COUNT(rp.paper_title) AS Numbe_of_Papers_By_Females
FROM authors
LEFT JOIN author_researchPapers AS arp
    ON authors.author_id = arp.author_id
LEFT JOIN research_Papers AS rp
    ON arp.paper_id = rp.paper_id
GROUP BY gender
HAVING gender = 'f'`;

// Average of the h-index of all authors per university.
const sql2 = `
SELECT university, AVG(h_index) AS H_INDEX_AVG
FROM authors 
GROUP BY university`;

// Sum of the research papers of the authors per university.
const sql3 = `
SELECT university, COUNT(arp.paper_id) AS Total_Papers
FROM authors
LEFT JOIN author_researchPapers AS arp 
    ON authors.author_id = arp.author_id
GROUP BY university`;

// Minimum and maximum of the h-index of all authors per university.
const sql4 = `
SELECT university, MIN(h_index) AS Minimum, MAX(h_index) AS Maximum
FROM authors
GROUP BY university`;

executeQuery(sql);
executeQuery(sql1);
executeQuery(sql2);
executeQuery(sql3);
executeQuery(sql4);
db.end();
