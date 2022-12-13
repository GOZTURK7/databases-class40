export const accountValues = [[3500], [3000], [4000], [5000], [8000]];

export const accountChangesValues = [
  [100, 25, "2022-12-12", "some comment 1"],
  [101, 50, "2022-12-13", "some comment 2"],
  [102, 100, "2022-12-14", "some comment 3"],
  [103, 150, "2022-12-15", "some comment 4"],
  [104, 200, "2022-12-16", "some comment 5"],
];

export const insertValuesToAccount = `INSERT INTO account(balance) VALUES ?`;

export const insertValuesToAccountChanges = `INSERT INTO account_changes(account_num, amount, change_date, remark) VALUES ?`;
