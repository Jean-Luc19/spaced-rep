import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ReverseOrder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="logout">
                <button
                    className="logout" onClick={()=> this.props.dispatch(actions.reverseLanguageOrder())}>Reverse
                </button>
            </div>
        );
    }
}

export default connect()(ReverseOrder);
