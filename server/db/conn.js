require("dotenv").config();
const dbUrl = process.env.ATLAS_URI;
const { MongoClient } = require("mongodb");

let instance = null;

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

  async connect(dbname, collName) {
    if (this.db) {
      return;
    }
    await this.client.connect();
    this.db = await this.client.db(dbname);
    console.log("Successfully connected to MongoDB database " + dbname);
    this.collection = await this.db.collection(collName)
  }

  //   //Note the syntax for a projection is different
  //   async findOne(query, projection) {
  //     let result = await this.collection.findOne(query, { "projection": projection });
  //     return result;
  //   }

  //   async findAll(projection) {
  //     let result = await this.collection.find().project(projection);
  //     return result.toArray();
  //   }

  async insertMany(array) {
    let result = await this.collection.insertMany(array);
    return result.insertedCount;
  }

  async createIndex(index) {
    await this.collection.createIndex(index)
  }

  async disconnect() {
    this.client.close();
  }

}


module.exports = DAO;