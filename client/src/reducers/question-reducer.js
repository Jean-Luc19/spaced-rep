import * as actions from '../actions';

const initialState = {
    currentQuestion: {},
    userAnswer: null,
    correct: null,
    languageOrder: true,
    totalCorrect: 0,
    totalIncorrect: 0
}

const QuestionReducer = (state=initialState, action) => {
    switch (action.type) {
        case actions.GET_QUESTION_SUCCESS:
            console.log(action.question)
            return {...state, currentQuestion: action.question.question, previousQuestion: action.question.question, totalCorrect: action.question.scores[0], totalIncorrect: action.question.scores[1]};
        case actions.GET_QUESTION_FAILURE:
            console.error(action.err)
            return state;
        case actions.SUBMIT_ANSWER_SUCCESS:
            console.log(action);
            return {...state, correct: action.payload.correct, userAnswer: action.payload.userAnswer, totalCorrect: action.payload.scores[0], totalIncorrect: action.payload.scores[1]}
        case actions.SUBMIT_ANSWER_FAILURE:
            console.error(action.err)
            return state;
        case actions.NEXT_QUESTION_SUCCESS:
            return {...state, correct: null, userAnswer: null};
        case actions.REVERSE_LANGUAGE_ORDER_SUCCESS:
            return {...state, languageOrder:!state.languageOrder}
        case actions.RESET_SUCCESS:
            return {...state, totalCorrect: 0, totalIncorrect: 0}
        default:
            return state;
    }
}

export default QuestionReducer;
