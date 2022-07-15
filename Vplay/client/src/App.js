import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';

import AddGame from './admin/AddGame';
import UpdateGame from './admin/UpdateGame';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Bookslot from './components/BookSlot';
import ManageGames from './admin/ManageGames';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />

        <Route path='/bookslot' exact component={Bookslot} />
        <Route path='/' exact component={ManageGames} />
        <Route path='/addGame' exact component={AddGame} />
        <Route
          path='/games/update/:gameId/:userId/'
          exact
          component={UpdateGame}
        />
        <Route path='/about' exact component={About} />
      </div>
    </Router>
  );
};

export default App;
