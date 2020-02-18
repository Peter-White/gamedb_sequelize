const express = require('express');
const router = express.Router();
var client = require('../../config/db');
let GameGenre = require('../../models/GameGenre');
let Game = require('../../models/Game');
let Genre = require('../../models/Genre');

router.get("/", async (req, res) => {

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
    let gg = {};

    let ggQuery = await GameGenre.findAll({
      raw: true,
      where: where
    });

    for (let i in ggQuery) {
      if(where.game_id && where.genre_id) {
        gg = ggQuery[0];
      } else if(where.game_id) {
        if(!gg[ggQuery[i].game_id]) {
          gg[ggQuery[i].game_id] = [];
        }
        let genre = await Genre.findByPk(ggQuery[i].genre_id, { raw: true });
        gg[ggQuery[i].game_id].push(genre);
      } else {
        if(!gg[ggQuery[i].genre_id]) {
          gg[ggQuery[i].genre_id] = [];
        }
        let game = await Game.findByPk(ggQuery[i].game_id, { raw: true });
        gg[ggQuery[i].genre_id].push(game);
      }
    }

    res.json(gg);
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
