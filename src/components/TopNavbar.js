import '../assets/css/TopNavBar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SignInHeader from './SignInHeader';

const TopNavBar = () => {

    const [signedIn, setSignedIn] = useState(false);

    const getData = (userSignedIn) => {
        setSignedIn(userSignedIn);
    };

    return (
        <header className='navbar navbar-top'>
            <ul className='nav-items navbar-left'>
                <li><Link className="nav-link nav-title" to="/">TATT</Link></li>
                <li><Link className="nav-link" to="/route-test">React Router Test</Link></li>
                {signedIn ? (
                    <>
                        <li><Link className="nav-link" to="/axes">Axes</Link></li>
                        <li><Link className="nav-link" to="/user-watl-games">WATL</Link></li>
                    </>
                ) : (
                    <></>
                )}
            </ul>
            <SignInHeader onSubmit={getData} />
        </header>
    );
}

export default TopNavBar;