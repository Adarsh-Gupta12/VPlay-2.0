import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper/index';
import { getGame, updateGame } from './helper/adminapicall';

const UpdateGame = ({ match, history }) => {
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

  const preload = (gameId) => {
    setLoading(true);
    getGame(gameId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setName(data.name);
          setStatus(data.status);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload(match.params.gameId);
  }, []);

  const onChangeName = (e) => setName(e.target.value);

  const onChangeStatus = (e) => setStatus(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    //Backend request fired
    updateGame(user._id, token, match.params.gameId, { name, status })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError('');
          setLoading(false);
          setSuccess(true);
        }
      })
      .catch((err) => console.log('Error in formSubmit!', err));
  };

  //Success message popup
  const successMessage = () => {
    if (success) {
      return <h4 className='text-success'>Game Updated Successfully</h4>;
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
          <input
            type='submit'
            value='Update Game'
            className='btn btn-success'
          />
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

export default UpdateGame;
