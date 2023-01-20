import React from 'react';
import {observer} from "mobx-react-lite";
import {GoogleLogin} from "@react-oauth/google";
import {Layout} from 'antd';
import {store} from "../js/store";
import {lang} from "../js/lang";
import axios from "axios";
import AuthLangSelect from "../components/authLangSelect";

const SignIn = () => {
    // const googleAuthSuccess = (e) => {
    //     const {email, familyName, givenName, imageUrl} = e.profileObj;
        axios.post(`http://localhost/api/sign_in`, {
            "googleId": "107655323900722271382",
            "imageUrl": "https://lh3.googleusercontent.com/a/AEdFTp6CuELQhCcYX_o3EzNvAJJRW590UaApLMBUcm50=s96-c",
            "email": "ahmedovravshanbek21@gmail.com",
            "name": "Ravshanbek Axmedov",
            "givenName": "Ravshanbek",
            "familyName": "Axmedov"
        })
            .then((res) => {
                store.setUser(res.data.user)
            })
            .catch((e) => {
                console.log(e)
            })
    // };

    return (
        <Layout className='app_body center p24'>
            <AuthLangSelect/>
            <GoogleLogin
                // clientId={process.env.REACT_APP_GOOGLE_ID}
                buttonText={lang.login[store.lang]}
                // isSignedIn={true}
                cookiePolicy='single_host_origin'
                onSuccess={(e)=>console.log(e)}
                onFailure={(e) => console.log(e)}
            />
        </Layout>
    );
};

export default observer(SignIn);
