import React from 'react';

export default function LoginPage() {
    return (
        <div className="login-page">
            <h1 className="title">Dolthraki-X</h1>
            <h2 className="page-info">Learn the language Dothraki through spaced-repitition so that you may one day claim the iron throne.</h2>
            <div className="btn-container">
                <a href={'/api/auth/google'}><button className="login-btn login-btn-google">Login with Google</button></a>
            </div>
        </div>
    );
}
