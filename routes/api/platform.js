const express = require('express');
const router = express.Router();
var client = require('../../config/db');
let Platform = require("../../models/Platform");
let Company = require("../../models/Company");

router.get("/", (req, res) => {
  Platform.findAll({
    raw: true
  }).then(
    function(platforms) {
      res.json(platforms);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.get('/:platform_id', async function (req, res) {
  Platform.findByPk(req.params.platform_id, {
    raw:true
  }).then(
    async function(platform) {
      platform.manufacturer = await Company.findByPk(platform.manufacturer_id, {
         raw: true,
         attributes: ['id', 'name']
       });
      delete platform.manufacturer_id;

      res.json(platform);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.post('/', async (req, res) => {
  const title = req.header("title");
  const released = req.header("released");
  const discontinued = req.header("discontinued");
  const manufacturer_id = req.header("manufacturer_id");
  const image_url = req.header("image_url");
  const description = req.header("description");

  try {
    const platform = await Platform.create({
      title,
      released,
      discontinued,
      manufacturer_id,
      image_url,
      description
    });

    res.json(platform);
  } catch {
    res.json({ error: "Something went wrong" });
  }
});

module.exports = router;
