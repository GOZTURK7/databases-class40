import accounts from "./accounts.json" assert { type: "json" };
import account_changes from "./account_changes.json" assert { type: "json" };

export const seedDatabase = async (client) => {
  const hasAccountsCollection = await client
    .db("transactions")
    .listCollections({ name: "accounts" })
    .hasNext();

  const hasAccountChangesCollection = await client
    .db("transactions")
    .listCollections({ name: "account_changes" })
    .hasNext();

  await addData(client, hasAccountsCollection, "accounts", accounts);

  await addData(
    client,
    hasAccountChangesCollection,
    "account_changes",
    account_changes
  );
};

const addData = async (client, hasCollection, collectionName, newData) => {
  if (hasCollection) {
    
    const collection = await client
      .db("transactions")
      .collection(collectionName);

    // Remove all the documents
    await collection.deleteMany({});

    // Add our documents
    await collection.insertMany(newData);
  } else {
    throw Error(`The collection ${collectionName} does not exist!`);
  }
};
