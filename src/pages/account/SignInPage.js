import React, { useRef, useState, useEffect } from 'react';

import axios from '../../api/axios';

import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const signInUrl = 'UserLogIn';

const SignInPage = () => {
    const { setAuth } = useAuth();

    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response =
                await axios.post(
                    signInUrl,
                    {
                        "userName": username,
                        "password": password
                    },
                    {
                        headers: {
                            'ContentType': 'application/json',
                        },
                        withCredentials: true
                    }
                );
            const accessToken = response?.data?.accessToken;

            setAuth({ username, password, accessToken });
            setSuccess(true);
        }
        catch (err) {
            if (!err?.response) {
                setErrorMsg('No server response.');
            }
            else {
                console.error(err?.response);
            }
            errorRef.current.focus();
        }
    }

    return (
        <div className='page-content'>
            {success ? (
                <section>
                    <p>Logged in successfully.</p>
                    <Link to='/'>Back to Home</Link>
                </section>
            ) : (
                <section>
                    <h1>Sign In</h1>
                    <p ref={errorRef} aria-live='assertive'>{errorMsg}</p>
                    <form id='loginForm' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                id='username'
                                type='text'
                                placeholder='Username or Email address'
                                ref={usernameRef}
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id='password'
                                type='password'
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button>Sign In</button>
                        </div>
                    </form>
                </section>
            )}
        </div>
    );
}

export default SignInPage;