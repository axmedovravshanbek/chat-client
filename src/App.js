import React, {useContext} from 'react';
import LoginForm from "./pages/loginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import RenameIt from './pages/appBody'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import 'antd/dist/antd.css'
import RegisterForm from "./pages/registerForm";
import Activate from "./pages/activate";
import io from 'socket.io-client'

const socket = io("http://localhost");

const App = () => {
        const {store} = useContext(Context);
        store.setSocket(socket);


        if (store.isLoading) {
            return <div>Загрузка...</div>
        }
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/*" element={<RenameIt/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/registration" element={<RegisterForm/>}/>
                    <Route path="/activate" element={<Activate/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
;

export default observer(App);
