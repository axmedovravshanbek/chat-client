import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";
import axios from "axios";

initializeApp({
    apiKey: "AIzaSyAcZjq79MK7RBtrphuP8uZ6mbix14znRXE",
    authDomain: "react-chat-99158.firebaseapp.com",
    projectId: "react-chat-99158",
    storageBucket: "react-chat-99158.appspot.com",
    messagingSenderId: "1068646634679",
    appId: "1:1068646634679:web:ddef2280b5f14f2c996932",
    measurementId: "G-0N8MVK4F65"
});

const messaging = getMessaging();
export const requestForToken = (userId) => {
    getToken(messaging, {vapidKey: 'BHyDTmFLExfXfUtnle7HXJ9T_sNXqvNqCLf0XGbzk8-nemmhVowFNBdDiv52T_WwQznJH8Cdc8XGwvjGPczRxNw'})
        .then(currentToken => {
            axios.post(
                `${process.env.REACT_APP_SERVER_URL}api/set_token`,
                {_id: userId, fcmToken: currentToken})
                .then(()=>console.log('token set'))
                .catch(()=>console.log('token not set'))
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        })
};
