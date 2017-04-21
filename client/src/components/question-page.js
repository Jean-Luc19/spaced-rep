import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import * as actions from '../actions';
import QuestionCard from './question-card';
import Logout from './logout';
import ReverseOrder from './reverse-order';
import Reset from './reset';
import Settings from './settings';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }

    componentDidMount() {
        this.props.dispatch(actions.getQuestion())
        const accessToken = Cookies.get('accessToken');
        fetch('/api/questions', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(questions =>
            this.setState({
                questions
            })
        );
    }

    render() {
        console.log(this.props.totalCorrect);
        return (
            <div className="question-page">
                <div className="nav-bar-container">
                    <nav className="nav-bar">
                        <div className="score">
                            <div id="score-title">
                                <span>Life Time Stats</span>
                            </div>
                            <div className="score-stats">
                                <span>Correct: {this.props.totalCorrect}</span>
                                <span>Incorrect: {this.props.totalIncorrect}</span>
                            </div>
                        </div>
                        <ul className="nav-bar-list">
                            <li>
                                <Settings />
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flash-card-container">
                    <QuestionCard />
                </div>
            </div>
        );
    }
}

const mapstateToProps = (state, props) => ({
    currentQuestion: state.currentQuestion,
    totalCorrect: state.totalCorrect,
    totalIncorrect: state.totalIncorrect
})

export default connect(mapstateToProps)(QuestionPage);
