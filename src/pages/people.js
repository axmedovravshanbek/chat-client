import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Avatar, Badge, Layout} from 'antd';
import MainHeader from "../components/mainHeader";
import {Link} from "react-router-dom";
import {lang} from "../js/lang";
import Status from "../components/status";
import Loading from "./loading";
import {avatarColor} from "../js/converters";
import {MenuUnfoldOutlined} from "@ant-design/icons";
import UserInfo from "../components/userInfo";

const People = ({collapsed, setCollapsed}) => {
    const {store} = useContext(Context);
    store.socket.emit('typing');
    if (store.user?._id === undefined) {
        return (
            <Loading/>
        )
    }
    return (
        <Layout>
            <MainHeader>
                <MenuUnfoldOutlined className='side__trigger' onClick={() => setCollapsed(!collapsed)}/>
                <h1 style={{lineHeight: '64px'}}>{lang.people[store.lang]}</h1>
            </MainHeader>
            <Layout.Content className='content overflowY' style={{padding: 0, backgroundColor: '#00000000'}}>
                {store.users.filter(u => u._id !== store.user?._id).map(user =>
                    <Link to={`/chat/${user._id}`} style={{marginBottom: '16px', display: 'block'}} key={user._id}
                          onClick={() => store.setOtherUser(user)}>
                        <div className='content' style={{margin: 0}}>
                            <div className="d-flex">
                                <UserInfo user={user}/>
                                <Badge count={store.unread[user._id]}/>
                            </div>
                        </div>
                    </Link>
                )}
            </Layout.Content>
        </Layout>
    );
};

export default observer(People);
