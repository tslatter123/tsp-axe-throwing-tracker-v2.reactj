import React from 'react';
import { Link } from 'react-router-dom';

function TopNavBar() {
    return (
        <header className='navbar navbar-top'>
            <ul className='navbar-left'>
                <li><Link className="nav-link nav-title" to="/">Tom's Axe Throwing Tracker</Link></li>
                <li><Link className="nav-link" to="/routetest">React Router Test</Link></li>
            </ul>
            <ul className='navbar-right'>
                <li><Link className="nav-link" to="/signin">Sign In</Link></li>
                <li><Link className="nav-link" to="/register">Register</Link></li>
            </ul>
        </header>
    );
}

export default TopNavBar;