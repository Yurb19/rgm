const { Router } = require('express');
const router = Router();

const Games = require('../controllers/games.controller');
const games = new Games();


router.route('/')
  .get(games.getGames)
  .post(games.createGame)
  .put(games.updateGame)
  .delete(games.deleteGame);

router.route('/:_id')
  .get(games.getGame);

module.exports = router;

