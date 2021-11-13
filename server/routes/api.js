const express = require("express");
const router = express.Router();
// get db connection
const DAO = require("../db/conn");
const db = new DAO();

//parser middleware will parse the json payload
router.use(express.json());

router.get("/", async (req, res) => {
  // console.log(req.body);
  // res.sendStatus(201).end();
  try {
    let ml = await db.findAll();
    res.send(ml);
  } catch (e) {
    console.error(e.message);
    res.sendStatus(500).end();
  }
});

module.exports = router;
