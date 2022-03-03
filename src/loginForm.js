import React, {useContext, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {Routes, useNavigate} from "react-router";
import $api from "./axiosV2";

const LoginForm = () => {
    const [email, setEmail] = useState('blackburnairfun@gmail.com');
    const [password, setPassword] = useState('axmedov312');
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const handleLogin = () => {
        $api.post('/login', {email, password})
            .then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                store.setAuth(true);
                store.setUser(response.data.user);
                navigate('/')
            })
            .catch(e => console.log(e.response?.data?.message))
    };
    return (
        <div>
            <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder='Email'/>
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Пароль'/>
            <button onClick={handleLogin}>
                Логин
            </button>
            <div>{store.isAuth?'tr':'fa'}</div>

            <button onClick={() => {
                store.registration(email, password);
                navigate('')
            }}>
                Регистрация
            </button>
        </div>
    );
};

export default observer(LoginForm);
