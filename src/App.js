import React, {useContext, useEffect} from 'react';
import LoginForm from "./loginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import RenameIt from './pages/appBody'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import axios from "axios";
import {API_URL} from "./axiosV2";
import 'antd/dist/antd.css'

const App = () => {
        const {store} = useContext(Context);

        useEffect(() => {
                localStorage.setItem('language', 'uz')
            }, []
        );

        if (store.isLoading) {
            return <div>Загрузка...</div>
        }
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/*" element={<RenameIt/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/registration" element={<LoginForm/>}/>
                    <Route path="/activate" element={<LoginForm/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
;

export default observer(App);
