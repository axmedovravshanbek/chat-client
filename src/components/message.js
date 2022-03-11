import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import DateConverter from "./dateConverter";

const Message = ({my, msg}) => {
    const {store} = useContext(Context);
    return (
        <div className={`${my ? 'my ' : ''}message`}>
            <h4>{msg.msgContent}</h4>
            {/*<h4>{msg.room}</h4>*/}
            <div className="d-flex f-end" style={{marginTop: 8}}>
                <div className="message__time"><DateConverter d={msg.sentTime} type='clock'/></div>
                {my && <img src={`../img/d${msg.deliveryStatus}.svg`} alt={msg.deliveryStatus}/>}
            </div>
        </div>
    );
};

export default observer(Message);
