//real one
const express = require('express');
const router = express.Router();

const {
  createGame,
  getGame,
  getAllGames,
  deleteGame,
  updateGame,
  createSlot,
} = require('../controllers/games');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/admin');

//all of params
router.param('userId', getUserById);

//all of the actual routes

// create route
router.post('/add/:userId', isSignedIn, isAuthenticated, isAdmin, createGame);

router.post('/add/:userId', isSignedIn, isAuthenticated, createSlot);

//get single game by ID
router.get('/:id', getGame);
//listing route for all games
router.get('/', getAllGames);

//delete route
router.delete(
  '/delete/:id/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteGame,
);

//update route
router.put(
  '/update/:id/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateGame,
);

module.exports = router;
