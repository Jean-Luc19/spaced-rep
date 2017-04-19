import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import {Link} from 'react-router-dom';

class WrongCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentQuestion = this.props.englishAnswer
        const userAnswer = this.props.userAnswer;

        return (
            <div className="result-card-wrong">
                <h1>Darn so Close!</h1>
                <h2>The Answer Was: {currentQuestion.toLowerCase()}</h2>
                <h3>Your Answer Was: {this.props.userAnswer.toLowerCase()}</h3>
                <button onClick={() => this.props.dispatch(actions.nextQuestion())}>Next</button>
            </div>
        );
    }

}

export default connect()(WrongCard);
