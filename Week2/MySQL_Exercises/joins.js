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

// Write a query that prints names of all authors and their corresponding mentors.
const sql = `SELECT author_name, mentor FROM authors`;

// Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
const sql1 = `
SELECT authors.*, paper_title FROM authors
LEFT JOIN author_researchPapers AS arp ON authors.author_id = arp.author_id 
LEFT JOIN research_Papers AS rp ON rp.paper_id = arp.paper_id`;

executeQuery(sql);
executeQuery(sql1);
db.end();
