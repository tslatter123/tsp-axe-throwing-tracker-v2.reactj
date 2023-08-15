import { useState, useEffect } from "react";
// import axios from "../api/axios.js";
// import AuthContext, { AuthProvider } from "../context/AuthProvider.js";
import { Link } from 'react-router-dom'
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
    });

    return (
        <>
            {signedIn ? (
                <div>{username} signed in</div>
            ) : (
                <ul className='nav-items navbar-right'>
                    <li><Link className="nav-link" to="/signin">Sign In</Link></li>
                    <li><Link className="nav-link" to="/register">Register</Link></li>
                </ul>
            )}
        </>
    );
}

export default SignInHeader;