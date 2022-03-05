import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from "react-router";
import {Context} from "../index";
import axios from "axios";
import {API_URL} from "../components/axiosV2";
import UserService from "../UserService";
import {observer} from "mobx-react-lite";
import {Layout, Menu} from 'antd';
import s from '../styles/Home.module.css'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import MainHeader from "../components/mainHeader";
import {Link} from "react-router-dom";

const {Header, Sider, Content} = Layout;
const Dont = () => {
    const navigate = useNavigate();
    const {store} = useContext(Context);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);
//    useEffect(() => {
//         props.socket.on('suggestions', (data) => {
//             props.customReducer('EDIT_SUGGESTIONS', data);
//         });
//
//         props.socket.on('backend_sends_user', (data) => {
//             props.customReducer('EDIT_USERS', data)
//         });
//     });
    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Layout>
            <MainHeader>
                <h1>Chats</h1>
            </MainHeader>
            <Content className='content'>
                {users.map(user =>
                    <div key={user.email}>
                        <Link to={`chat/${user._id}`}
                              style={{display: 'flex'}}
                              onClick={() => store.setOtherUser(user)}
                        >
                            <h2>{user.email}</h2>
                            <h3>{user.isActivated ? 'active' : 'no'}</h3>
                            <h2>{user._id}</h2>
                        </Link>
                    </div>
                )}
            </Content>
        </Layout>
    );
};

export default observer(Dont);
