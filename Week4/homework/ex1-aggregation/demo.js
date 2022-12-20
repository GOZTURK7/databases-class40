import { MongoClient } from "mongodb";
import {
  totalPopulationOfContinentsByYearAndAge,
  totalPopulationOfTheCountryByYear,
} from "./querries.js";

const uri =
  "mongodb+srv://hyfuser:hyfpassword@cluster0.xgtln7g.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

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
