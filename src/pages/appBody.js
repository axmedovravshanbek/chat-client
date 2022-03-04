import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import UserService from "../UserService";
import {Routes, Route, useNavigate, Outlet} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../axiosV2";
import Dont from "./dont";

const AppBody = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        store.setLoading(false);
        getUsers();
        axios.get(`${API_URL}/refresh`, {withCredentials: true})
            .then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                store.setAuth(true);
                store.setUser(response.data.user);
                if (!response.data.user.isActivated) {
                    navigate('/activate')
                }
            })
            .catch(e => {
                console.log(e.response?.data?.message);
                navigate('/login')
            })
            .finally(() => {
                store.setLoading(false);
            })
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
            <Routes>
                <Route exact path='/' element={<Dont/>}/>
                <Route exact path='/s' element={<div>csdcsdc</div>}/>
            </Routes>
            <Outlet/>
        </div>
    );
};

export default observer(AppBody);
