import React from 'react';
import {store} from "../js/store";
import {observer} from "mobx-react-lite";
import {Badge, Layout} from 'antd';
import MainHeader from "../components/mainHeader";
import {Link} from "react-router-dom";
import {lang} from "../js/lang";
import Loading from "./loading";
import {MenuUnfoldOutlined} from "@ant-design/icons";
import UserInfo from "../components/userInfo";

const People = ({collapsed, setCollapsed}) => {
    store.socket.emit('typing');
    if (store.users.length < 1) {
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
                {store.users.filter(u => u._id !== store.user?._id).sort((a, b) => {
                    return new Date(b.lastOnline) - new Date(a.lastOnline);
                }).sort((x, y) => {
                    return (x.isOnline === y.isOnline) ? 0 : x.isOnline ? -1 : 1;
                }).map(user =>
                    <Link to={`/chat/${user._id}`} style={{marginBottom: '16px', display: 'block'}} key={user._id}
                          onClick={() => store.setOtherUser(user)}>
                        <div className='content' style={{margin: 0}}>
                            <div className="d-flex">
                                <UserInfo user={user}/>
                                <div style={{display: 'flex', flexGrow: 1, justifyContent: 'flex-end'}}>
                                    <Badge count={store.unread[user._id]}/>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </Layout.Content>
        </Layout>
    );
};

export default observer(People);
