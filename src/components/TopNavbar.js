import '../assets/css/TopNavBar.css';
import React from 'react';
import { Link } from 'react-router-dom';

import SignInHeader from './SignInHeader';

function TopNavBar() {
    return (
        <header className='navbar navbar-top'>
            <ul className='nav-items navbar-left'>
                <li><Link className="nav-link nav-title" to="/">TATT</Link></li>
                <li><Link className="nav-link" to="/routetest">React Router Test</Link></li>
            </ul>
            <ul className='nav-items navbar-right'>
                <li><Link className="nav-link" to="/signin">Sign In</Link></li>
                <li><Link className="nav-link" to="/register">Register</Link></li>
            </ul>
            <SignInHeader />
        </header>
    );
}

export default TopNavBar;