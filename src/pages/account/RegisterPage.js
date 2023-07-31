import React, { useRef, useState, useEffect } from 'react';
import axios from "../../api/axios";
import { Link } from 'react-router-dom';

const registerUrl = 'UserRegister';

const RegisterPage = () => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        usernameRef.current.focus();
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [username, email, confirmEmail, password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (confirmEmail !== email) {
            setErrorMsg('Emails do not match. Please try again.');
            return;
        }
        else if (confirmPassword !== password) {
            setErrorMsg('Passwords do not match. Please try again.');
            return;
        }

        try {
            await axios.post(
                registerUrl,
                {
                    "userName": username,
                    "email": email,
                    "confirmEmail": confirmEmail,
                    "password": password,
                    "confirmPassword": confirmPassword
                },
                {
                    headers: {
                        'ContentType': 'application/json'
                    }
                }
            );

            setSuccess(true);
        }
        catch (err) {
            if (!err?.response) {
                setErrorMsg('No server response.')
            }
            else {
                setErrorMsg(err?.response?.data);
            }
        }
    }

    return (
        <>
        {success ? (
                <section>
                    <p>You have successfully registered.</p>
                    <Link to='/signin'>Sign in here</Link>
                </section>
            ) : (
            <section>
                <p ref={errorRef} aria-live='assertive'>{errorMsg}</p>
                <h1>Register</h1>
                <form id='registerForm' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input
                            id='username'
                            type='text'
                            placeholder='Username'
                            ref={usernameRef}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required />
                    </div>
                    <div className='form-group'>
                        <input
                            id='email'
                            type='email'
                            placeholder='Email address'
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required />
                    </div>
                    <div className='form-group'>
                        <input
                            id='confirmEmail'
                            type='email'
                            placeholder='Confirm email address'
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            value={confirmEmail}
                            required />
                    </div>
                    <div className='form-group'>
                        <input
                            id='password'
                            type='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required />
                    </div>
                    <div className='form-group'>
                        <input
                            id='confirmPassword'
                            type='password'
                            placeholder='Confirm password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required />
                    </div>
                    <div className='form-group'>
                        <button>Register</button>
                    </div>
                </form>
            </section>
            )}
        </>
    );
}

export default RegisterPage;