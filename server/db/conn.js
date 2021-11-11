/**
 * This script serves a Class in order to abstract the database functionalities into a DAO object.
 * @author Juan-Carlos Sreng-Flores
 */
require("dotenv").config();
const dbUrl = process.env.ATLAS_URI;
const { MongoClient } = require("mongodb");

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
    this.collection = await this.db.collection(collName)
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

  async findAllFromRec(neLat, neLon, swLat, swLon) {
    let nwLon = swLon;
    let nwLat = neLat;
    let seLon = neLon;
    let seLat = swLat;

    let result = await db.collection.find({
      geo: {$geoWithin: 
        {$geometry: {
          type: "Polygon",
          coordinates: [
            [
              [nwLon, nwLat],
              [neLon, neLat],
              [seLon, seLat], 
              [swLon, swLat],
              [nwLon, nwLat]
            ]
          ]
        }}
      }
    });
    return result;
  }

  /**
   * This function creates an index in the database
   * @param {JSON} index 
   */
  async createIndex(index) {
    return await this.collection.createIndex(index)
  }

  /**
   * This function disconnects the client from the database.
   */
  async disconnect() {
    this.client.close();
  }

}


module.exports = DAO;