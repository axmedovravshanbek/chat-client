import React, {useContext, useState, useRef} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import MainHeader from "../components/mainHeader";
import {Button, Form, Input, Layout} from "antd";
import {SendOutlined} from '@ant-design/icons'
import {lang} from "../lang";

const {Content} = Layout;

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [inputHeight, setInputHeight] = useState('unset');
    const passwordInput = useRef(null);// const params = useParams();
    // console.log(params.id);
    const {store} = useContext(Context);


    const sendMessage = () => {
        console.clear();
        setInputHeight('40 !important');
        setMessage('');
        console.log('message', JSON.stringify(message));
        passwordInput.current.focus();
    };
    return (
        <Layout>
            <MainHeader>
                <h2>{store.otherUser.email}</h2>
            </MainHeader>
            <Content className='content'>
                <div style={{flexGrow: 1}}>
                    <h2>{'message[0]'}</h2>
                    <h4>{message===''?'null':'nullmas'}</h4>
                    <h4>{message?'mesasge':'mesaagemas'}</h4>
                    <h4>{message==='\n'?'n':'nmas'}</h4>
                    <h4>{JSON.stringify(message[0])}</h4>
                    {/*<h3>{message.length>0?'bor':'no'}</h3>*/}
                </div>
                <div className="">
                    <Form onFinish={sendMessage} onFinishFailed={()=>console.log('failed')} style={{display: 'flex'}}>
                        <Input.TextArea
                            ref={passwordInput}
                            autoSize={{ minRows: 1, maxRows: 5 }}
                            onChange={(e) => {
                                setInputHeight('unset');
                                setMessage(e.target.value)
                            }}
                            className='transition input-message'
                            size='large'
                            value={message[0]!=='\n'?message:null}
                            onPressEnter={(e)=>sendMessage(e.target.value)}
                            autoComplete="off"
                            placeholder={lang.messagePlaceholder[store.lang]}
                            style={{
                                borderRadius: ((message[0]!=='\n' && message!=='')? '20px 0 0 20px' : '20px'),
                                maxHeight:inputHeight
                            }}
                        />
                        <div className='transition sender-holder' style={{width:(message[0]!=='\n' && message!=='') ? 48 : 0}}>
                            <Button
                                style={{borderRadius: ((message[0]!=='\n' && message!=='')?'0 20px 20px 0':'20px'), height:'100%'}}
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
