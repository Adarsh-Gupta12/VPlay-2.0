const Game = require('../models/game.model');

const _ = require('lodash');

//for path of file
const fs = require('fs'); // file system
const { sortBy } = require('lodash');

const Slot = require('../models/slotModel.js');


exports.createSlot = (req, res) =>  {
  const slot = new Slot({
    slotDate: req.body.slotDate,
    email: req.body.email,
    game: req.body.game,
    slotTime: req.body.slotTime,
  });
  console.log(slot);
  
    //To check if user has already booked a slot or not
    const result = await Slot.find(
      {
        slotDate: req.body.slotDate, 
        game: req.body.game,
        email: req.body.email, 
        slotTime: req.body.slotTime
      });
    if(result.length > 0){
      res.send({message: "You have already booked this slot"});
    }
    else{
    //To check if slot is available or not
    const result2 = await Slot.find(
      {
        slotDate: req.body.slotDate, 
        game: req.body.game,
        slotTime: req.body.slotTime
      });
      console.log(result2);
    if(result2.length >= 2 ){
      res.send({message: "Slot is not available"});
    }
    else{

    //booking the slot
  slot.save().then(() => {
    res.send({message: "slot booked"});
  })
  .catch((err) => {
    res.send({message: "error occured, try again later"})
  })
}}
}

exports.createGame = (req, res) => {
  const name = req.body.name;
  const status = req.body.status;

  const newGame = new Game({
    name,
    status,
  });

  newGame
    .save()
    .then(() => {
      res.json('Game added');
    })
    .catch((err) => res.status(400).json('Error:' + err));
};

exports.getGame = (req, res) => {
  Game.findById(req.params.id)
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json('Error:' + err));
};

exports.getAllGames = (req, res) => {
  Game.find()
    .then((game) => res.json(game))
    .catch((err) => res.status(400).json('Error:' + err));
};

exports.deleteGame = (req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .then(() => res.json('Game deleted successfully'))
    .catch((err) => res.status(400).json('Error:' + err));
};

exports.updateGame = (req, res) => {
  Game.findById(req.params.id)
    .then((game) => {
      game.name = req.body.name;
      game.status = req.body.status;

      game
        .save()
        .then(() => res.json('Game has updated succesfully'))
        .catch((err) => res.status(400).json('Error:' + err));
    })
    .catch((err) => res.status(400).json('Error:' + err));
};
