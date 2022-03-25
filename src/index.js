import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './styles/global.scss'
// import axios from "axios";

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
// axios.post(`https://locus-back.herokuapp.com/me`, {
//     deviceWidth: document.body.offsetWidth,
//     website: 'Chat',
//     empty: ''
// }).then(() => null);

