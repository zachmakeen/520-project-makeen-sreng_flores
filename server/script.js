const { writeToDb } = require("./utils/writeToDb");
const filename = "dataset/meteorite-landings.json";
const dbname = "project";
const collection = "meteorite_landing";
const index = {"geo": "2dsphere"};

(async () => {
  await writeToDb(dbname, collection, filename, index)
})();