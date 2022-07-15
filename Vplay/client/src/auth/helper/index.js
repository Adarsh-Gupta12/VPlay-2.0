//Send user signup data to the backend
export const signup = (user) => {
	return fetch('/api/signup', {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

//Send user user: {email, password} data to the backend and creates "JWT token" and sets Cookie
//Then if signin is successful returns "JWT token" and "user data" which will be set to localStorage at the frontend
export const signin = (user) => {
  return fetch('/api/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Called after signin succeeds to save the response "JWT token" & "user data" to the localStorage of client's browser
export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

//First : It removes jwt token set in the localStorage of browser
//Second : "next()" is used to fire a callback which will be used in frontend to redirect
//Third : fetch sends a "GET" req to the backend which clears the "Cookie" at backend thereby signout the user from tha backend
export const signout = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
    next();

    return fetch('/api/signout', {
      method: 'GET',
    })
      .then((response) => console.log('signout success'))
      .catch((err) => console.log(err));
  }
};

//It check wheather the client's browser localStorage contains JWT token and user data as a key "jwt"
export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};

export const getUser = (userId, token) => {
	return fetch(`/api/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "applicaion/json",
			"Content-Type": "applicaion/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};