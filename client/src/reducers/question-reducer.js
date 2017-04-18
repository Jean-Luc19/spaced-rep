import * as actions from '../actions';

const initialState = {
    currentQuestion: {}
}

const QuestionReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.GET_QUESTION_SUCCESS:
            return {...state, currentQuestion: action.question}
        case actions.GET_QUESTION_FAILURE:
            console.error(action.err)
            return state
        default:
            return state;
    }
}

export default QuestionReducer;
