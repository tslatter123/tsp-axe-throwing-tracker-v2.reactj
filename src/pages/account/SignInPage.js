import React, { useRef, useState, useEffect } from 'react';

function SignInPage() {
    const usernameRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);
    }

    return (
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
    );
}

export default SignInPage;