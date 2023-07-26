import React from 'react';
import { Link } from 'react-router-dom';

function TopNavBar(){
    return (
        <div class="navbar navbar-top">
            <Link class="site-title" to="/">Tom's Axe Throwing Tracker</Link>
            <Link class="nav-link" to="/routetest">React Router Test</Link>
            <Link class="nav-link" to="/signin">Sign In</Link>
            <Link class="nav-link" to="/register">Register</Link>
        </div>
    );
}

export default TopNavBar;