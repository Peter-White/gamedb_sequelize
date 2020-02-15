const express = require('express');
const router = express.Router();
var client = require('../../config/db');
let GamePlatform = require('../../models/GamePlatform');

router.get("/", (req, res) => {

  const game_id = req.query["game_id"];
  const platform_id = req.query["platform_id"];

  let where = {};

  if(game_id || platform_id) {
    if(game_id && platform_id) {
      where = {
        [Op.and]: [
          { game_id },
          { platform_id }
        ]
      };
    } else if (game_id) {
      where = {
        game_id
      };
    } else {
      where = {
        platform_id
      };
    }
  } else {
    res.send({ invalid: "Please choose a game_id, or platform_id, or both"});
  }

  try {
    GamePlatform.findAll({
      where: where
    }).then(
      function(gameplatforms) {
        res.json(gameplatforms);
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
  const platform_id = req.header("platform_id");

  if(game_id && platform_id) {
    try {
      const gp = await GamePlatform.findOrCreate({
        where: {
          game_id,
          platform_id
        }
      });

      res.json(gp[0]);
    } catch {
      res.send({ error: "Something went wrong" });
    }
  } else {
    res.send({ invalid: "both game_id and platform_id required" });
  }
});

module.exports = router;
