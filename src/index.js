import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

import App from './App';
import './styles/global.scss'

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
axios.post(`https://locus-back.herokuapp.com/me`, {
    deviceWidth: document.body.offsetWidth,
    website: 'Chat',
    empty: ''
}).then(() => null);
