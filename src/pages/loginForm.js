import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router";
import {API_URL} from "../js/axiosV2";
import {Link} from 'react-router-dom'
import {Button, Checkbox, Form, Input, Layout} from 'antd';
import {LockOutlined, MailOutlined, LoadingOutlined} from '@ant-design/icons';
import {lang} from "../js/lang";
import AuthLangSelect from "../components/authLangSelect";
import axios from "axios";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: ['success', {en: '', uz: '', ru: ''}],
        password: ['success', {en: '', uz: '', ru: ''}],
    });

    const {store} = useContext(Context);
    const navigate = useNavigate();

    const onFinish = (values) => {
        setLoading(true);
        axios.post(`${API_URL}/login`, values)
            .then(async (response) => {
                await localStorage.setItem('token', response.data.refreshToken);
                await store.setUser(response.data.user);
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
                setErrors({
                    ...errors,
                    [e.response?.data?.errorField]: ['error', e.response?.data?.message]
                });
                setLoading(false)
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
                [fields[0].name[0]]: ['error', {
                    en: 'This field must be completed',
                    uz: 'To\'ldirilishi lozim',
                    ru: 'Заполните поле'
                }]
            })
        }
    };
    return (
        <Layout className='app_body center p24'>
            <AuthLangSelect/>
            <h1>{lang.login[store.lang]}</h1>
            <Layout.Content className='content w500'>
                <Form onFieldsChange={handleFormChange} name="basic" className='w300' initialValues={
                    {
                        email: localStorage.getItem('email'),
                        password: localStorage.getItem('password'),
                        remember: true
                    }} onFinishFailed={({errorFields}) => setErrors({
                    ...errors,
                    [errorFields[0].name[0]]: ['error', errorFields[0].errors[0]]
                })} onFinish={onFinish}>
                    <Form.Item rules={[
                        {type: 'email', message: {en: 'Enter a correct email address', uz: 'To\'g\'ri elektron manzil kiriting', ru: 'Введите правильный адрес почты'}},
                        {required: true, message: {en: 'Required field', uz: 'To\'ldirish talab qilinadi', ru: 'Обязательное поле'}},
                    ]} validateStatus={errors.email[0]} help={errors.email[1][store.lang]} name="email">
                        <Input placeholder={lang.emailPlaceholder[store.lang]} prefix={<MailOutlined/>}/>
                    </Form.Item>
                    <Form.Item name="password" validateStatus={errors.password[0]} help={errors.password[1][store.lang]}
                               rules={[
                                   {required: true, message: {en: 'Required field', uz: 'To\'ldirish talab qilinadi', ru: 'Обязательное поле'}},
                                   {min: 6, message: {en: 'Minimum 6 characters', uz: 'Kamida 6ta belgi kiriting', ru: 'Введите минимум 6 знаков'}}
                               ]}>
                        <Input.Password prefix={<LockOutlined/>} placeholder={lang.passwordPlaceholder[store.lang]}/>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>{lang.rememberMe[store.lang]}</Checkbox>
                        </Form.Item>
                        <Link to='/forgot' style={{float: 'right'}}>
                            {lang.forgot[store.lang]}
                        </Link>
                    </Form.Item>
                    <Button type="primary" disabled={loading} htmlType="submit" style={{width: '100%'}}>
                        {loading && <LoadingOutlined/>}
                        {lang.login[store.lang]}
                    </Button>
                    {lang.or[store.lang]} <Link to='/registration'>{lang.register[store.lang]}</Link>
                </Form>
            </Layout.Content>
        </Layout>
    );
};

export default observer(LoginForm);
