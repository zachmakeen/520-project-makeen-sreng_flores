const express = require("express");
const router = express.Router();
// get db connection
const DAO = require("../db/conn");
const db = new DAO();

//parser middleware will parse the json payload
router.use(express.json());

/**
 * @swagger
 * /api:
 *    get:
 *      summary: Retireve a list of all the meteorite landings in the database.
 */
router.get("/", async (req, res) => {
  try {
    let ml = await db.findAll();
    res.send(ml);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).end();
  }
});

// *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
// *     parameters:
// *       - in: path
// *         name: id
// *         required: true
// *         description: Numeric ID of the user to retrieve.
// *         schema:
// *           type: integer
// *     responses:
// *       200:
/**
 * @swagger
 * /api/meteorite_landing/{id}:
 *  get:
 *    summary: Retrieve a meteorite landing from an id query.
 */
router.get("/meteorite_landing/:id", async (req, res) => {
  try {
    let ml = await db.findById(req.params.id);
    res.send(ml);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).end();
  }
});

/**
 * @swagger
 * /api/meteorite_landings:
 *    get:
 *      summary: Retrieve a meteorite landing from an id query.
 */
router.get("/meteorite_landings", async (req, res) => {
  try {
    let ml = await db.findAllInRectangle(
      parseFloat(req.query.neLon),
      parseFloat(req.query.neLat),
      parseFloat(req.query.swLon),
      parseFloat(req.query.swLat)
    );
    res.send(ml);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).end();
  }
});

module.exports = router;
