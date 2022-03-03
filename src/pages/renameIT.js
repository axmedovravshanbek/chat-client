import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import UserService from "../UserService";
import {Routes, useNavigate} from "react-router-dom";
import {Navigate} from "react-router";

const RenameIt = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // getUsers();
        // if (localStorage.getItem('token')) {
        //     store.checkAuth()
        // }
        // if (!store.isAuth) {
        //     navigate('/login');
        // }
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
            {!store.isAuth?<Navigate to='/login'/>:null}
            <h1>{`Пользователь авторизован ${store.user.email}`}</h1>
            <div>{store.isAuth?'tr':'fa'}</div>

            <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
            <button onClick={() => {
                store.logout();
                // navigate('/login')
            }}>Выйти</button>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
        </div>
    );
};

export default observer(RenameIt);
