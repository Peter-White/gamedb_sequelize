const express = require('express');
const router = express.Router();
var client = require('../../config/db');
let Genre = require("../../models/Genre");

router.get("/", async (req, res) => {
  Genre.findAll({
    raw: true
  }).then(
    function(genres) {
      res.json(genres);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.get('/:genre_id', async (req, res) => {
  Genre.findByPk(req.params.genre_id).then(
    function(genre) {
      res.json(genre);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.post('/', async (req, res) => {
  const name = req.header("name");

  Genre.findOrCreate({
    where: {
      name: name
    }
  }).then(
    function(genre) {
      res.json(genre[0]);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.delete('/:genre_id', async (req, res) => {
  let genre = await Genre.findByPk(req.params.genre_id);

  if(genre) {
    await genre.destroy().then(
      function(result) {
        res.json({ success: `${genre.name} deleted` });
      },
      function(err) {
        res.json({ failed: "Something went wrong" });
      }
    );
  } else {
    res.json({ error: "Genre not found" });
  }
});

router.put('/:genre_id', async (req, res) => {
  let genre = await Genre.findByPk(req.params.genre_id);
  const name = req.query["name"];

  if(!genre) {
    res.json({ error: "Genre not found" });
  } else if(!name) {
    res.json({ error: "Empty string not allowed" });
  } else {
    try {
      const oldName = genre.name;
      await genre.update({
        name: name
      }).then(
        function(result) {
          res.json({ success: `${oldName} is now ${genre.name}` })
        },
        function(error) {
          res.json({ failed: "Change failed" })
        }
      );
    } catch {
      res.json({ failed: "Everything failed" });
    }
  }
});

module.exports = router;
