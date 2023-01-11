// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
// import AddSpotComponent from "../AddSpot";
import { useHistory } from "react-router-dom";

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <button onClick={openMenu} className="wholeProfileButton">
      <div className="iconsProfile">
        <span className="hamburger">≡</span>
        <i className="fas fa-user-circle" />
      </div>
      {showMenu && (user ? (
        <ul className="profile-dropdown" >
          <li className="borderYes">{user.username}</li>
          <li className="borderYes">{user.email}</li>
          <li className="borderYes">
            <Link to="/become-a-host" className="navButton">
              <button className="navButton">Become a host</button>
            </Link>
          </li>
          <li className="borderYes">
            <Link to="/spots/current" className="navButton">
              <button className="navButton">Current Spots</button>
            </Link>
          </li>
          <li>
            <button onClick={logout} className="navButton">Log Out</button>
          </li>
        </ul>) :
        (
          <ul className="profile-dropdown2">
            <li className="navButton2">
              <button className="navButton"
                onClick={() => {
                  setLogin(true)
                  setShowModal(true)
                }}>Log In</button>
            </li>
            <li>
              <button className="navButton"
                onClick={() => {
                  setLogin(false)
                  setShowModal(true)
                }}>Sign Up</button>
            </li>
          </ul>)
      )}
    </button>
  );
}

export default ProfileButton;
