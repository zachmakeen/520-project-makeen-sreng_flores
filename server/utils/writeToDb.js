/**
 * This script exports a function writeToDb in order to write a JSON dataset into the database
 * @author Juan-Carlos Sreng-Flores
 */
const DAO = require("../db/conn")
const { read } = require("./load")
let dao = new DAO()

/**
 * This function takes the database name, a collection name, a file path, 
 * and an index in order to connect, and populate a database.
 * The content of the file must be a JSON array. 
 * @param {String} dbname 
 * @param {String} collection 
 * @param {String} filename 
 * @param {String} index 
 */
async function writeToDb(dbname, collection, filename, index) {
  console.log("Attempting to connect...");
  try {
    await dao.connect(dbname, collection);
    console.log("Connection successful.");
    await dao.insertMany(await read(filename));
    console.log("Inserted entries to database.");
    await dao.createIndex(index);
    console.log("Successfully indexed items under" + JSON.stringify(index))
  } finally {
    dao.disconnect();
  }

}

module.exports = { writeToDb }