import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from "dotenv";
import { seedDatabase } from "./setup.js";
import { transferMoney } from "./transfer.js";
dotenv.config();

const main = async () => {
    
  if (process.env.MONGODB_URL == null)
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );

  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    // Seed our database
    await seedDatabase(client);
    // transfer 1000 from account number 101 to account number 102
    await transferMoney(client, 101, 102, 1000);
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

main();
