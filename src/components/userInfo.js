import React from 'react';
import {Avatar} from "antd";
import Status from "./status";
import {observer} from "mobx-react-lite";

const UserInfo = ({user}) => {
    return (
        <React.Fragment>
            <Avatar size={48} style={{
                flexShrink: 0,
                marginRight: 16
            }} src={user.imageUrl}/>
            <div className="d-flex jcc column">
                <h2 style={{marginBottom: 8}}>{`${user.givenName} ${user.familyName}`}</h2>
                <Status user={user}/>
            </div>
        </React.Fragment>
    );
};

export default observer(UserInfo);
