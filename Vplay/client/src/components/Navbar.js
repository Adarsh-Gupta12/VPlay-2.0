import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';

const Navbar = ({ history }) => {
  return (
    <nav className='navbar navbar-dark bg-primary navbar-expand-lg'>
      <Link to='/' className='navbar-brand'>
        <h3 className='text-dark'>V-Play</h3>
      </Link>
      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav ml-auto'>
          <li className='navbar-item'>
            <Link to='/' className='nav-link'>
              <h5 className='text-dark'>Games List</h5>
            </Link>
          </li>
          <li className='navbar-item mr-3 ml-3'>
            <Link to='/about' className='nav-link'>
              <h5 className='text-dark'>About</h5>
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className='navbar-item'>
              <Link to='/addGame' className='nav-link'>
                <h5 className='text-dark'>Add Game</h5>
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <li className='navbar-item'>
              <Link className='nav-link' to='/signin'>
                <h5 className='text-dark'>Signin</h5>
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <li className='navbar-item'>
              <Link className='nav-link' to='/signup'>
                <h5 className='text-dark'>Signup</h5>
              </Link>
            </li>
          )}
          {isAuthenticated() && (
            <li className='navbar-item'>
              <Link className='nav-link' to='/bookslot'>
                <h5 className='text-dark'>Book slot</h5>
              </Link>
            </li>
          )}
          {isAuthenticated() && (
            <li className='navbar-item'>
              <span
                className='nav-link'
                onClick={() => {
                  signout(() => {
                    history.push('/');
                  });
                }}
              >
                <h5 className='text-dark'>Signout</h5>
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
