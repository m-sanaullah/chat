import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import "firebase/app";

import { auth } from '../components/firebase';  //! "auth" will return "firebase.auth.Auth"
import firebase from 'firebase/app';

var provider = new firebase.auth.GoogleAuthProvider();  //! it's an instance of Google provider object

const Login = () => {
    //console.log(auth)      //! "auth" is an object
    return(
        <div id = "login-page">
            <div id = "login-card">
                <h2 style = {{color:"green"}}>Welcome to Unichat!</h2>
                
                <div
                    className = "login-button google" 
                    onClick = {() => auth.signInWithRedirect(provider)}   //!callback function....returns "firebase.auth.Auth.signInWithRedirect(provider)" .. //? => firebase.auth.Auth.onAuthStateChanged to "receive" sign in state changes
                >
                    <GoogleOutlined style = {{color : ""}} /> Sign In With Google
                </div>
                <br/> <br/>
                <div
                    className = "login-button facebook" 
                    onClick = {() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                    
                >
                    <FacebookOutlined style = {{color : ""}} /> Sign In With Facebook
                </div>
            </div>
        </div>
    );
};
export default Login;