import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./js/store";
import './styles/global.scss'

const store = new Store();

export const Context = createContext({store});

ReactDOM.render(
    <Context.Provider value={{store}}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
