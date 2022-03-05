import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Link, useParams} from "react-router-dom";
import MainHeader from "../components/mainHeader";
import {Layout, Input, Button, Form} from "antd";
import {SendOutlined} from '@ant-design/icons'
import {lang} from "../lang";

const {Header, Sider, Content} = Layout;

const ChatPage = () => {
    const [message, setMessage] = useState('');
    // const params = useParams();
    // console.log(params.id);
    const {store} = useContext(Context);
    return (
        <Layout>
            <MainHeader>
                <h2>                {store.otherUser.email}</h2>
            </MainHeader>
            <Content className='content'>
                <div style={{flexGrow: 1}}/>
                <div className="">
                    <Form onFinish={() => console.log('finish')} onFinishFailed={()=>console.log('failed')} style={{display: 'flex'}}>
                        <Input
                            onChange={(e) => setMessage(!!e.target.value)}
                            className='transition'
                            size='large'
                            name="message"
                            placeholder={lang.messagePlaceholder[store.lang]}
                            style={{padding: '6.5px 16px', borderRadius: (message ? '20px 0 0 20px' : '20px')}}/>
                        <div className='transition' style={{width: message ? 48 : 0, overflow: 'hidden', flexShrink: 0}}>
                            <Button
                                style={{borderRadius: (message?'0 20px 20px 0':'20px')}}
                                htmlType="submit"
                                size='large'
                                type="primary">
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
