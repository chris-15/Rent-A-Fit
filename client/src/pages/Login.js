import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link ,  Navigate} from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import WELCOMEIMG from '../assets/login.svg'
import { FaChevronLeft} from 'react-icons/fa'
 

function Login(props) {

  const [isActive, setIsActive] = useState({
    email: false,
    password: false
  })

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
     return    <Navigate to='/'></Navigate>
    } catch (e) {
      console.log(e);
    }

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
      
      <h2>Login</h2>
        <div className="flex-row  float-label my-2">
      
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
          <label htmlFor='pwd' className={ isActive.password ? 'Active' : ''}>
          Password</label>
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row my-2 inputs">
          <button type="submit" className='submit-button' >Submit</button>
        </div>
        <Link to="/signup" className='not-a-user'>Not a User? <span className='login-or-sign-up-link'>Sign Up</span> </Link>
      </form>

      <div className='login-right'>
      <img  alt='login' src={WELCOMEIMG} className='login-right-photo'></img>
      </div>
    </div>
  );
}

export default Login;
