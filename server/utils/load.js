/**
 * @author Zacharie Makeen
 */

//import `fs/promise` module with CJS
const fs = require("fs/promises");

/**
 * Read JSON from file
 * @param {String} filename The JSON file
 * @returns {Array}         The array of objects
 */
async function read(filename) {
  try {
    //read contents of the file as a JSON string
    let data = await fs.readFile(filename, "utf-8");

    //parse string into an array of objects
    let content = JSON.parse(data);
    console.log(content);
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

module.exports = read;