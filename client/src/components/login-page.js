import React from 'react';
import QuestionPageTitle from './question-page-title';

export default function LoginPage() {
    return (
        <div className="login-page">
            <h1 className="title">Dothraki-X</h1>
            <h2 className="page-info">Learn the language Dothraki through spaced-repetition so that you may one day claim the iron throne.</h2>
            <div className="btn-container">
                <a href={'/api/auth/google'}><button className="login-btn login-btn-google">Login with Google</button></a>
            </div>
            <div className="btn-container">
                <a href={'/api/demo'}><button className="login-btn login-btn-google">Demo as a Guest</button></a>
            </div>
        </div>
    );
}
