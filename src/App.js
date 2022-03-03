import React, {useContext, useEffect, useState} from 'react';
import LoginForm from "./loginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./UserService";

const App = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
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

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
            </div>
        );
    }

    return (
        <div>
            <h1>{`Пользователь авторизован ${store.user.email}`}</h1>
            <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ АККАУНТ!!!!'}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
        </div>
    );
};

export default observer(App);
