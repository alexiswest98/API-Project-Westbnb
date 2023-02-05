// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors([data.message])
        };
      });
  };


  const demoLogin = async (e) => {
    setCredential('Demo-lition')
    setPassword('password');
    await dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
  }

  return (
    <form onSubmit={handleSubmit} className="loginFormModal">
      <div className="logInBorderBott">
        <h4>LogIn</h4>
      </div>
      <div className="inputstoLogIn">
        <h2 className="welcomeText">Welcome to Westbnb</h2>
        <label className="outer-credentials">
          <input className="input-Login" id="input-Login-top"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Username or Email"
          />
        </label>
        <label className="outer-credentials2">
          <input className="input-Login" id="input-Login-bottom"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
      </div>
      <div className="buttons-for-login">
        <button className="log-in-butt" type="submit">Log In</button>
        <button className="log-in-butt" type="submit" onClick={demoLogin} >Demo User</button>
      </div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error} </li>
        ))}
      </ul>
    </form>
  );
}

export default LoginForm;
