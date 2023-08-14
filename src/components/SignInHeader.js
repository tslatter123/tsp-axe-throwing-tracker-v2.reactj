import { useState, useEffect } from "react";
import axios from "../api/axios.js";
import AuthContext, { AuthProvider } from "../context/AuthProvider.js";

const userInfoUrl = 'account';

const SignInHeader = () => {
    const [signedIn, setSignedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        console.log(AuthProvider.AuthContext);

        const getUserInfo = async () => {
            try {
                const response = await axios.get(userInfoUrl, {
                    signal: controller.signal
                });

                console.log(response.data);
                isMounted ?? setSignedIn(true);
                signedIn ?? setUsername('fred');
            } catch (err) {
                console.error(err);
                setSignedIn(false);
            }
        };

        getUserInfo();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <>
            {signedIn ? (
                <div>{username} signed in</div>
            ) : (
                <div>Not signed in</div>
            )}
        </>
    );
}

export default SignInHeader;