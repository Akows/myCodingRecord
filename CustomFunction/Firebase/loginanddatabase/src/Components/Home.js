import './Home.css';

import { useContext, useState } from 'react';
import { contextAPI } from '../App';

const Home = () => {

    // admin@admin.com
    // admin1234

    const context = useContext(contextAPI);

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
        context.signInWithEmailAndPassword(context.auth, inputData.ID, inputData.PWD)
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
        context.signOut(context.auth)
        .then(() => {
            alert('로그아웃');
        })
        .catch((error) => {
            console.log(error);
        });
    }; 

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