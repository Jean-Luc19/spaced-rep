import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class QuestionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }

    componentDidMount() {
        this.props.dispatch(actions.getQuestion())
        console.log(this.props)
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
        const questions = this.state.questions.map((question, index) =>
            <li key={index}>{question}</li>
        );
        console.log(this.props.currentQuestion);

        return (
            <div>
                <ul className="question-list">
                    {questions}
                </ul>
                <h1></h1>
            </div>

        );
    }
}
const mapstateToProps = (state, props) => ({
    currentQuestion: state.currentQuestion
})
export default connect(mapstateToProps)(QuestionPage);
