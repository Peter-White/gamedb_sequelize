const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const sequelize = require('./config/db');
const { QueryTypes } = require('sequelize');

app.use('/static', express.static('public'))
let ejs = require('ejs');
app.set('view engine', 'ejs');

app.use("/api/company", require("./routes/api/company"));
app.use("/api/genre", require("./routes/api/genre"));
app.use("/api/platform", require("./routes/api/platform"));
app.use("/api/game", require("./routes/api/game"));
app.use("/api/developer", require("./routes/api/developer"));
app.use("/api/publisher", require("./routes/api/publisher"));
app.use("/api/game_platform", require("./routes/api/game_platform"));
app.use("/api/game_genre", require("./routes/api/game_genre"));

app.set('views', path.join(__dirname, 'views'));

router.get('/', async function(req,res) {
  res.render('index.ejs');
});

router.get('/games', async function(req,res) {
  const games = await sequelize.query("SELECT * FROM games", { type: QueryTypes.SELECT });
  res.render('game/index.ejs', { games: games });
});

router.get('/games/:game_id', async function(req,res) {
  let data = {};

  try {
    const game = await sequelize.query(`SELECT * FROM games WHERE id = ${req.params.game_id} LIMIT 1`, { type: QueryTypes.SELECT });

    data = game[0];
  } catch {
    data = { error: "Game not found" };
  }

  res.render('game/details.ejs', { data: data });
});

router.get('/genres', async function(req, res) {
  const genres = await sequelize.query("SELECT * FROM genres", { type: QueryTypes.SELECT });
  res.render('genre/index.ejs', { genres: genres });
});

router.get('/genres/:genre_id', async function(req,res) {
  let data = {};

  try {
    const genre = await sequelize.query(`SELECT * FROM genres WHERE id = ${req.params.genre_id} LIMIT 1`, { type: QueryTypes.SELECT });

    data = genre[0];
  } catch {
    data = { error: "Genre not found" };
  }

  res.render('genre/details.ejs', { data: data });
});

router.get('/post_genre', async function(req, res) {
  res.render('genre/post.ejs');
});

app.use('/', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server has come on port ${PORT}`);
});
