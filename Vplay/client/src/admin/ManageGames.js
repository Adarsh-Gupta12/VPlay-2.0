import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteGame, getAllGames } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';

const ManageGames = () => {
  const [games, setGames] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllGames().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setGames(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisGame = (gameId) => {
    deleteGame(gameId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <div>
      <h2 className='mb-4'>Status Of Games:</h2>
      <div className='container'>
        <div className='row'>
          {games.map((game, index) => {
            return (
              <div
                key={index}
                className='border border-bottom-0 card mb-3 mr-3 text-center col-xs-1'
                style={{ width: '22rem' }}
              >
                <div className='card-body'>
                  <h5 className='card-title font-weight-bold'>{game.name}</h5>
                  <p className='card-text'>Current Status:</p>
                  <h5
                    className={
                      game.status === 'Available'
                        ? 'btn btn-success mb-3'
                        : 'btn btn-danger mb-3'
                    }
                  >
                    {game.status}
                  </h5>
                </div>
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <div className='card-body'>
                    <Link to={`/games/update/${game._id}/${user._id}/`}>
                      <i
                        className='mr-3 far fa-edit fa-lg'
                        style={{ color: 'black' }}
                      ></i>
                    </Link>
                    {/* <button
                      onClick={() => {
                        deleteThisGame(game._id);
                      }}
                    >
                      <i className='fa fa-trash'></i>
                    </button> */}
                    <button
                      onClick={(e) => {
                        if (
                          window.confirm(
                            'Are you sure you wish to delete this item?',
                          )
                        )
                          deleteThisGame(game._id);
                      }}
                    >
                      <i className='fa fa-trash'></i>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManageGames;
