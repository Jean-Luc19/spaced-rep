import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="logout">
                <a href="/api/auth/logout"><button className="logout">Logout</button></a>
            </div>
        );
    }
}

export default connect()(Logout);
