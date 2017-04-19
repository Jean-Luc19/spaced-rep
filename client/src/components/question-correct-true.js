import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import {Link} from 'react-router-dom';

export class RightCard extends React.Component {
    constructor(props) {
        super(props);
    }


    onSubmitAnswer(e) {

    }

    render() {
        const currentQuestion = this.props.englishAnswer
        const userAnswer = this.props.userAnswer;
        console.log(userAnswer);
        console.log(currentQuestion);

        return (
            <div className="result-card">
                <h1>You Got It Right!</h1>
                <h2>The Answer Was: {currentQuestion.toLowerCase()}</h2>
                <h3>Your Answer Was: {this.props.userAnswer.toLowerCase()}</h3>
                <button onClick={() => {this.props.dispatch(actions.)}}>Next</button>
            </div>
        );
    }

}

const mapStateToProps = (state, props) => ({

})

export default connect(mapStateToProps)(RightCard);
