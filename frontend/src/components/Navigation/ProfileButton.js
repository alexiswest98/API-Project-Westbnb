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
    <div className="wholeNav">
      <button onClick={openMenu} className="profileMenu"> 
        <span className="hamburger">≡</span>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (user ? (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <Link to="/become-a-host">
              <button className="navButton">Become a host</button>
            </Link>
          </li>
          <li>
            <Link to="/spots/current">
              <button className="navButton">Current Spots</button>
            </Link>
          </li>
          <li>
            <button onClick={logout} className="navButton">Log Out</button>
          </li>
        </ul>) :
        (
          <ul className="profile-dropdown-normal">
            <li>
              <button onClick={() => {
                setLogin(true)
                setShowModal(true)
              }}>Log In</button>
            </li>
            <li>
              <button onClick={() => {
                setLogin(false)
                setShowModal(true)
              }}>Sign Up</button>
            </li>
          </ul>)
      )}
    </div>
  );
}

export default ProfileButton;
