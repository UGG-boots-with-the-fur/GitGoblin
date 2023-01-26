import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/GitGoblinLogo.png';

function Navbar (props) {

  let navigate = useNavigate();

  function logout(){
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/login')
  }

  function navHome(){
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/')
  }

  const location = useLocation();

  if(location.pathname !== '/login'){
    return (
      <div className='navbar'>
        <button className="homeButton" onClick={navHome}>Git Goblin</button>
        <button className="logoutButton" onClick={logout}>Logout</button>
      </div>
    )
  } else {
    return (
      <div className='navbar'>
        <button className="homeButton" onClick={navHome}>Git Goblin</button>
      </div>
    )
  }

}

export default Navbar