import React, {useContext} from 'react';
import {Avatar} from "antd";
import {Context} from "../index";
import {avatarColor} from "../js/converters";
import Status from "./status";
import {observer} from "mobx-react-lite";

const UserInfo = ({user}) => {
    const {store} = useContext(Context);

    return (
        <React.Fragment>
            <Avatar size={48} style={{
                flexShrink: 0,
                backgroundColor: avatarColor(user.email),
                marginRight: 16
            }} src={user.imgSrc}>
                {user.fullName[0].toUpperCase()}
            </Avatar>
            <div className="d-flex jcc column">
                <h2 style={{marginBottom: 8}}>{user.fullName}</h2>
                <Status user={user}/>
            </div>
        </React.Fragment>
    );
};

export default observer(UserInfo);
