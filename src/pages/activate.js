import React from 'react';
import {lang} from "../js/lang";
import {Link} from "react-router-dom";
import AuthLangSelect from "../components/authLangSelect";
import {store} from "../js/store";
import {observer} from "mobx-react-lite";

const Activate = () => {
    return (
        <div style={{width: '100%', height: '100%'}} className='d-flex column jcc aic'>
            <AuthLangSelect/>
            <img src="../img/MessageSent.svg" className='w300' alt=""/>
            <h1 style={{textAlign: 'center', fontSize: 48}}>{lang.weSentEmail[store.lang]}</h1>
            <h2 style={{textAlign: 'center', margin: '16px 0'}}>{lang.weSentEmail2[store.lang]}</h2>
            <div className='d-flex '>
                {`${lang.or[localStorage.getItem('lang')]} \u00A0`}
                <Link to='/login'>
                    {lang.login[localStorage.getItem('lang')]}
                </Link>
            </div>
        </div>
    );
};

export default observer(Activate);
