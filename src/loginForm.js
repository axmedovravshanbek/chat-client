import React, {useContext, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router";
import $api from "./axiosV2";
import {Link} from 'react-router-dom'
import {Button, Checkbox, Form, Input, Layout} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import s from './styles/Login.module.css'
import {lang} from "./lang";

const LoginForm = () => {

    const [errors, setErrors] = useState({
        email: ['success', {en: '', uz: '', ru: ''}],
        password: ['success', {en: '', uz: '', ru: ''}],
    });

    const {store} = useContext(Context);
    const navigate = useNavigate();

    const onFinish = (values) => {
        if (values.password.length > 5) {
            $api.post('/login', values)
                .then((response) => {
                    localStorage.setItem('token', response.data.accessToken);
                    store.setAuth(true);
                    store.setUser(response.data.user);
                    navigate('/')
                })
                .catch(e => {
                    setErrors({
                        ...errors,
                        [e.response?.data?.errorField]: ['error', e.response?.data?.message]
                    })
                })
        } else setErrors({
            ...errors,
            password: ['error', {uz: 'uzunroq bosin', ru: 'ne doljno bit menshe 5', en: 'min 5'}]
        })

    };
    const handleFormChange = (fields) => {
        if (fields[0].value.length > 0) {
            setErrors({
                ...errors,
                [fields[0].name[0]]: ['success', {en: '', uz: '', ru: ''}]
            })
        } else {
            setErrors({
                ...errors,
                [fields[0].name[0]]: ['error', {en: 'type it', uz: 'yoz blat', ru: 'napishi suka'}]
            })
        }
    };
    return (
        <div>
            <Layout className={s.layout}>
                <Layout.Content className={s.content}>
                    <Form onFieldsChange={handleFormChange} name="basic" className={s.form} initialValues={
                        {
                            email: 'blackburnairfun@gmail.co',
                            password: 'axmedov31',
                            remember: true
                        }} onFinishFailed={({errorFields}) => setErrors({
                        ...errors,
                        [errorFields[0].name[0]]: ['error', errorFields[0].errors[0]]
                    })} onFinish={onFinish}>
                        <Form.Item rules={[{type: 'email', message: {ru: 'email ru', uz: 'email uz', en: 'email en'}}]}
                                   validateStatus={errors.email[0]} help={errors.email[1][store.lang]} name="email">
                            <Input placeholder="Basic usage" prefix={<UserOutlined/>}/>
                        </Form.Item>
                        <Form.Item name="password" validateStatus={errors.password[0]}
                                   help={errors.password[1][store.lang]}>
                            <Input.Password prefix={<LockOutlined/>}/>
                        </Form.Item>
                        {lang}
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <Link to='/registration' className={s.forgot} href="">
                                Forgot password
                            </Link>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className={s.submitButton}>
                            Log in
                        </Button>
                        Or <Link to='/registration'>register now!</Link>
                    </Form>
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default observer(LoginForm);
