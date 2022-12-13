import mysql from "mysql";

const connSet = {
  host: "localhost",
  username: "hyfuser",
  password: "hyfpassword",
  database: "world",
};

const db = mysql.createConnection(connSet);

db.connect();

try {
  await getPopulation("country", "Netherlands", "NLD", console.log);
} catch (error) {
    console.log(error);
}

const getPopulation = async (Country, name, code, cb) => {
  db.query(
    `SELECT Population FROM ${Country} WHERE Name = ${db.escape(
      name
    )} and code = ${db.escape(code)}`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(name+':', result[0].name);
    }
  );
};
