import './Home.css';

import { useEffect, useState } from 'react';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDeDmKlMRVrir6S8le_7Iwc0RVNC9eYQ28',
    authDomain: 'loginanddatabase-132d3.firebaseapp.com',
    projectId: 'loginanddatabase-132d3',
    storageBucket: 'loginanddatabase-132d3.appspot.com',
    messagingSenderId: '713946772803',
    appId: '1:713946772803:web:7faa48d1e6d7b01ba4abf6'
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Home = () => {

    // admin@admin.com
    // admin1234

    const [isLogin, setIsLogin] = useState(false);

    const [inputData, setInputData] = useState({
        ID: '',
        PWD: ''
    });

    const onChangeEvent = (event) => {
        setInputData({
            ...inputData,
            [event.target.name] : event.target.value
        })
    };

    const loginEvent = () => {
        signInWithEmailAndPassword(auth, inputData.ID, inputData.PWD)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
    };  

    const logoutEvent = () => {
        signOut(auth).then(() => {
            alert('로그아웃');
        }).catch((error) => {
            console.log(error);
        });
    }; 

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLogin(user);
          }
          else {
            setIsLogin(false);
          }
        });
        console.log(auth);
        console.log(isLogin);
        // eslint-disable-next-line
      }, []);

    return (
        <>
            <div className='loginform'>

                <h1>로그인</h1>

                <div className='input'>
                    <input name='ID' type='text' placeholder='아이디를 입력해주세요' value={inputData.ID} onChange={onChangeEvent}/>
                </div>

                <div className='input'>
                    <input name='PWD' type='password' placeholder='비밀번호를 입력해주세요' value={inputData.PWD} onChange={onChangeEvent}/>
                </div>

                <div className='loginbutton' onClick={loginEvent}> 
                    로그인 
                </div>
                <div className='loginbutton' onClick={logoutEvent}> 
                    로그아웃
                </div>
            </div>
        </>
    )
}

export default Home;