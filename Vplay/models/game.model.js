const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: true,
    },
    status: {
      type: String,
      default: 'Available',
      enum: ['Unavailable', 'Available'],
    },
  },
  {
    timestamps: true,
  },
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
