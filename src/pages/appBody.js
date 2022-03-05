import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Link, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../components/axiosV2";
import Dont from "./dont";
import ChatPage from './chatpage'
import {Layout, Menu} from "antd";
import s from '../styles/Home.module.css'
import {UploadOutlined, UserOutlined, VideoCameraOutlined,} from '@ant-design/icons';

const {Sider} = Layout;

const AppBody = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {store} = useContext(Context);

    useEffect(() => {
        store.socket.emit('user_online', store.user._id);
        axios.get(`${API_URL}/refresh`, {withCredentials: true})
            .then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                store.setAuth(true);
                store.setUser(response.data.user);
                if (!response.data.user.isActivated) {
                    navigate('/activate')
                }
            })
            .catch(e => {
                console.log(e.response?.data?.message);
                navigate('/login')
            })
            .finally(() => {
                // alert(1)
                // store.setLoading(false);
            })
    }, []);

    return (
        <>
            <Layout className={s.layout}>
                <Sider className={s.sider} trigger={null} collapsible collapsed={collapsed}>
                    <div className={s.logo}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined/>}>
                            <Link to='/'>
                                {store.user.email}
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined/>}>
                            <Link to='/about'>
                                nav 2
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined/>}>
                            <Link to='/s'>
                                nav 3
                            </Link>
                        </Menu.Item>
                    </Menu>
                    <button onClick={() => {
                        store.logout();
                        navigate('/login')
                    }}>Выйти
                    </button>
                </Sider>
                <Routes>
                    <Route exact path='/' element={<Dont/>}/>
                    <Route exact path='/chat/:id' element={<ChatPage/>}/>
                    <Route exact path='/s' element={<div>csdcsdc</div>}/>
                </Routes>
            </Layout>
            <Outlet/>
        </>
    );
};

export default observer(AppBody);
