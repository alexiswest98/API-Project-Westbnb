// frontend/src/components/Navigation/index.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginForm from '../LoginFormPage/LoginForm';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage';
import logo from './westbnb.png';

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);
  const [search, setSearch] = useState("");
  const path = window.location.pathname;

  // console.log(search)
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

  useEffect(() => {
    if(path !== `/my-results/${search}`) {
      const inputSearch = document.getElementById("right")
      inputSearch.value = '';
    }
  }, [path])

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/my-results/${search}`)
  }

  return (
    <ul className="outerFullNavComplete">
      <li className="fullNav">
        <NavLink exact to="/" className="logo-placement">
          <img src={logo} className="logo" alt='westbnb'></img>
        </NavLink>
        <div className='centerSearchBar'>
          <input type="text" placeholder=" Anywhere (from SF, Miami, Chicago, LA)" className='centerText' id="right" onChange={(e)=> setSearch(e.target.value)}></input>
          <button className='search' onClick={handleSubmit}>
              <div className='circle-search-div'>⬤
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
          </button>
        </div>
        {isLoaded && (<div className='profileButtonFull'>
          <ProfileButton
            setLogin={setLogin}
            setShowModal={setShowModal} />
        </div>
        )}
      </li>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} className="borderRtoModal">
          {login ? <LoginForm setShowModal={setShowModal} /> :
            <SignupFormPage setShowModal={setShowModal} />}
        </Modal>
      )}
    </ul>
  );
}


export default Navigation;
