import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import {Link} from 'react-router-dom';

class WrongCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correct: false,
        }
    }

    changeClass() {
        const timeOut = setTimeout(
            () => this.setState({correct: true})
            ,2000)

    }

    componentDidMount(){
        this.changeClass()
    }

    render() {
        const answer = this.props.answer
        const userAnswer = this.props.userAnswer;
        const question = this.props.question;
        const style = this.state.correct ? {color: 'red'} : {color: 'steelblue'};

        return (
            <div className="flash-card result-card-wrong">
                <h2>The Answer Was: {answer.toLowerCase()}</h2>
                <h3 className='feedback' id='result-question' style={style} >{question}</h3>
                <h3 className='feedback' style={style} >{userAnswer.toLowerCase()}</h3>
                <button onClick={() => this.props.dispatch(actions.nextQuestion())}>Next</button>
            </div>
        );
    }

}

export default connect()(WrongCard);
