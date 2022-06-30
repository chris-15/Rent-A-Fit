import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import LOGINPHOTO from '../assets/login-photo.svg'


function Signup(props) {
  const [isActive, setIsActive] = useState({
    username: false,
    email: false,
    password: false
  })
  const [formState, setFormState] = useState({ email: '', password: '' });
  
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {

    event.preventDefault();
  
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username
      },
    });
    console.log(formState)
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    
  };

function handleTextChange(name, value) {
  // setValue(text);

  if (value !== '') {
    setIsActive({
      ...isActive,
      [name]: true
    });
  } else {
    setIsActive({
      ...isActive,
      [name]:false
    });
  }
}

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    handleTextChange(name, value)

  };



  return (
    <div className="container my-1 signup-container">
    

    
      
      <form onSubmit={handleFormSubmit} className="signup-form">
    
      <h2>Sign Up</h2>
       

        <div className="flex-row my-2  float-label">
          <label htmlFor="username"></label>
          <input
            name="username"
            type="username"
            id="username"
            value={formState.username}
            onChange={handleChange}
          />
          <label htmlFor='username' className={ isActive.username ? 'Active' : ''}>
          username</label>
        </div>
        <div className="flex-row my-2 float-label">
          
          <input
            
            name="email"
            type="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
          />
          <label htmlFor='email' className={ isActive.email ? 'Active' : ''}>
          youremail@gmail.com</label>
        </div>
        <div className="flex-row my-2 float-label">
         
          <input
            name="password"
            type="password"
            id="pwd"
            value={formState.password}
            onChange={handleChange}
          />
          <label htmlFor='password' className={ isActive.password ? 'Active' : ''}>
          password</label>
        </div>
        {error ? (
          <div>
          <p className='error-text'>Something went wrong.</p>
          </div>
        ): null
        }
        <div className="flex-row my-2 inputs">
          <button type="submit" className='submit-button'>submit</button>
        </div>
        <Link to="/login" className='already-a-user'>Already a User? <span className='login-or-sign-up-link'>Login In</span> </Link>
      </form>
      <div className='login-right'>
      <img alt='sign-up-photo' src={LOGINPHOTO} className='login-right-photo'></img>
      </div>
    </div>
  );
}

export default Signup;
