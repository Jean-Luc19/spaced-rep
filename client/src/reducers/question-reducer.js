import * as actions from '../actions';

const initialState = {
    currentQuestion: {},
    userAnswer: null,
    result: null,
}

const QuestionReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.GET_QUESTION_SUCCESS:
            return {...state, currentQuestion: action.question.question}
        case actions.GET_QUESTION_FAILURE:
            console.error(action.err)
            return state;
        case actions.SUBMIT_ANSWER_SUCCESS:
            console.log(action);
            return {...state, result: action.payload}
        case actions.SUBMIT_ANSWER_FAILURE:
            console.error(action.err)
            return state;
        default:
            return state;
    }
}

export default QuestionReducer;
