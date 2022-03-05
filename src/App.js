import React, {useContext, useState} from 'react';
import LoginForm from "./pages/loginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import RenameIt from './pages/appBody'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'antd/dist/antd.css'
import RegisterForm from "./pages/registerForm";
import Activate from "./pages/activate";
import io from 'socket.io-client'

const socket = io('http://192.168.0.104');

const App = () => {
    const [vh, setVH] = useState(window.innerHeight);
    const {store} = useContext(Context);
    store.setSocket(socket);

    window.addEventListener('resize', () => {setVH(window.innerHeight)});
    if (store.isLoading) {
        return <div>Загрузка...</div>
    }
    return (
        <div style={{height: vh}}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/*" element={<RenameIt/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/registration" element={<RegisterForm/>}/>
                    <Route path="/activate" element={<Activate/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default observer(App);
