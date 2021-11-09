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

    //loop through each object in the array
    content.forEach(function (item, index, object) {

      //remove objects from array whose lat and long are not defined
      if (item.reclat === "" && item.reclong === "") {
        object.splice(index, 1);
        return;
      }
      
      //define new geo object using the item's lat and long properties
      let geo = {
        "type": "Point",
        "coordinates": [
          item.reclong,
          item.reclat
        ]
      };

      //add geo property to object
      item.geo = geo;

      //delete properties from object
      delete item.reclat;
      delete item.reclong;
      delete item.GeoLocation;
    });
    return content
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

module.exports = read;