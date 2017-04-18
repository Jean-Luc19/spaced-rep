import React from 'react';
import * as Cookies from 'js-cookie';
import { connect } from 'react-redux';
import * as actions from '../actions';
import QuestionCard from './flash-card';

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
        return (
            <div className="Question-page">
                <QuestionCard />
            </div>
        );
    }
}

const mapstateToProps = (state, props) => ({
    currentQuestion: state.currentQuestion
})

export default connect(mapstateToProps)(QuestionPage);
