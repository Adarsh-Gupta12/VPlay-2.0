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
  
  //get all bookings
  export const getAllBookings = (email, userId) => {
    return fetch(`/slots/all/${email}/${userId}`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  
//   //get a product
//   export const getSlot = (Id) => {
//     return fetch(`/games/${gameId}`, {
//       method: 'GET',
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .catch((err) => console.log(err));
//   };
  
  //delete slot
  export const deleteSlot = (slotId, userId, token) => {
    return fetch(`/slots/delete/${userId}/${slotId}`, {
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
  
//   //update a game
//   export const updateGame = (userId, token, gameId, updatedGame) => {
//     return fetch(`/games/update/${gameId}/${userId}/`, {
//       method: 'PUT',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(updatedGame),
//     })
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
//   };
  