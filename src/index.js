import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';

import App from './App';
import './styles/global.scss'

ReactDOM.render(
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
        <App/>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);

/*
axios.post(`https://locus-back.herokuapp.com/me`, {
    deviceWidth: document.body.offsetWidth,
    website: 'Chat',
    empty: ''
}).then(() => null);
*/
