import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import RightCard from './question-correct-true';
import WrongCard from './question-correct-false';

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
        let userAnswer = this.state.value.toLowerCase();
        let correctAnswer = this.props.currentQuestion.wordEnglish.toLowerCase();
        console.log(correctAnswer)
        const questionId = this.props.currentQuestion._id;
        e.preventDefault();
        let correct;
        if (userAnswer === correctAnswer) {
             correct = true;
        } else {
             correct = false;
        }
        this.props.dispatch(actions.submitAnswer(correct, questionId, userAnswer));
        this.setState({value: ""});
    }

    render() {
        const currentQuestion = this.props.currentQuestion
        const correct = this.props.correct;
        const userAnswer = this.props.userAnswer;
        console.log(currentQuestion);
        console.log(userAnswer);
        console.log(correct);

        if (correct) {
            return (
                <RightCard englishAnswer={currentQuestion.wordEnglish} userAnswer={userAnswer}/>
            )
        } else if (!correct && !userAnswer) {
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
            )
        } else if (correct === false) {
            return (
                <WrongCard englishAnswer={currentQuestion.wordEnglish} userAnswer={userAnswer}/>
            )
        }
    };
}

const mapStateToProps = (state, props) => ({
    currentQuestion: state.currentQuestion,
    correct: state.correct,
    userAnswer: state.userAnswer
})

export default connect(mapStateToProps)(QuestionCard);
