import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router";
import $api from "../components/axiosV2";
import {Link} from 'react-router-dom'
import {Button, Checkbox, Form, Input, Layout} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import s from '../styles/Login.module.css'
import {lang} from "../lang";
import AuthLangSelect from "../components/authLangSelect";

const LoginForm = () => {
    const [errors, setErrors] = useState({
        email: ['success', {en: '', uz: '', ru: ''}],
        password: ['success', {en: '', uz: '', ru: ''}],
    });

    const {store} = useContext(Context);
    const navigate = useNavigate();

    const onFinish = (values) => {
        $api.post('/login', values)
            .then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                store.setAuth(true);
                store.setUser(response.data.user);
                if (values.remember) {
                    localStorage.setItem('email', values.email);
                    localStorage.setItem('password', values.password);
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                }
                navigate('/')
            })
            .catch(e => {
                console.log(e);
                setErrors({
                    ...errors,
                    [e.response?.data?.errorField]: ['error', e.response?.data?.message]
                })
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
                <AuthLangSelect/>
                <h1>{lang.login[store.lang]}</h1>
                <Layout.Content className={s.content}>
                    <Form onFieldsChange={handleFormChange} name="basic" className={s.form} initialValues={
                        {
                            email: localStorage.getItem('email'),
                            password: localStorage.getItem('password'),
                            remember: true
                        }} onFinishFailed={({errorFields}) => setErrors({
                        ...errors,
                        [errorFields[0].name[0]]: ['error', errorFields[0].errors[0]]
                    })} onFinish={onFinish}>
                        <Form.Item rules={[
                            {type: 'email', message: {ru: 'email ru', uz: 'email uz', en: 'email en'}},
                            {required: true, message: {ru: 'required ru', uz: 'required uz', en: 'required en'}},
                        ]} validateStatus={errors.email[0]} help={errors.email[1][store.lang]} name="email">
                            <Input placeholder={lang.emailPlaceholder[store.lang]} prefix={<UserOutlined/>}/>
                        </Form.Item>
                        <Form.Item name="password" validateStatus={errors.password[0]}
                                   help={errors.password[1][store.lang]} rules={[
                            {required: true, message: {ru: 'required ru', uz: 'required uz', en: 'required en'}},
                            {min: 5, message: {ru: 'min 5 ru', uz: 'min 5 uz', en: 'min 5 en'}}
                        ]}>
                            <Input.Password prefix={<LockOutlined/>}
                                            placeholder={lang.passwordPlaceholder[store.lang]}/>
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>{lang.rememberMe[store.lang]}</Checkbox>
                            </Form.Item>
                            <Link to='/forgot' className={s.forgot}>
                                {lang.forgot[store.lang]}
                            </Link>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" className={s.submitButton}>
                            {lang.login[store.lang]}
                        </Button>
                        {lang.or[store.lang]} <Link to='/registration'>{lang.register[store.lang]}</Link>
                    </Form>
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default observer(LoginForm);
