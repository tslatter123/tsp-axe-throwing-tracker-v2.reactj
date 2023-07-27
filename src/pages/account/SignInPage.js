import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

import axios from '../../api/axios';

import { Link } from 'react-router-dom';

const signInUrl = 'UserLogIn';

const SignInPage = () => {
    const { setAuth } = useContext(AuthContext);

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
            const response = await axios.post(signInUrl,
                { "userName": username, "password": password },
                {
                    headers: {
                        'ContentType': 'application/json',
                    }
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
                console.log(err?.response);
            }
            errorRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <p>Logged in successfully.</p>
                    <Link to='/'>Back to Home</Link>
                </section>
            ) : (
                <section>
                    <p ref={errorRef} aria-live='assertive'>{errorMsg}</p>
                    <h1>Sign In</h1>
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
        </>
    );
}

export default SignInPage;