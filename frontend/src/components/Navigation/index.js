// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../LoginFormPage/LoginForm';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage';
import logo from './westbnb.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <ProfileButton className="profileButton" user={sessionUser} />
  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }

  return (
    <ul>
      <li className="fullNav">
        <NavLink exact to="/" className="logo-placement">
          <img src={logo} className="logo" alt='westbnb'></img>
        </NavLink>
        {isLoaded && (<div className="profileNav">
          <ProfileButton user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal} />
        </div>
        )}
      </li>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {login ? <LoginForm setShowModal={setShowModal} /> :
            <SignupFormPage setShowModal={setShowModal} />}
        </Modal>
      )}
    </ul>
  );
}


export default Navigation;
