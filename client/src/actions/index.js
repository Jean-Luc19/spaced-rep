import 'isomorphic-fetch';
import * as Cookies from 'js-cookie';

export const GET_QUESTION = 'GET_QUESTION';

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

export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';

export const SUBMIT_ANSWER_SUCCESS = 'SUBMIT_ANSWER_SUCCESS';

export const SUBMIT_ANSWER_FAILURE = 'SUBMIT_ANSWER_FAILURE';

export const LOGOUT = 'LOGOUT';

export const getQuestion = () => dispatch => {
    const accessToken = Cookies.get('accessToken')
    console.log(accessToken)
    return fetch('/api/getQuestion', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(question => {
        console.log("yo")
        return dispatch(getQuestionSuccess(question))
    })
    .catch(err => {
        return dispatch(getQuestionFailure(err))
    })
};
