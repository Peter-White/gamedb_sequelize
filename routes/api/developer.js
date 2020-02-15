const express = require('express');
const router = express.Router();
var client = require('../../config/db');
const { Op, QueryTypes } = require("sequelize");
let Developer = require("../../models/Developer");

router.get("/", (req, res) => {

  const game_id = req.query["game_id"];
  const company_id = req.query["company_id"];

  let where = {};

  if(game_id || company_id) {
    if(game_id && company_id) {
      where = {
        [Op.and]: [
          { game_id },
          { company_id }
        ]
      };
    } else if (game_id) {
      where = {
        game_id
      };
    } else {
      where = {
        company_id
      };
    }
  } else {
    res.send({ invalid: "Please choose a game_id, or company_id, or both"});
  }

  try {
    Developer.findAll({
      where: where
    }).then(
      function(developers) {
        res.json(developers);
      },
      function(err) {
        res.json(err);
      }
    );
  } catch {
    res.send({ error: "Something went wrong" });
  }
});

router.post('/', async (req, res) => {
  const game_id = req.header("game_id");
  const company_id = req.header("company_id");

  if(game_id && company_id) {    
    try {
      const dev = await Developer.findOrCreate({
        where: {
          game_id,
          company_id
        }
      });

      res.json(dev[0]);
    } catch {
      res.send({ error: "Something went wrong" });
    }
  } else {
    res.send({ invalid: "both game_id and company_id required" });
  }
});

module.exports = router;
