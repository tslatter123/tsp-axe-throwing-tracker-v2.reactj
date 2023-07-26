import React, { useState } from 'react';

function LogInPage() {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    async function LogIn() {
        console.log(email, password);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <div className="form-group">
                <input type="text" placeholder="Username or Email address" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={LogIn}>Sign In</button>
            </div>
        </div>
    );
}

export default LogInPage;