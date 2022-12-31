
import mysql from "mysql";
import {insertValuesToAccount, accountValues, insertValuesToAccountChanges,accountChangesValues} from "./transactions-insert-values.js";

const conData = {
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    database: "dbweek3",
  };
  
const db = mysql.createConnection(conData);

const startQuery = async (sql, values) => {
    db.query(sql, [values], (err, result) => {
      if (err) throw err;
      console.table(result);
    });
  };

export const accountTable = [
  `CREATE TABLE IF NOT EXISTS account (
        account_number INT AUTO_INCREMENT,
        balance INT,
        PRIMARY KEY(account_number)
    );`,

  `ALTER TABLE account AUTO_INCREMENT=100;`,
];

export const accountChangesTable = `CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT AUTO_INCREMENT,
    account_num INT NOT NULL,
    amount INT NOT NULL,
    change_date DATE NOT NULL,
    remark VARCHAR(255) NOT NULL,
    PRIMARY KEY(change_number),
    FOREIGN KEY (account_num) REFERENCES account(account_number)
);`;

 // creates 'account' table and set autoincreament = 100,
accountTable.forEach((element) => {
    startQuery(element);
  });
  //   creates 'account_changes' table
  startQuery(accountChangesTable);
  //   inserts initial values to 'account' table
  startQuery(insertValuesToAccount, accountValues);
  //   inserts initial values to 'account_changes' table
  startQuery(insertValuesToAccountChanges, accountChangesValues);
  

