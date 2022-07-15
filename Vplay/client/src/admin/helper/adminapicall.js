//add a game
export const addNewGame = (userId, token, game) => {
  return fetch(`/games/add/${userId}/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(game),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all games
export const getAllGames = () => {
  return fetch('/games/', {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a product
export const getGame = (gameId) => {
  return fetch(`/games/${gameId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete game
export const deleteGame = (gameId, userId, token) => {
  return fetch(`/games/delete/${gameId}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update a game
export const updateGame = (userId, token, gameId, updatedGame) => {
  return fetch(`/games/update/${gameId}/${userId}/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedGame),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

//add a slot
export const addNewSlot = (userId, token, slot) => {
  console.log(JSON.stringify(slot));
  return fetch(`/slots/add/${userId}/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(slot),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};