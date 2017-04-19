import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

export class QuestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    onSubmitAnswer(e) {

    }

    render() {
        const currentQuestion = this.props.currentQuestion
        return (
            <div className="result-card">

            </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
    currentQuestion: state.currentQuestion,
})

export default connect(mapStateToProps)(QuestionCard);
