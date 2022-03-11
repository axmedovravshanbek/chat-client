import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../js/axiosV2";
import People from "./people";
import Chats from "./chats";
import ChatPage from './chatpage'
import {Layout, Menu} from "antd";
import {UploadOutlined, UserOutlined, VideoCameraOutlined,} from '@ant-design/icons';
import io from "socket.io-client";
import AuthLangSelect from "../components/authLangSelect";


const AppBody = () => {
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();
    const {store} = useContext(Context);

    useEffect(() => {
        const socket = io('http://192.168.0.104');
        axios.get(`${API_URL}/refresh`, {withCredentials: true})
            .then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                store.setUser(response.data.user);
                store.setSocket(socket);
                store.socket.emit('imOnline', response.data.user._id);
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
                    store.setUnread(unread.reduce((a, v)=>({ ...a, [v._id]: v.count}), {}));
                });
            })
            .catch(e => {
                console.log(e.response?.data?.message);
                navigate('/login')
            });
        return () => {
            socket.close();
            localStorage.removeItem('token');
            store.setUser({});
            store.setSocket({
                emit: () => {
                }
            });
        }
    }, []);

    return (
        <React.Fragment>
            <Layout className='app_body'>
                <Layout.Sider className='sideR' trigger={null} collapsible collapsed={collapsed}>
                    <div className='side__logo'/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined/>}>
                            <Link to='/'>
                                {store.user?.email}
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
                            <Link to='/people'>
                                {store.user?._id}
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined/>}>
                            <Link to='/s'>
                                nav 3
                            </Link>
                        </Menu.Item>
                        <AuthLangSelect/>
                    </Menu>
                    <button onClick={() => {
                        store.logout();
                        navigate('/login')
                    }}>Выйти
                    </button>
                </Layout.Sider>
                <Routes>
                    <Route exact path='/' element={<People collapsed={collapsed} setCollapsed={setCollapsed}/>}/>
                    <Route exact path='/chat/:id' element={<ChatPage/>}/>
                    <Route exact path='/s' element={<div>csdcsdc</div>}/>
                </Routes>
            </Layout>
            <Outlet/>
        </React.Fragment>
    );
};

export default observer(AppBody);
