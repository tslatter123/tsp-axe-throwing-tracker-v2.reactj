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
    });

    useEffect(() => {
        setErrorMsg('');
    }, [username, email, confirmEmail, password, confirmPassword]);

    return (
        <>
            <section>
                <p ref={errorRef}></p>
            </section>
        </>
    );
}

export default RegisterPage;