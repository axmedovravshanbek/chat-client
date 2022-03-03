import React, {useContext, useEffect} from 'react';
import LoginForm from "./loginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import RenameIt from './pages/renameIT'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

const App = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        // if (localStorage.getItem('token')) {
        //     store.checkAuth()
        // }
        // if (!store.isAuth) {
        //     navigate('/login');
        // }
    }, []);

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={store.isAuth ? <RenameIt/> : <Navigate to='/login'/>}/>
                <Route path="/login" element={<LoginForm/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default observer(App);
