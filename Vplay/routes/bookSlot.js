//real one
const express = require('express');
const router = express.Router();

const {
  createSlot,
  getSlot,
  deleteSlot
} = require('../controllers/slots');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');

//all of params
router.param('userId', getUserById);

//all of the actual routes

// create route
router.post('/add/:userId', isSignedIn, isAuthenticated, createSlot);

//get single slot by email
router.get('/:id/:email', getSlot);

//delete route
router.delete(
  '/delete/:id/:userId',
  isSignedIn,
  isAuthenticated,
  deleteSlot,
);

module.exports = router;