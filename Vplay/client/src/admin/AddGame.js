import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { isAuthenticated } from '../auth/helper/index';
import { addNewGame } from './helper/adminapicall';

const AddGame = () => {
  const { user, token } = isAuthenticated();

  const goBackButton = () => {
    return (
      <div>
        <Link className='btn btn-info rounded' to='/'>
          Home
        </Link>
      </div>
    );
  };

  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const statusOptions = ['Available', 'Unavailable'];

  const preload = () => {
    setStatus('Available');
  };

  useEffect(() => {
    preload();
  }, []);

  const onChangeName = (e) => setName(e.target.value);

  const onChangeStatus = (e) => setStatus(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    const game = {
      name: name,
      status: status,
    };

    console.log(game);

    addNewGame(user._id, token, game)
      .then(() => {
        setName('');
        setStatus('Available');
        setError('');
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => console.log(err));
  };

  //Success message popup
  const successMessage = () => {
    if (success) {
      return <h4 className='text-success'>Game Added!</h4>;
    }
  };

  //Error message popup
  const errorMessage = () => {
    if (error) {
      return (
        <div className='text-danger'>
          <h4>Collection Updation Failed!</h4>
          <p>{error}</p>
        </div>
      );
    }
  };

  const loadingMessage = () => {
    if (loading) {
      return <h4 className='text-info'>Loading...</h4>;
    }
  };

  const createGameForm = () => (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Status: </label>
          <select
            required
            className='form-control'
            value={status}
            onChange={onChangeStatus}
          >
            {statusOptions.map((o) => {
              return (
                <option key={o} value={o}>
                  {o}
                </option>
              );
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Name: </label>
          <input
            type='text'
            required
            className='form-control'
            value={name}
            onChange={onChangeName}
          />
        </div>

        <div className='form-group'>
          <input type='submit' value='Add Game' className='btn btn-success' />
        </div>
      </form>
    </div>
  );

  return (
    <div className='row rounded'>
      <div className='col-md-2'>{goBackButton()}</div>
      <div className='col-md-8 my-3'>
        {successMessage()}
        {createGameForm()}

        {errorMessage()}
        {loadingMessage()}
      </div>
    </div>
  );
};

export default AddGame;
