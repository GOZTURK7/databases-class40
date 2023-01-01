import { MongoClient } from "mongodb";
import {
  totalPopulationOfContinentsByYearAndAge,
  totalPopulationOfTheCountryByYear,
} from "./querries.js";

const client = new MongoClient(process.env.MONGODB_URL);

const country = "Netherlands";
const year = 2020;
const age = "100+";

const main = async () => {
  try {
    await totalPopulationOfTheCountryByYear(client, country);
    await totalPopulationOfContinentsByYearAndAge(client, year, age);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
};

main();
