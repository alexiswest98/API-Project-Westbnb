// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      let signErrors = [];
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .then(() => setShowModal(false))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            if (Array.isArray(data.errors)) {
              signErrors.push(data.errors)
              setErrors(...signErrors)
            } else {
              signErrors.push(data.errors)
              setErrors(signErrors)
            }
          }
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <form className='SignUpModal' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
        <div className="logInBorderBott">
          <h4>Sign Up</h4>
        </div>
        <div className="inputstoSignUp">
        <h2 className="welcomeText">Welcome to Airbnb</h2>
        <label className="outer-credentials-su">
          <input className="input-signUp" id="input-Login-top"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name required"
          />
        </label>
        <label className="outer-credentials-su">
          <input className="input-signUp"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name required"
          />
        </label>
        <label className="outer-credentials-su">
          <input className="input-signUp"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email required"
          />
        </label>
        <label className="outer-credentials-su">
          <input className="input-signUp"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username required"
          />
        </label>
        <label className="outer-credentials-su">
          <input className="input-signUp"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password required"
          />
        </label>
        <label className="outer-credentials-su">
          <input className="input-signUp" id="input-Login-bottom"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </label>
        </div>
        <div className="buttons-for-login">
        <button type="submit" className="log-in-butt">Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormPage;
