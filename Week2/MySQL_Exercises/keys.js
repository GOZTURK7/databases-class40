const mysql = require('mysql');

const conData = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'dbweek2'
}

const db = mysql.createConnection(conData);

db.connect();

const createTableAuthors = `CREATE TABLE IF NOT EXISTS authors(
    author_id INT AUTO_INCREMENT,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender ENUM('m','f'),
    PRIMARY KEY(author_id)
)`;

const addMentorColumn = `ALTER TABLE authors 
ADD mentor INT, 
ADD FOREIGN KEY(mentor) REFERENCES authors(author_id)`

const executeQuery = (sql)=>{
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log('DONE');
    });
};

executeQuery(createTableAuthors);
executeQuery(addMentorColumn);
db.end();