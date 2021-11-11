/**
 * This script loads the data from the filepath variable and creates a collection in a 
 * remote database.
 * A .env file must be created with the ATLAS_URI variable in order to connect to the database.
 * @author Zacharie Makeen
 * @author Juan-Carlos Sreng-Flores
 */
const { writeToDb } = require("./utils/writeToDb");
const filepath = "server/dataset/meteorite-landings.json";
const dbname = "project";
const collection = "meteorite_landing";
const index = { "geo": "2dsphere" };

(async () => {
  console.log("Running Write to DB");
  await writeToDb(dbname, collection, filepath, index)
})();