import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const userInfoUrl = 'account';

const SignInHeader = (props) => {

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
            props.onSubmit(signedIn);
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
                <ul className='nav-items navbar-right'>
                    <li><div className="nav-item">{username} signed in</div></li>
                    <li><Link className="nav-link" to="/sign-out">Sign Out</Link></li>
                </ul>
            ) : (
                <ul className='nav-items navbar-right'>
                    <li><Link className="nav-link" to="/sign-in">Sign In</Link></li>
                    <li><Link className="nav-link" to="/register">Register</Link></li>
                </ul>
            )}
        </>
    );
}

export default SignInHeader;