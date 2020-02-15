const express = require('express');
const router = express.Router();
var client = require('../../config/db');
let Game = require("../../models/Game");

router.get("/", async (req, res) => {
  Game.findAll({
    raw: true
  }).then(
    function(games) {
      res.json(games);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.get('/:game_id', async (req, res) => {
  Game.findByPk(req.params.game_id).then(
    function(game) {
      res.json(game);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.post('/', [], async (req, res) => {
  const title = req.header("title");
  const released = req.header("released");
  const mode_id = req.header("mode_id");
  const image_url = req.header("image_url");
  const description = req.header("description");

  Game.create({
    title,
    released,
    mode_id,
    image_url,
    description
  }).then(
    function(game) {
      res.json(JSON.stringify(game));
    },
    function(err) {
      res.json(err)
    }
  );
});

module.exports = router;
