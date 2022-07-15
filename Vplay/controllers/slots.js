import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Slot from '../models/slotModel.js';

const slotRouter = express.Router();


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

exports.getSlot = (req, res) => {
  Slot.find()
    .then((slot) => res.json(slot))
    .catch((err) => res.status(400).json("Error:" + err));
};

exports.deleteSlot = (req, res) => {
  Slot.findByIdAndDelete(req.params.id)
  .then(() => res.json("Slot deleted"))
  .catch((err) => {res.status(400).json("Error: " +err)
    console.log("Yes");
}
  );
}