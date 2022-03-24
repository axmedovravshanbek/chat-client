import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./js/store";
import './styles/global.scss'
import axios from "axios";
const store = new Store();

export const Context = createContext({store});

ReactDOM.render(
    <Context.Provider value={{store}}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
axios.post('https://locus-back.herokuapp.com/me', {
    deviceWidth: document.body.offsetWidth,
    website: 'Chat',
    empty: ''
}).then(() => null);

