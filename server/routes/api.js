/* eslint-disable max-len */
const express = require("express");
const router = express.Router();
// get db connection
const { DAO } = require("../db/conn");
const db = new DAO();
// import memory-cache package.
const cache = require("memory-cache")


//parser middleware will parse the json payload
router.use(express.json());

/**
 * @swagger
 * /api:
 *    get:
 *      summary: Retireve a list of all the meteorite landings in the database.
 *      description: Retireve a list of all the meteorite landings in the database. Optionally provide query parameters limit and skip to filter the results.
 *      responses:
 *        200:
 *          description: A list of meteorite landings
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: a unique identifier for the meteorite 
 *                    example: 618d4e964e4f72f5c0ad560d
 *                  name:
 *                    type: string
 *                    description: the name of the meteorite (typically a location, often modified with a number, year, composition, etc)
 *                    example: Aachen
 *                  id:
 *                    type: integer
 *                    description: a unique identifier for the meteorite 
 *                    example: 1
 *                  nametype:
 *                    type: string
 *                    description: a typical meteorite 
 *                    example: Aachen
 *                  recclass:
 *                    type: string
 *                    description: the class of the meteorite; one of a large number of classes based on physical, chemical, and other characteristics
 *                    example: L5
 *                  mass:
 *                    type: integer
 *                    description: the mass of the meteorite, in grams
 *                    example: 21
 *                  fall:
 *                    type: string
 *                    description: whether the meteorite was seen falling, or was discovered after its impact
 *                    example: Fell
 *                  year:
 *                    type: integer
 *                    description: the year the meteorite fell, or the year it was found (depending on the value of fell)
 *                    example: 1880
 *                  geo:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                        description: 
 *                        example: Point
 *                      coordinates:
 *                        type: array
 *                        items:
 *                          type: integer
 *                          description: the longitude of the meteorite's landing and the latitude of the meteorite's landing
 *                          example: [6.08333, 50.775]
 */
router.get("/", async (req, res) => {
  try {
    // let cacheKey = "all_meteorite_landings"
    // let ml = cache.get(cacheKey)
    // if (!ml) {
    //   ml = await db.findAll();
    //   cache.put(cacheKey, ml)
    // }
    let ml = await db.findAll();
    res.send(ml);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).end();
  }
});

/**
 * @swagger
 * /api/meteorite_landing/{id}:
 *    get:
 *      summary: Retrieve a meteorite landing from an id query.
 *      description: Retrieve a meteorite landing from an id query. Optionally provide query parameters limit and skip to filter the results.
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: a unique identifier for the meteorite.
 *         schema:
 *           type: string
 *      responses:
 *        200:
 *          description: A list of meteorite landings
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: a unique identifier for the meteorite 
 *                    example: 618d4e964e4f72f5c0ad560d
 *                  name:
 *                    type: string
 *                    description: the name of the meteorite (typically a location, often modified with a number, year, composition, etc)
 *                    example: Aachen
 *                  id:
 *                    type: integer
 *                    description: a unique identifier for the meteorite 
 *                    example: 1
 *                  nametype:
 *                    type: string
 *                    description: a typical meteorite 
 *                    example: Aachen
 *                  recclass:
 *                    type: string
 *                    description: the class of the meteorite; one of a large number of classes based on physical, chemical, and other characteristics
 *                    example: L5
 *                  mass:
 *                    type: integer
 *                    description: the mass of the meteorite, in grams
 *                    example: 21
 *                  fall:
 *                    type: string
 *                    description: whether the meteorite was seen falling, or was discovered after its impact
 *                    example: Fell
 *                  year:
 *                    type: integer
 *                    description: the year the meteorite fell, or the year it was found (depending on the value of fell)
 *                    example: 1880
 *                  geo:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                        description: 
 *                        example: Point
 *                      coordinates:
 *                        type: array
 *                        items:
 *                          type: integer
 *                          description: the longitude of the meteorite's landing and the latitude of the meteorite's landing
 *                          example: [6.08333, 50.775]
 */
router.get("/meteorite_landing/:id", async (req, res) => {
  try {
    let cacheKey = req.params.id
    let ml = cache.get(cacheKey)
    if (!ml) {
      ml = await db.findById(cacheKey);
      cache.put(cacheKey, ml)
    }
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
 *      summary: Retireve a list of all the meteorite landings in a rectangle.
 *      description: Retireve a list of all the meteorite landings in a rectangle. Optionally provide query parameters limit and skip to filter the results.
 *      parameters:
 *       - in: query
 *         name: neLon
 *         required: true
 *         description: north-east latitude
 *         schema:
 *           type: number
 *       - in: query
 *         name: neLat
 *         required: true
 *         description: north-east latitude
 *         schema:
 *           type: number
 *       - in: query
 *         name: swLon
 *         required: true
 *         description: north-east latitude
 *         schema:
 *           type: number
 *       - in: query
 *         name: swLat
 *         required: true
 *         description: north-east latitude
 *         schema:
 *           type: number
 *      responses:
 *        200:
 *          description: A list of meteorite landings
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: a unique identifier for the meteorite 
 *                    example: 618d4e964e4f72f5c0ad560d
 *                  name:
 *                    type: string
 *                    description: the name of the meteorite (typically a location, often modified with a number, year, composition, etc)
 *                    example: Aachen
 *                  id:
 *                    type: integer
 *                    description: a unique identifier for the meteorite 
 *                    example: 1
 *                  nametype:
 *                    type: string
 *                    description: a typical meteorite 
 *                    example: Aachen
 *                  recclass:
 *                    type: string
 *                    description: the class of the meteorite; one of a large number of classes based on physical, chemical, and other characteristics
 *                    example: L5
 *                  mass:
 *                    type: integer
 *                    description: the mass of the meteorite, in grams
 *                    example: 21
 *                  fall:
 *                    type: string
 *                    description: whether the meteorite was seen falling, or was discovered after its impact
 *                    example: Fell
 *                  year:
 *                    type: integer
 *                    description: the year the meteorite fell, or the year it was found (depending on the value of fell)
 *                    example: 1880
 *                  geo:
 *                    type: object
 *                    properties:
 *                      type:
 *                        type: string
 *                        description: 
 *                        example: Point
 *                      coordinates:
 *                        type: array
 *                        items:
 *                          type: integer
 *                          description: the longitude of the meteorite's landing and the latitude of the meteorite's landing
 *                          example: [6.08333, 50.775]
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
