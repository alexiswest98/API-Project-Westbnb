// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton className="profileButton" user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <span className="logInButtons">
        <LoginFormModal />
        <SignUpFormModal />
      </span>
    );
  }

  return (
    <ul>
      <div>
        <NavLink className="logo" exact to="/">Westbnb</NavLink>
        {isLoaded && sessionLinks}
      </div>
    </ul>
  );
}

export default Navigation;
