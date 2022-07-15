const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSlot = new Schema(
    {
      slotDate : {type: String, required: true}, 
      email: { type: String, required: true },
      game: { type: String, required: true },
      slotTime: { type: String, required: true},
    },
    {
      timestamps: true,
    }
  );

const Slot = mongoose.model('Slot', gameSlot);

module.exports = Slot;