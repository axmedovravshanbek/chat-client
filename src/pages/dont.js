import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from "react-router";
import {Context} from "../index";
import axios from "axios";
import {API_URL} from "../axiosV2";
import UserService from "../UserService";
import {observer} from "mobx-react-lite";

const Dont = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);


    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h1>{`Пользователь авторизован ${store.user.email}`}</h1>
            <div>{store.isAuth ? 'tr' : 'fa'}</div>
            <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
            <button onClick={() => {
                store.logout();
                navigate('/login')
            }}>Выйти
            </button>
            {users.map(user =>
                <div key={user.email} style={{display:'flex'}}>
                    <h2>{user.email}</h2>
                    <h3>{user.isActivated?'active':'no'}</h3>
                </div>
            )}
        </div>
    );
};

export default observer(Dont);
