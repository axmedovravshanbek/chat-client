import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import AppBody from './pages/appBody'
import Activate from "./pages/activate";
import LoginForm from "./pages/loginForm";
import RegisterForm from "./pages/registerForm";

import 'antd/dist/antd.css'

const App = () => {
    const [vh, setVH] = useState(window.innerHeight);
    window.addEventListener('resize', () => {
        setVH(window.innerHeight)
    });

    return (
        <div style={{height: vh}}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/*" element={<AppBody/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/registration" element={<RegisterForm/>}/>
                    <Route path="/activate" element={<Activate/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
