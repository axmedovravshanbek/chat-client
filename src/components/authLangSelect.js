import React, {useContext, useState} from 'react';
import {motion, AnimateSharedLayout} from "framer-motion";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import s from '../styles/LangSelector.module.css'

const AuthLangSelect = () => {
    const {store} = useContext(Context);
    const langs = [
        {
            lang: 'en',
            flag: './img/en.svg'
        },
        {
            lang: 'uz',
            flag: './img/uz.svg'
        },
        {
            lang: 'ru',
            flag: './img/ru.svg'
        }
    ];
    return (
        <div className={s.container}>
            <AnimateSharedLayout>
                {langs.map(({lang, flag}) => (
                    <div className={s.flag} key={lang} onClick={() => store.setLang(lang)}>
                        <img src={flag} alt="" style={{borderRadius: 50, width:30}}/>
                        {store.lang === lang && (
                            <motion.div layoutId="outline" className={s.flagOutline}/>
                        )}
                    </div>
                ))}
            </AnimateSharedLayout>
        </div>
    );
};

export default observer(AuthLangSelect);
