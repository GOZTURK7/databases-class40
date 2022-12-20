export const transferMoney = async (
    client,
    fromAccountId,
    toAccountId,
    amount
  )=> {
    const accountsCollection = await client.db("transactions").collection("accounts");
  
    const accountChangesCollection = await client
      .db("transactions")
      .collection("account_changes");
  
    const session = client.startSession();
  
    try {
      await session.withTransaction(async () => {
      const num= await getLastChangeNumber(accountChangesCollection);
      const newChangeNumber = num+1;
  
      //   Create a new 'account_change' object
      const newAccountChange = await accountChangesCollection.insertOne({
          change_number: newChangeNumber,
          amount: amount,
          changed_date: new Date(),
          remark: `${amount} Euro is transferred from account ${fromAccountId} to account ${toAccountId}`
        });
  
        // Remove from fromUser
        const res1 = await accountsCollection.updateOne(
          { account_number: fromAccountId },
          { $inc: { balance: -amount}, $push: {account_changes: {change_number: newChangeNumber}}},
          { session }
        );
  
        // Add to toUser
        const res2= await accountsCollection.updateOne(
          { account_number: toAccountId },
          { $inc: { balance: amount}, $push: {account_changes: {change_number: newChangeNumber}} },
          { session }
        );
  
      });
  
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
    } finally {
      await seeTheResults(accountsCollection, accountChangesCollection)
      await session.endSession();
    }
  };
  
  const getLastChangeNumber = async (accountChangesCollection) => {
  
      var pipeline = [{ $sort: { change_number: -1 } }, { $limit: 1 }];
  
      const result = await accountChangesCollection.aggregate(pipeline).toArray();
  
      return result[0].change_number;
  };
  
  const seeTheResults = async (accountsCollection, accountChangesCollection) =>{
      // to see the results
      const resultAccounts = await accountsCollection.find().toArray();
      const resultAccountChanges = await accountChangesCollection.find().toArray();
  
      console.log(`-------------------------------------------------------------`);
      console.log(`ACCOUNTS COLLECTION AFTER TRANSFER`);
      resultAccounts.forEach(account => {
          console.log(account);
      });
      console.log(`-------------------------------------------------------------`);
      console.log(`ACCOUNTS_CHANGES COLLECTION AFTER TRANSFER`);
      resultAccountChanges.forEach(change => {
          console.log(change);
      })
  };
  