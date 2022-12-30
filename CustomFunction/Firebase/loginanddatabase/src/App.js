import './App.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import Home from './Components/Home';
import Database from './Components/Database';

const firebaseConfig = {
  apiKey: 'AIzaSyDeDmKlMRVrir6S8le_7Iwc0RVNC9eYQ28',
  authDomain: 'loginanddatabase-132d3.firebaseapp.com',
  projectId: 'loginanddatabase-132d3',
  storageBucket: 'loginanddatabase-132d3.appspot.com',
  messagingSenderId: '713946772803',
  appId: '1:713946772803:web:7faa48d1e6d7b01ba4abf6'
};

// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const contextAPI = React.createContext();

function App() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(user);
        console.log(isLogin);
      }
      else {
        setIsLogin(false);
      }
    });

    
    // eslint-disable-next-line
  }, []);

  const check = () => {
    console.log(isLogin);
  }; 

  return (

    <contextAPI.Provider value={ {auth, signInWithEmailAndPassword, signOut, setIsLogin} }>

    <BrowserRouter>
      <div className='app'>
        <div onClick={check}>dasdsadsad</div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/db' element={<Database/>}/>
        </Routes>
      </div>
    </BrowserRouter>

    </contextAPI.Provider>
  );
}

export default App;
