import React from 'react';

export default function LoginPage() {
    return (
        <div className="login-page">
            <a href={'/api/auth/google'}><button className="loginBtn loginBtn--google">Login with Google</button></a>
        </div>
    );
}
