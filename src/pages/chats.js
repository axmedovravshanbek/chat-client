import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Avatar, Layout} from 'antd';
import MainHeader from "../components/mainHeader";
import {Link} from "react-router-dom";
import {lang} from "../js/lang";
import Loading from "./loading";
import {avatarColor} from "../js/converters";
import {MenuUnfoldOutlined} from "@ant-design/icons";

const Chats = ({collapsed, setCollapsed}) => {
    const {store} = useContext(Context);
    store.socket.emit('typing');

    const notMe = (u1, u2) => {
        return (u1._id !== store.user?._id) ? u1 : u2
    };
    if (store.user?._id === undefined) {
        return (
            <Loading/>
        )
    }
    return (
        <Layout>
            <MainHeader>
                <MenuUnfoldOutlined className='side__trigger' onClick={() => setCollapsed(!collapsed)}/>
                <h1 style={{lineHeight: '64px'}}>{lang.chats[store.lang]}</h1>
            </MainHeader>
            <Layout.Content className='content overflowY' style={{padding: 0, backgroundColor: '#00000000'}}>
                {store.myChats.map(({_id, receiver, sender, lastMessage}) =>
                    <Link to={`chat/${notMe(receiver, sender)._id}`} style={{marginBottom: '16px', display: 'block'}}
                          key={_id} onClick={() => store.setOtherUser(notMe(receiver, sender))}>
                        <div className='content' style={{margin: 0}}>
                            <div className="d-flex">
                                <Avatar size={48} style={{
                                    flexShrink: 0,
                                    backgroundColor: avatarColor(notMe(receiver, sender).email),
                                    marginRight: 16
                                }} src={notMe(receiver, sender).imgSrc}>
                                    {notMe(receiver, sender).fullName[0].toUpperCase()}
                                </Avatar>
                                <div className="d-flex jcc column">
                                    <h2 style={{marginBottom: 8}}>{notMe(receiver, sender).fullName}</h2>
                                    {lastMessage?.msgContent}
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </Layout.Content>
        </Layout>
    );
};

export default observer(Chats);
