/* eslint-disable max-len */
const express = require("express");
const router = express.Router();
// get db connection
const { DAO } = require("../db/conn");
const db = new DAO();
// Import memory-cache package.
const cache = require("memory-cache");


// Parser middleware will parse the json payload
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
    // Generate a cache key pair.
    let cacheKey = "all_meteorite_landings"
    // Fetch information in the cache first.
    let ml = cache.get(cacheKey);
    // If the information couldn't be found in the cache, look up in the database.
    if (!ml) {
      // Database lookup.
      ml = await db.findAll();
      // Store a copy in the cache for future lookup.
      cache.put(cacheKey, ml);
    }
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
    // Generate a key pair for the cache.
    let cacheKey = req.params.id;
    // Fetch information in the cache.
    let ml = cache.get(cacheKey);
    // If the information could not be found in the cache, perform a database lookup.
    if (!ml) {
      // Database lookup.
      ml = await db.findById(cacheKey);
      // Store a copy to the cache.
      cache.put(cacheKey, ml);
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
    let neLon = req.query.neLon,
      neLat = req.query.neLat,
      swLon = req.query.swLon,
      swLat = req.query.swLat;
    // Generate a key pair for the cache.
    let cacheKey = neLon + " " + neLat + " " + swLon + " " + swLat + " ";
    // Fetch information in the cache.
    let ml = cache.get(cacheKey);
    // If the information could not be found in the cache, perform a database lookup.
    if (!ml) {
      // Database lookup.
      let ml = await db.findAllInRectangle(
        parseFloat(neLon),
        parseFloat(neLat),
        parseFloat(swLon),
        parseFloat(swLat)
      );
      // Store a copy to the cache.
      cache.put(cacheKey, ml);
    }
    res.send(ml);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).end();
  }
});

module.exports = router;
