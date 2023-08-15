import { useState, useEffect } from "react";
// import axios from "../api/axios.js";
// import AuthContext, { AuthProvider } from "../context/AuthProvider.js";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const userInfoUrl = 'account';

const SignInHeader = () => {

    const [signedIn, setSignedIn] = useState(false);
    const [username, setUsername] = useState('');
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUserInfo = async () => {
            try {
                const response = await axiosPrivate.get(userInfoUrl, {
                    signal: controller.signal
                });

                console.log(response.data);
                isMounted && setUsername(response.data.userInfo.userName);
                isMounted && setSignedIn(true);
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