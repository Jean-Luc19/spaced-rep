import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

export class QuestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        }
    }

    onChangeValue(e) {
        this.setState({value: e.target.value})
    }

    onSubmitAnswer(e) {
        let answer = this.state.value;
        let correctAnswer = this.props.currentQuestion.wordEnglish
        console.log(correctAnswer)
        const questionId = this.props.currentQuestion._id;
        e.preventDefault();
        if (answer === correctAnswer) {
             answer = true;
        } else {
             answer = false;
        }
        this.props.dispatch(actions.submitAnswer(answer, questionId));

    }

    render() {
        const currentQuestion = this.props.currentQuestion
        return (
            <div className="flash-card">
                <h1>Dothraki Word: {currentQuestion.wordDothraki}</h1>
                <h3>English Word: {currentQuestion.wordEnglish}</h3>
                <div className="user-status">
                    <p>Difficulty: {currentQuestion.difficulty}</p>
                </div>
                <form className="flash-card-answer"
                    onSubmit={(e) => this.onSubmitAnswer(e)}>
                    <label>Input Your Answer:
                    </label>
                    <input type="text" onChange={(e) => this.onChangeValue(e)} value={this.state.value} placeholder="English Equivalent"></input>
                    <button type="submit">Submit Answer</button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
    currentQuestion: state.currentQuestion,
})

export default connect(mapStateToProps)(QuestionCard);
