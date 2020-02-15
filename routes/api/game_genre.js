const express = require('express');
const router = express.Router();
var client = require('../../config/db');
let GameGenre = require('../../models/GameGenre');
let Game = require('../../models/Game');
let Genre = require('../../models/Genre');

router.get("/", (req, res) => {

  // Return a list of genres with game_id and a list of games with genre_id
  const game_id = req.query["game_id"];
  const genre_id = req.query["genre_id"];

  let where = {};

  if(game_id || genre_id) {
    if(game_id && genre_id) {
      where = {
        [Op.and]: [
          { game_id },
          { genre_id }
        ]
      };
    } else if (game_id) {
      where = {
        game_id
      };
    } else {
      where = {
        genre_id
      };
    }
  } else {
    res.send({ invalid: "Please choose a game_id, or genre_id, or both"});
  }

  try {
    GameGenre.findAll({
      where: where
    }).then(
      function(gamegenres) {
        res.json(gamegenres);
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
  const genre_id = req.header("genre_id");

  if(game_id && genre_id) {
    try {
      const gg = await GameGenre.findOrCreate({
        where: {
          game_id,
          genre_id
        }
      });

      res.json(gg[0]);
    } catch {
      res.send({ error: "Something went wrong" });
    }
  } else {
    res.send({ invalid: "both game_id and genre_id required" });
  }
});

module.exports = router;
