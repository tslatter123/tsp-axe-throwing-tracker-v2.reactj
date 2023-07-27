import React, { useRef, useState, useEffect } from 'react';

function LogInPage() {
    const userRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState('');

    async function LogIn() {
        console.log(username, password);
    }

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMsg('');
    }, [username, password]);

    return (
        <div>
            <h1>Sign In</h1>
            <div className="form-group">
                <input type="text" placeholder="Username or Email address" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={LogIn}>Sign In</button>
            </div>
        </div>
    );
}

export default LogInPage;