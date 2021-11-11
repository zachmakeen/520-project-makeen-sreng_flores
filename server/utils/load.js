/**
 * This script parses the data from a file path. The file must be an array of JSON objects.
 * The data is then cleaned and converted using appropriate json fields for indexing it under
 * 2dsphere in MongoDB.
 * @author Zacharie Makeen
 * @author Juan-Carlos Sreng-Flores
 */

//import `fs/promise` module with CJS
const fs = require("fs/promises");
const MAX_LAT = 90;
const MIN_LAT = -90;
const MAX_LONG = 180;
const MIN_LONG = -180

/**
 * Read JSON from file and clean invalid data. 
 * @param {String} filepath The JSON file
 * @returns {Array}         The array of objects
 */
async function read(filepath) {
  try {
    //read contents of the file as a JSON string
    let data = await fs.readFile(filepath, "utf-8");

    //parse string into an array of objects
    let content = JSON.parse(data);

    //loop through each object in the array and clean data.
    content = cleanData(content)

    // Add geo field to each items.
    content.map(addGeoJsonField)

    console.log("Parsed " + content.length + " entries.")

    return content
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

/**
 * This helper function cleans the data of a JSON array
 * @param {Array} array array of JSON objects containing reclong and reclat attributes.
 * @returns cleaned array with no invalid data.
 */
function cleanData(array) {
  let filters = [
    // Remove empty location, remove objects from array whose lat and long are not defined
    item => typeof item.reclat === "number" && typeof item.reclong === "number",
    // Remove items out of bounds of latitude as recommended by the source.
    item => item.reclong >= MIN_LONG && item.reclong <= MAX_LONG,
    item => item.reclat >= MIN_LAT && item.reclat <= MAX_LAT
  ]
  // Final filter to remove all at once. If the filter returns false then the
  // final filter will return false. Otherwise, it will return undefined where the 
  // finalFilter will return true.
  finalFilter = item => filters.find(filter => filter(item) === false) === undefined;

  return array.filter(finalFilter);
}

/**
 * This function takes a JSON object and returns the object with the proper field
 * for 2dsphere geo location. 
 * @param {JSON} item 
 * @returns json object with 2dsphere geolocation.
 */
function addGeoJsonField(item) {
  //define new geo object using the item's lat and long properties
  item.geo = {
    "type": "Point",
    "coordinates": [
      item.reclong,
      item.reclat
    ]
  };
  //delete properties from object
  delete item.reclat;
  delete item.reclong;
  delete item.GeoLocation;

  return item
}
module.exports = { read };