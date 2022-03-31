import React from 'react';
import {observer} from "mobx-react-lite";
import GoogleLogin from "react-google-login";
import {Layout} from 'antd';
import {store} from "../js/store";
import {lang} from "../js/lang";
import axios from "axios";
import AuthLangSelect from "../components/authLangSelect";

const SignIn = () => {
    const googleAuthSuccess = (e) => {
        const {email, familyName, givenName, imageUrl} = e.profileObj;
        axios.post(`${process.env.REACT_APP_SERVER_URL}api/sign_in`, {email, familyName, givenName, imageUrl})
            .then((res) => {
                store.setUser(res.data.user)
            })
            .catch((e) => {
                console.log(e)
            })
    };

    return (
        <Layout className='app_body center p24'>
            <AuthLangSelect/>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                buttonText={lang.login[store.lang]}
                isSignedIn={true}
                cookiePolicy='single_host_origin'
                onSuccess={googleAuthSuccess}
                onFailure={(e) => console.log(e)}
            />
        </Layout>
    );
};

export default observer(SignIn);
