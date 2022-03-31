import React from 'react';
import {AnimateSharedLayout, motion} from "framer-motion";
import {store} from "../js/store";
import {observer} from "mobx-react-lite";

const AuthLangSelect = () => {
    const languages = ['en', 'uz', 'ru'];
    return (
        <div className='flags__container'>
            <AnimateSharedLayout>
                {languages.map((lang) => (
                    <div className='flag' key={lang} onClick={() => store.setLang(lang)}>
                        <img src={`./img/${lang}.svg`} alt={lang} style={{borderRadius: 50, width: 30}}/>
                        {store.lang === lang && <motion.div layoutId="outline" className='flag__outline'/>}
                    </div>
                ))}
            </AnimateSharedLayout>
        </div>
    );
};

export default observer(AuthLangSelect);
