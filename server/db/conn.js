/**
 * This script serves a Class in order to abstract the database functionalities into a DAO object.
 * @author Juan-Carlos Sreng-Flores
 */
require("dotenv").config();
const dbUrl = process.env.ATLAS_URI;
const { MongoClient, ObjectId } = require("mongodb");

let instance = null;

/**
 * This class serves as a Data access object.
 */
class DAO {
  constructor() {
    if (!instance) {
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  /**
   * This function connects to the MongoDB database.
   * @param {String} dbname Name of the database to be created if not existing
   * @param {String} collName Name of the collection to be created if not existing
   * @returns 
   */
  async connect(dbname, collName) {
    if (this.db) {
      return;
    }
    await this.client.connect();
    this.db = await this.client.db(dbname);
    this.collection = await this.db.collection(collName);
  }

  /**
   * This function queries all objects in the database
   * @param {Object} projection controls which fields appear
   * @returns an array of objects in the database
   */
  async findAll(projection) {
    let result = await this.collection.find().project(projection);
    return result.toArray();
  }

  /**
   * This function queries an object that has a matching id
   * @param {String} id object's id
   * @param {Object} projection controls which fields appear
   * @returns an object that contains the specified id
   */
  async findById(id, projection) {
    let result = await this.collection.findOne({ "_id": ObjectId(id) }, projection);
    return result;
  }

  /**
   * This function queries all objects that are within the polygon defined by the coordinates
   * @param {float} neLat north-east latitude
   * @param {float} neLon north-east longitude
   * @param {float} swLat south-west latitude
   * @param {float} swLon south-west longitude
   * @returns an array of objects that are within the area of the polygon
   */
  async findAllInRectangle(neLon, neLat, swLon, swLat, projection) {

    //find missing coordinates
    let nwLon = swLon;
    let nwLat = neLat;
    let seLon = neLon;
    let seLat = swLat;
    // Query to the database, use counter-clock wise for the polygon
    let query = {
      geo: {
        $within:
        {
          $geometry: {
            type: "Polygon",
            coordinates: [
              [
                [nwLon, nwLat],
                [swLon, swLat],
                [seLon, seLat],
                [neLon, neLat],
                [nwLon, nwLat]
              ]
            ],
            crs: {
              type: "name",
              properties: { name: "urn:x-mongodb:crs:strictwinding:EPSG:4326" }
            }
          }
        }
      }
    };
    //define polygon and find objects that are within this polygon
    let result = await this.collection.find(query).project(projection);
    const values = await result.toArray();
    values.forEach(met => met.geo.coordinates = met.geo.coordinates.reverse());
    return values;
  }

  /**
   * This function inserts into the database an array of JSON objects.
   * @param {Array} array 
   * @returns 
   */
  async insertMany(array) {
    let result = await this.collection.insertMany(array);
    return result.insertedCount;
  }

  /**
   * This function creates an index in the database
   * @param {JSON} index 
   */
  async createIndex(index) {
    return await this.collection.createIndex(index);
  }

  /**
   * This function disconnects the client from the database.
   */
  async disconnect() {
    this.client.close();
  }

}

module.exports = { DAO };