import {
  accountTable,
  accountChangesTable,
} from "./transactions-create-tables.js";
import {
  accountValues,
  accountChangesValues,
  insertValuesToAccount,
  insertValuesToAccountChanges,
} from "./transactions-insert-values.js";
import mysql from "mysql";

const conData = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "dbweek3",
};

const db = mysql.createConnection(conData);

db.connect();

const startQuery = async (sql, values) => {
  db.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.table(result);
  });
};

const moneyTransfer = [
  `SET AUTOCOMMIT = 0`,

  `START TRANSACTION`,

  `UPDATE account 
        SET balance = balance - 1000 
        WHERE account_number = 101;`,

  `INSERT INTO account_changes(account_num, amount, change_date, remark)
        VALUES(101, 1000, "2022-12-30", "1000$ has been sent to account 102");`,

  `UPDATE account 
        SET balance = balance + 1000
        WHERE account_number = 102;`,

  `INSERT INTO account_changes(account_num, amount, change_date, remark)
        VALUES(102, 1000,"2022-12-30", "1000$ has been deposited to account 102");`,
];
try {
  // creates 'account' table and set autoincreament = 100,
  accountTable.forEach(async (element) => {
    await startQuery(element);
  });
  //   creates 'account_changes' table
  await startQuery(accountChangesTable);
  //   inserts initial values to 'account' table
  await startQuery(insertValuesToAccount, accountValues);
  //   inserts initial values to 'account_changes' table
  await startQuery(insertValuesToAccountChanges, accountChangesValues);
  //   passing through 'moneyTransfer' transaction queries
  moneyTransfer.forEach(async (element) => {
    await startQuery(element);
  });
  // we had set autocommit=false/0 previousle now if all the queries were successful, it will be committed.
  db.commit();
} catch (error) {
  // if any error had been occured during the moneyTransfer it will be rolled back.
  db.rollback();
  console.log(error);
}

db.end();
