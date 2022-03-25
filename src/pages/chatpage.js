import React, {useContext, useEffect, useRef, useState} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {store} from "../js/store";
import {observer} from "mobx-react-lite";
import {Button, Form, Input, Layout} from "antd";
import {ArrowLeftOutlined, SendOutlined} from '@ant-design/icons'
import {useNavigate, useParams} from "react-router-dom";
import {lang} from "../js/lang";
import MainHeader from "../components/mainHeader";
import Message from "../components/message";
import Loading from "./loading";
import UserInfo from "../components/userInfo";
import DateConverter from '../components/dateConverter'

const {Content} = Layout;

const ChatPage = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [typing, setTyping] = useState(false);
    const textarea = useRef(null);
    const params = useParams();

    const sendMessage = () => {
        const now = new Date().getTime();
        if (message[0] !== '\n' && message !== '') {
            store.setMessages(store.messages.concat([{
                senderId: store.user._id,
                receiverId: store.otherUser._id,
                msgContent: message,
                deliveryStatus: 0,
                sentTime: now
            }]));
            store.socket.emit('iSentMessage', {
                senderId: store.user._id,
                senderName: store.user.fullName,
                receiverId: store.otherUser._id,
                RSId: store.otherUser.socketId,
                fcmToken: store.otherUser.fcmToken,
                msgContent: message,
                sentTime: now
            })
        }
        setMessage('');
        textarea.current.focus();
    };
    const textareaChange = async (e) => {
        await setMessage(e.target.value);
        setTyping(e.target.value[0] !== '\n' && e.target.value !== '');
    };
    useEffect(() => {
        textarea.current?.focus();
        store.setOtherUser(Array.from(store.users).filter(({...item}) => item._id === params.id)[0]);
    }, [store.users]);
    useEffect(() => {
        if (typing) {
            store.socket.emit('imTyping', {
                receiverId: store.otherUser?._id,
                RSId: store.otherUser?.socketId
            });
            setTimeout(() => {
                setTyping(false)
            }, 3000)
        } else store.socket.emit('imTyping', {RSId: store.otherUser?.socketId});
    }, [typing]);
    useEffect(() => {
        store.socket.emit('iRead', {
            receiverId: store.user?._id,
            senderId: store.otherUser?._id,
            RSId: store.otherUser?.socketId
        })
    }, [store.messages.length]);
    const Chats = () => {
        const filtered = store.messages.filter(msg => msg.senderId === store.otherUser?._id || msg.receiverId === store.otherUser?._id);
        if (filtered.length === 0) {
            return <div className='d-flex jcc aic' style={{width: '100%', height: 'calc(100vh - 250px)'}}>
                <img src='../img/NoMessages.svg' alt="no messages" className='w300'/>
            </div>
        } else return filtered.map((msg, id, arr) => (
            <React.Fragment key={msg._id}>
                {new Date(msg.sentTime).toDateString() !== new Date(arr[id - 1]?.sentTime).toDateString() ?
                    <div className="message__date">
                        <DateConverter d={msg.sentTime}/>
                    </div>
                    : null}
                <Message msg={msg} my={msg.senderId === store.user?._id}/>
            </React.Fragment>
        ))
    };
    if (store.user?._id === undefined || store.otherUser?._id === undefined) {
        return (
            <Loading/>
        )
    }
    return (
        <Layout>
            <MainHeader>
                <ArrowLeftOutlined className='side__trigger' onClick={() => navigate('/')}/>
                <div className="d-flex aic">
                    <UserInfo user={store.otherUser}/>
                </div>
            </MainHeader>
            <Content className='content' style={{paddingTop: 0}}>
                <ScrollToBottom className='overflowY rstb'>
                    <div style={{padding: '16px 0'}} className='d-flex column'>
                        <Chats/>
                    </div>
                </ScrollToBottom>
                <div style={{height: 20, display: 'flex', alignItems: 'flex-end',}}>
                    <Form onFinish={sendMessage} onFinishFailed={() => console.log('failed')}
                          style={{display: 'flex', flexGrow: 1}}>
                        <Input.TextArea ref={textarea} autoSize={{minRows: 1, maxRows: 3}} onChange={textareaChange}
                                        className='transition input-message' size='large'
                                        value={message[0] !== '\n' ? message : null} onPressEnter={sendMessage}
                                        autoComplete="off" placeholder={lang.messagePlaceholder[store.lang]}
                                        style={{borderRadius: ((message[0] !== '\n' && message !== '') ? '20px 0 0 20px' : '20px')}}/>
                        <div className='transition sender-holder'
                             style={{width: (message[0] !== '\n' && message !== '') ? 48 : 0}}>
                            <Button style={{
                                borderRadius: ((message[0] !== '\n' && message !== '') ? '0 20px 20px 0' : '20px'),
                                height: '100%'
                            }} htmlType="submit" size='large' type="primary">
                                <SendOutlined/>
                            </Button>
                        </div>
                    </Form>
                </div>
            </Content>
        </Layout>

    );
};
export default observer(ChatPage);
