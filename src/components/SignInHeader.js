import { useState } from "react";
import axios from "../api/axios.js";
import AuthContext, { AuthProvider } from "../context/AuthProvider.js";

const userInfoUrl = 'account';

const SignInHeader = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [username, setUsername] = useState('');

    try {
        const response =
            axios.get(userInfoUrl, {
                headers: {
                    'Authorization': 'bearer ' + AuthProvider.AuthContext
                }
            })
    }
    catch (err) {
        console.log(err?.response ?? 'No server response');
        setSignedIn(false);
    }
}

export default SignInHeader;