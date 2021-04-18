const { findByIdAndUpdate } = require('../models/Game.model');
const Games = require('../models/Game.model');

class GameController{

  getGames = async (req, res, next) => {
    try {
      const query = req.query;
      const skip = query.skip ? query.skip : 0;
      const limit = query.limit ? query.limit : 5;

      const games = await Games.find({ status: 'active' }).skip(skip).limit(limit).lean();

      res.status(200).json({
        games
      });
    } catch (error) {
      console.log(error);
    }
  }

  getGame = async (req, res, next) => {
    try {
      const { _id } = req.params;

      const game = await Games.findById(_id);

      res.status(200).json({
        game
      })
    } catch (error) {
      console.log(error);
    }
  }

  createGame = async (req, res, next) => {
    try {
      const data = req.body;

      const newGame = new Games(data);
      await newGame.save();

      res.status(201).json({
        message: 'game created'
      })
    } catch (error) {
      console.log(error);
    }
  }

  updateGame = async (req, res, next) => {
    try {
      const { _id } = req.params;
      const newData = req.body;

      const game = await findByIdAndUpdate(_id, { 
        $set: { ...newData }
      });

      res.status(200).json({
        message: 'game updated'
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteGame = async (req, res, next) => {
    try {
      const { _id } =  req.params;
      
      const deletedGame = Games.findByIdAndUpdate(_id, {
        $set: { status: 'deleted' }
      });
      
      res.status(200).json({
        message: 'game deleted'
      })
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = GameController;