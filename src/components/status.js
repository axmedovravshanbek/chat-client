import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import DateConverter from "./dateConverter";

const Status = ({user}) => {
    const {store} = useContext(Context);

    if (user.typingTo === store.user._id && store.user._id !== undefined) {
        return <h4 style={{color: '#1890FF'}}>typing</h4>
    }
    if (user.isOnline) {
        return <h4 style={{color: '#52C41A'}}>online</h4>
    }
    return (
        <h4 style={{color: '#000000', opacity: 0.7}}>
            <DateConverter d={user.lastOnline} type='hybrid'/>
        </h4>
    );
};

export default observer(Status);
