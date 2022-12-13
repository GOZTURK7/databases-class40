
export const accountTable = [
    `CREATE TABLE IF NOT EXISTS account (
        account_number INT AUTO_INCREMENT,
        balance INT,
        PRIMARY KEY(account_number)
    );`,

    `ALTER TABLE account AUTO_INCREMENT=100;`

    
]

export const accountChangesTable = `CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT AUTO_INCREMENT,
    account_num INT NOT NULL,
    amount INT NOT NULL,
    change_date DATE NOT NULL,
    remark VARCHAR(255) NOT NULL,
    PRIMARY KEY(change_number),
    FOREIGN KEY (account_num) REFERENCES account(account_number)
);`


