import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {store} from "../js/store";
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import People from "./people";
import ChatPage from './chatpage'
import {Avatar, Button, Layout, Menu} from "antd";
import io from "socket.io-client";
import {lang} from "../js/lang";
import {requestForToken} from "../firebase";
// import {useGoogleLogout} from "react-google-login";

const AppBody = () => {
    const navigate = useNavigate();
    const languages = [{lang: 'en', long: 'English'}, {lang: 'uz', long: 'O\'zbekcha'}, {lang: 'ru', long: 'Русский'}];
    const [collapsed, setCollapsed] = useState(true);
   /* const {signOut} = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_ID,
        onLogoutSuccess: () => {
            console.log()
            store.socket.emit('disconnected');
            store.setUser({});
            navigate('/')
        },
        onFailure: (e) => console.log(e)
    });*/
    useEffect(() => {
        requestForToken(store.user?._id);
        const socket = io(process.env.REACT_APP_SERVER_URL);
        store.setSocket(socket);
        socket.on('allUsers', (users) => {
            store.setUsers(users);
        });
        socket.on('myChats', (myChats) => {
            store.setMyChats(myChats);
        });
        socket.on('myMessages', (messages) => {
            store.setMessages(messages);
        });
        socket.on('unreadMessages', (unread) => {
            store.setUnread(unread.reduce((a, v) => ({...a, [v._id]: v.count}), {}));
        });
        socket.emit('imOnline', store.user?._id);
    }, []);

    return (
        <Layout className='app_body'>
            <Layout.Sider className='sideR' trigger={null} collapsible collapsed={collapsed}>
                <div className='side__logo' style={{backgroundImage: `url("${store.user?.imageUrl}")`}}>
                    <h3>{!collapsed && store.user?.givenName}</h3>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[store.lang]}>
                    {languages.map(({lang, long}) => (
                        <Menu.Item key={lang} onClick={() => store.setLang(lang)} icon={
                            <Avatar src={`../img/${lang}.svg`}>
                                {lang}
                            </Avatar>
                        }>
                            <Link to='/'>{long}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
                <Button type='danger' style={{height: 40}} onClick={()=>console.log(515151)}>
                    {lang.logout[store.lang]}
                </Button>
            </Layout.Sider>
            <Routes>
                <Route exact path='/' element={<People collapsed={collapsed} setCollapsed={setCollapsed}/>}/>
                <Route exact path='/chat/:id' element={<ChatPage/>}/>
                <Route path="*" element={<Navigate to='/'/>}/>
            </Routes>
        </Layout>
    );
};

export default observer(AppBody);
