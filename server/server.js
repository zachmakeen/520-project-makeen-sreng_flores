const app = require("./app");
// get db connection
const DAO = require("../db/conn");

const PORT = process.env.PORT || 3001;
const dbname = "project";
const collection = "meteorite_landing";

(async () => {
  try {
    const db = new DAO();
    await db.connect(dbname, collection);
  } catch (e) {
    console.error("could not connect");
    process.exit();
  }
  app.listen(PORT, () => {
    console.log("Server listening on port " + PORT + "!");
  });
})();
  