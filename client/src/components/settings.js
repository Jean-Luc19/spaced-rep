import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import ReverseOrder from './reverse-order';
import Reset from './reset'

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: false
        }
    }

    render() {
        if (this.state.settings) {
            return (
                <div className="setting-model">
                    <h3>Settings</h3>
                    <ul className="setting-options">
                        <li>
                            <ReverseOrder />
                        </li>
                        <li>
                            <Reset />
                        </li>
                    </ul>
                    <button onClick={() => this.setState({settings: false})}>Exit Settings</button>
                </div>
            )
        } else {
            return (
                <div className="settings-container">
                    <button onClick={() => this.setState({settings: true})} className="settings-btn">Settings</button>
                </div>
            );
        }
    }
}

export default connect()(Settings);
