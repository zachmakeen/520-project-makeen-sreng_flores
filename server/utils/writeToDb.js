const DAO = require("../db/conn")
const { read } = require("./load/")
let dao = new DAO()


async function writeToDb(dbname, collection, filename, index) {
  await dao.connect(dbname, collection)
  await dao.insertMany(await read(filename))
  await dao.createIndex(index)

}

module.exports = { writeToDb }