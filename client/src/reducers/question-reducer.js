import * as actions from '../actions';

const initialState = {
    currentQuestion: {}
}

const QuestionReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.GET_QUESTION_SUCCESS:
            console.log(action.question.question);
            return {...state, currentQuestion: action.question.question}
        case actions.GET_QUESTION_FAILURE:
            console.error(action.err)
            return state
        default:
            return state;
    }
}

export default QuestionReducer;
