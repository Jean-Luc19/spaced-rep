import * as actions from '../actions';

const initialState = {
    currentQuestion: {},
    previousQuestion: {},
    userAnswer: null,
    correct: null,
}

const QuestionReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.GET_QUESTION_SUCCESS:
            return {...state, currentQuestion: action.question.question, previousQuestion: action.question.question}
        case actions.GET_QUESTION_FAILURE:
            console.error(action.err)
            return state;
        case actions.SUBMIT_ANSWER_SUCCESS:
            console.log(action);
            return {...state, correct: action.payload.correct, userAnswer: action.payload.userAnswer}
        case actions.SUBMIT_ANSWER_FAILURE:
            console.error(action.err)
            return state;
        default:
            return state;
    }
}

export default QuestionReducer;
