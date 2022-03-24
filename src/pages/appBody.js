import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Link, Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import {API_URL} from "../js/axiosV2";
import People from "./people";
import ChatPage from './chatpage'
import {Avatar, Button, Layout, Menu} from "antd";
import io from "socket.io-client";
import axios from "axios";
import {lang} from "../js/lang";


const AppBody = () => {
    const languages = [{lang: 'en', long: 'English'}, {lang: 'uz', long: 'O\'zbekcha'}, {lang: 'ru', long: 'Русский'}];
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();
    const {store} = useContext(Context);
    useEffect(() => {
        // const socket = io('http://192.168.0.104');
        const socket = io('https://airfun-b.herokuapp.com');
        axios.get(`${API_URL}/refresh`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                localStorage.setItem('token', response.data.refreshToken);
                store.setUser(response.data.user);
                store.setSocket(socket);
                store.socket.emit('imOnline', store.user?._id);
                if (!response.data.user.isActivated) {
                    navigate('/activate')
                }

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
            })
            .catch(e => {
                console.log(e.response);
                navigate('/login')
            });
        // return () => {
        //     socket.close();
        //     localStorage.removeItem('token');
        //     store.setUser({});
        //     store.setSocket({
        //         emit: () => {
        //         }
        //     });
        // }
    }, []);

    return (
        <React.Fragment>
            <Layout className='app_body'>
                <Layout.Sider className='sideR' trigger={null} collapsible collapsed={collapsed}>
                    <div className='side__logo' style={{backgroundImage: `url("${store.user?.imgSrc}")`}}>
                        <h3>{!collapsed && store.user?.fullName}</h3>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[store.lang]}>
                        {languages.map(({lang, long}) => (
                            <Menu.Item key={lang} onClick={() => store.setLang(lang)} icon={
                                <Avatar style={{
                                    backgroundColor: '#FF0000',
                                }} src={`../img/${lang}.svg`}>
                                    {lang}
                                </Avatar>
                            }>
                                <Link to='/'>
                                    {long}
                                </Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                    <Button type='danger' style={{height: 40}} onClick={() => {
                        store.logout();
                        store.socket.emit('disconnected');
                        navigate('/login')
                    }}>
                        {lang.logout[store.lang]}
                    </Button>
                </Layout.Sider>
                <Routes>
                    <Route exact path='/' element={<People collapsed={collapsed} setCollapsed={setCollapsed}/>}/>
                    <Route exact path='/chat/:id' element={<ChatPage/>}/>
                    <Route path="*" element={<Navigate to='/'/>} />
                </Routes>
            </Layout>
            <Outlet/>
        </React.Fragment>
    );
};

export default observer(AppBody);
