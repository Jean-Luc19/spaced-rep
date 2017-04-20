import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import RightCard from './question-correct-true';
import WrongCard from './question-correct-false';
import QuestionPageTitle from './question-page-title';

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
        const dothWord = this.props.currentQuestion.wordDothraki;
        const englishWord = this.props.currentQuestion.wordEnglish;
        let userAnswer = this.state.value.toLowerCase();
        let correctAnswer = this.props.languageOrder ? englishWord.toLowerCase() : dothWord.toLowerCase();
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

        const correct = this.props.correct;
        const userAnswer = this.props.userAnswer;
        const currentQuestion = this.props.currentQuestion
        const question = this.props.languageOrder ? currentQuestion.wordDothraki : currentQuestion.wordEnglish;

        const answer = this.props.languageOrder ? currentQuestion.wordEnglish : currentQuestion.wordDothraki;

        const title = currentQuestion.wordDothraki ? <QuestionPageTitle title={question}/> : ''

        if (correct) {
            return (
                <RightCard answer={answer} userAnswer={userAnswer}/>
            )
        } else if (!correct && !userAnswer) {
            return (
                <div className="flash-card">
                    {title}
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
    userAnswer: state.userAnswer,
    languageOrder: state.languageOrder
})

export default connect(mapStateToProps)(QuestionCard);
