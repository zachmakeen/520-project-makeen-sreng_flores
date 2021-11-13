const express = require("express");
const router = express.Router();
// get db connection
const DAO = require("../db/conn");
const db = new DAO();

//parser middleware will parse the json payload
router.use(express.json());

//retrieve a list of meteorite landings
router.get("/", async (req, res) => {
  try {
    let ml = await db.findAll();
    res.send(ml);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).end();
  }
});

//retrieve info about a particular meteorite landing
router.get("/meteorite_landing/:id", async (req, res) => {
  try {
    let ml = await db.findById(req.params.id);
    res.send(ml);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).end();
  }
});

//retrieve a list of meteorite landings
router.get("/meteorite_landings", async (req, res) => {
  try {
    let ml = await db.findAllInRectangle(
      req.query.neLat,
      req.query.neLon,
      req.query.swLat,
      req.query.swLon
    );
    res.send(ml);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).end();
  }
});

module.exports = router;
