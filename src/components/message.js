import React from 'react';
import DateConverter from "./dateConverter";

const Message = ({my, msg}) => {
    return (
        <div className={`${my ? 'my ' : ''}message`}>
            <h4>{msg.msgContent}</h4>
            <div className="d-flex f-end" style={{marginTop: 8}}>
                <div className="message__time"><DateConverter d={msg.sentTime} type='clock'/></div>
                {my && <img src={`../img/d${msg.deliveryStatus}.svg`} alt={msg.deliveryStatus}/>}
            </div>
        </div>
    );
};

export default Message;
