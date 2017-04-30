import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Reset extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="reset">
                <button onClick={() => this.props.dispatch(actions.reset())} className="reset">Reset</button>
            </div>
        );
    }
}

export default connect()(Reset);
