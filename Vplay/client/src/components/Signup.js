import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';

import { signup, authenticate, isAuthenticated } from '../auth/helper/index';

const Signup = () => {
    const initialValues = {
		name: "",
		rollno: "",
		email: "",
		password: "",
		confirmPassword: "",
		error: "",
		success: false,
	};

	//States for Signup component
	const [values, setValues] = useState(initialValues);

	//Destructuring the states of the Signup component
	const { name, rollno, email, password, confirmPassword, error, success } = values;

	//Sets data in the states according to the input fields
	const handleChange = (inputValue) => (event) => {
		setValues({
			...values,
			error: false,
			success: false,
			[inputValue]: event.target.value,
		});
	};

    const formSubmit = (event) => {
		event.preventDefault();
        const domain =  email.substr(email.length - 11);
        if(domain !== "@vit.edu.in"){
            setValues({...values, error: "Use Vit Email id"});
			document.getElementById("email").focus()
        }
		else if(name.length < 3){
			setValues({...values, error: "Name must be atleast 2 characters in length"});
			document.getElementById("name").focus()
		} else if(rollno.length != 10){
			setValues({...values, error: "Rollno must be 10 characters in length eg.18102A0014"});
			document.getElementById("rollno").focus()

		}
        else if(email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g) === null){
			setValues({...values, error: "Invalid Email id"});
			document.getElementById("email").focus()

		} else if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/g) === null){
			setValues({...values, error: "Password must be 6 characters long, contain atleast one uppercase, one lowercase letter and a number"});
			document.getElementById("password").focus()

		} else if(password !== confirmPassword){
			setValues({...values, error: "Passwords should match"});
			document.getElementById("confirmPassword").focus()

		} else {
		setValues({ ...values, error: false });
		signup({ name, rollno, email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({ ...initialValues, success: true });
				}
			})
			.catch((err) =>
				console.log("Error: Signup request to the server failed!\n", err)
			);
		//This catch runs whenever there is an error at the backend which is not handle
		}
	};

  //Signup success message popup
	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-center">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						New account was created successfully. Please{" "}
						<Link to="/signin">Login here</Link>
					</div>
				</div>
			</div>
		);
	};

	//Signup error message popup
	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-center">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};


  const signUpForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label>Name</label>
              <input
                onChange={handleChange('name')}
                value={name}
                className='form-control'
                type='text'
                id='name'
              />
            </div>
            <div className='form-group'>
              <label>RollNo</label>
              <input
                onChange={handleChange('rollno')}
                value={rollno}
                className='form-control'
                type='text'
                id='rollno'
              />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input
                onChange={handleChange('email')}
                value={email}
                className='form-control'
                type='email'
                id='email'
              />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    id="password"
                    type="password"
                    className="form-control"
                    onChange={handleChange("password")}
                    value={password.trim()}
                />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    className="form-control"
                    onChange={handleChange("confirmPassword")}
                    value={confirmPassword.trim()}
                />
                <small id="passwordHelpBlock" className="form-text text-light">
                    Must match the password
                </small>
            </div>
            <button onClick={formSubmit} className='btn btn-success btn-block'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      {successMessage}
      {errorMessage()}
      {signUpForm()}
      {/* {JSON.stringify(values)} */}
    </div>
  );
};

export default Signup;
