const express = require('express');
const router = express.Router();
var client = require('../../config/db');
let Company = require("../../models/Company");

router.get("/", (req, res) => {
  Company.findAll({
    raw: true
  }).then(
    function(companies) {
      res.json(companies);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.get('/:company_id', (req, res) => {
  Company.findByPk(req.params.company_id).then(
    function(company) {
      res.json(company);
    },
    function(err) {
      res.json(err)
    }
  );
});

router.post('/', [], async (req, res) => {
  const name = req.header("name");
  const address = req.header("address");
  const founded = req.header("founded");
  const discontinued = req.header("discontinued");
  const description = req.header("description");
  const image_url = req.header("image_url");

  try {
    const company = await Company.create({
      name,
      address,
      founded,
      discontinued,
      description,
      image_url
    });

    console.log(company);

    res.json(company);
  } catch {
    res.json({ error: "Something went wrong" });
  }
});

module.exports = router;
