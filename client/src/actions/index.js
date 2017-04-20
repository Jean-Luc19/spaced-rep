import 'isomorphic-fetch';
import * as Cookies from 'js-cookie';

export const GET_QUESTION = 'GET_QUESTION';

export const getQuestion = () => dispatch => {
    const accessToken = Cookies.get('accessToken')
    return fetch('/api/getQuestion', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        return response.json();
    })
    .then(question => {
        return dispatch(getQuestionSuccess(question))
    })
    .catch(err => {
        return dispatch(getQuestionFailure(err))
    })
};

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';

export const getQuestionSuccess = (question) => ({
    type: GET_QUESTION_SUCCESS,
    question
});

export const GET_QUESTION_FAILURE = 'GET_QUESTION_FAILURE';

export const getQuestionFailure = (err) => ({
    type: GET_QUESTION_FAILURE,
    err
});

export const NEXT_QUESTION = 'NEXT_QUESTION';

export const NEXT_QUESTION_SUCCESS = 'NEXT_QUESTION_SUCCESS';

export const nextQuestionSuccess = () => ({
    type: NEXT_QUESTION_SUCCESS
})

export const nextQuestion = () => dispatch => {
    return dispatch(getQuestion())
    .then(() => {
        return dispatch(nextQuestionSuccess())
    })
}

export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';

export const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS';

export const submitAnswerSuccess = (correct, userAnswer) => ({
    type: SUBMIT_ANSWER_SUCCESS,
    payload: {
        correct,
        userAnswer
    }
});

export const SUBMIT_ANSWER_FAILURE = 'SUBMIT_ANSWER_FAILURE';

export const submitAnswerFailure = (err) => ({
    type: SUBMIT_ANSWER_FAILURE,
    err
});

export const submitAnswer = (correct, questionId, userAnswer) => dispatch => {
    console.log(correct, questionId, userAnswer);
    const accessToken = Cookies.get('accessToken');
    return fetch('/api/answer', {
        method: 'post',
        headers: {
            'Authorization': `bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            answer: correct,
            questionId: questionId
        })
    })
    .then(response => {
        return dispatch(submitAnswerSuccess(correct, userAnswer));
    })
    .catch(err => {
        return dispatch(submitAnswerFailure(err));
    })
}

export const RESET = 'RESET';

export const reset = () => dispatch => {
    console.log('hello');
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken);
    return fetch('/api/reset', {
        headers: {
            'Authorization': `bearer ${accessToken}`
        }
    })
    .then(response => {
        return dispatch(resetSuccess());
    })
    .catch(err => {
        return dispatch(resetError(err));
    })
}

export const RESET_ERROR = 'RESET_ERROR';

export const resetError = (err) => ({
    type: RESET_ERROR,
    err
});

export const RESET_SUCCESS = 'RESET_SUCCESS';

export const resetSuccess = () => ({
    type: RESET_SUCCESS,
})
