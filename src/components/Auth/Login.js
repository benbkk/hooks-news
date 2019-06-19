import React, { useState } from "react";
import { Link } from 'react-router-dom';
import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'
import firebase from '../../firebase'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
}

function Login(props) {
  const { 
    handleSubmit,
    handleChange,
    values,
    handleBlur,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)
  const [login, setLogin] = useState(true)
  const [firebaseError, setFirebaseError] = useState(null)
  
  async function authenticateUser() {
    const { name, email, password } = values
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password)
      props.history.push('/')
    } catch (err) {
      console.error('Authentication Failed', err)
      setFirebaseError(err.message)
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form
        className="flex flex-column"
        onSubmit={handleSubmit}
      >
        {!login && (
          <input 
            type="text"
            value={values.name}
            placeholder="Your name"
            autoComplete="off"
            name="name"
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          className={errors.email && 'error-input'}
          placeholder="Your email"
          value={values.email}
          autoComplete="off"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="password"
          className={errors.password && 'error-input'}
          placeholder="Choose a secure password"
          name="password"
          values={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button 
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{
              background: isSubmitting ? 'grey' : 'orange'
            }}
          >
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </form>
      <Link
        className="forgot-password"
        to="forgot">
        Forgot password?
      </Link>
    </div>
  );
}

export default Login;
