import '../App.css';
import React, { Component, useState, useEffect, useRef, createRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/GitGoblinLogo.png';

function Login () {

    let navigate = useNavigate();

    const [state, setState] = useState({
        username: '',
        password: '',
    })
    
    function updateUsername (username) {
        let newState = Object.assign({}, state);
        newState.username = username;
        setState(newState);
    }

    function goToProjectsPage(username) {
        fetch('http://localhost:3088/login', {
            method: 'POST',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username })
          })
            .then((data)=>data.json())
            .then((data)=>{
                if (data.loggedIn === true){
                    let path = '/projects';
                    navigate(path, {state: {username: state.username}});
                }else{
                    alert("couldn't find user")
                }
            })
        
    }

    function createNewUser(username){
        fetch('http://localhost:3088/create-user', {
            method: 'POST',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username })
          })
            .then((data)=>data.json())
            .then((data)=>{
                if (data.success === true){
                    alert('successful creation, now log in');
                }
            })
    }

    return (
        <div className='pageContainer'>
            <div className='loginContainer'>
                <div className='loginLogo'>
                    <img className='logo-img' src={logo}/>
                </div>
                <div>
                    <a className='gh-login' href='/github'><svg viewBox="0 0 24 24" className="gh-icon"><path fillRule="evenodd" d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path></svg>Log in using github</a>
                </div>
            </div>
        </div>
    )
}

export default Login

// const [render, setRender] = useState(false);

//   function updateUsername(username) {
//     let newState = Object.assign({}, state);
//     newState.username = username;
//     setState(newState);
//   }

//   function goToProjectsPage() {
//     let path = '/projects';
//     navigate(path);
//   }

//   //directs user to sign in with Github and get us the code for our access token.
//   function githubLogin() {
//     window.location.href =
//       'https://github.com/login/oauth/authorize?client_id=80b2e3ee86c7eb7b1145';
//   }
//   useEffect(() => {
//     const queryString = window.location.search; //gets us everything after and including '?' in the url (search will look for href property in particular object it's called on...can select an anchor tag for example and use search on it and it will get us the value of its href)
//     const urlParams = new URLSearchParams(queryString); //allows us to use 'get' method to select particular param from our query string
//     const codeParams = urlParams.get('code');

//     try {
//       if (codeParams && localStorage.getItem('accessToken') === null) {
//         async function getAccessToken() {
//           //LOCAL HOST USES HTTP, NOT HTTPS
//           //if chrome still gives you issues (because it requires https these days), go to https://stackoverflow.com/questions/52677872/localhost-sent-an-invalid-response-for-my-angular-app
//           //and follow the instructions with 25 upvotes by Gerrie Pretorious
//           const tokenRequest = await fetch(
//             'http://localhost:8080/getAccessToken?code=' + codeParams,
//           );

//           const tokenBody = await tokenRequest.json();

//           if (tokenBody.access_token) {
//             localStorage.setItem('accessToken', tokenBody.access_token);
//             setRender(!render);
//           }
//           res.json(data);
//         }
//         getAccessToken();
//       }
//     } catch (e) {
//       return 'Error logging in with GitHub ' + e;
//     }
//   }, []);