const express = require('express');
const router = express.Router();
var client = require('../../config/db');
let Mode = require("../../models/Mode");

router.get("/", (req, res) => {
  console.log("Modes called");
  Mode.findAll({
    raw: true
  }).then(
    function(modes) {
      res.json(modes);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.get("/:mode_id", (req, res) => {
  Mode.findByPk(req.params.mode_id).then(
    function(mode) {
      res.json(mode);
    },
    function(err) {
      res.json(err)
    }
  );
});

module.exports = router;
