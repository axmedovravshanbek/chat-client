import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";

import AppBody from './pages/appBody'
import SignIn from "./pages/signIn";
import {store} from "./js/store";
import Loading from "./pages/loading";

import 'antd/dist/antd.css'

const App = () => {
    const [vh, setVH] = useState(window.innerHeight);
    window.addEventListener('resize', () => {
        setVH(window.innerHeight)
    });
    return <div style={{height: vh}}>
        {(store.user?.email)
            ? <BrowserRouter>
                <AppBody/>
            </BrowserRouter>
            : <SignIn/>
        }
    </div>
};
export default observer(App);
