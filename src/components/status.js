import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import DateConverter from "./dateConverter";
import {lang} from "../js/lang";

const Status = ({user}) => {
    const {store} = useContext(Context);

    if (user.typingTo === store.user._id && store.user._id !== undefined) {
        return <h4 style={{color: '#1890FF'}}>{lang.typing[store.lang]}</h4>
    }
    if (user.isOnline) {
        return <h4 style={{color: '#52C41A'}}>{lang.online[store.lang]}</h4>
    }
    return (
        <h4 style={{color: '#000000', opacity: 0.7}}>
            {lang.lastSeen[store.lang]}
            <DateConverter d={user.lastOnline} type='hybrid'/>
        </h4>
    );
};

export default observer(Status);
