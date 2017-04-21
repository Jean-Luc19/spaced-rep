import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import {Link} from 'react-router-dom';
import QuestionPageTitle from './question-page-title'

class RightCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correct: false,
            disabled: true
        }
    }

    changeClass() {
        const timeOut = setTimeout(
            () => this.setState({correct: true, disabled: false})
            ,1000)

    }

    componentDidMount(){
        this.changeClass()
    }

    render() {
        const answer = this.props.answer;
        const userAnswer = this.props.userAnswer;
        const question = this.props.question;
        const style = this.state.correct ? {color: 'green'} : {color: 'steelblue'};
        const message = this.state.correct ? "" : "hidden-message";
        const disabled = this.state.disabled

        return (
            <div className="flash-card result-card-right">
                <h3>The Word Was</h3>
                <h3 className='feedback' id='result-question' style={style} >{question}</h3>
                <h2>Your Answer Was</h2>
                <h3 className='feedback' style={style} >{userAnswer.toLowerCase()}</h3>
                <h4 className={message} >You Got It Right!!!</h4>
                <button disabled={disabled} onClick={() => this.props.dispatch(actions.nextQuestion())}>Next</button>
            </div>
        );
    }
}

export default connect()(RightCard);
