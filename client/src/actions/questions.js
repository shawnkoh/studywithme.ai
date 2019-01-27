import axios from 'axios';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const RECEIVE_CREATE_QUESTION = 'RECEIVE_CREATE_QUESTION';
export const RECEIVE_EDIT_QUESTION = 'RECEIVE_EDIT_QUESTION';
export const RECEIVE_DELETE_QUESTION = 'RECEIVE_DELETE_QUESTION';
export const OPEN_QUESTION = 'OPEN_QUESTION';
export const CLOSE_QUESTION = 'CLOSE_QUESTION';

export function fetchQuestions() {
  return function (dispatch) {
    dispatch(requestQuestions());
    return axios.get('/api/questions')
      .then(response => dispatch( receiveQuestions(response)) )
  }
}

function requestQuestions() {
  return { type: REQUEST_QUESTIONS };
}

function receiveQuestions(response) {
  return { type: RECEIVE_QUESTIONS, response };
}

export function createQuestion(payload) {
  return function (dispatch) {
    return axios.post('/api/questions', payload)
    .then( response => dispatch( receiveCreateQuestion(response)) )
  }
}

function receiveCreateQuestion(response) {
  return { type: RECEIVE_CREATE_QUESTION, response };
}

export function editQuestion(id, payload) {
  return function (dispatch) {
    return axios.patch(`/api/questions/${id}`, payload)
    .then(response => dispatch( receiveEditQuestion(response)) )
  }
}

function receiveEditQuestion(response) {
  return { type: RECEIVE_EDIT_QUESTION, response };
}

export function deleteQuestion(id) {
  return function(dispatch) {
    return axios.delete(`/api/questions/${id}`)
    .then(response => dispatch( receiveDeleteQuestion(id, response)) )
  }
}

function receiveDeleteQuestion(id, response) {
  return { type: RECEIVE_DELETE_QUESTION, id, response }
}

export function openQuestion(id) {
  return { type: OPEN_QUESTION, id };
}

export function closeQuestion() {
  return { type: CLOSE_QUESTION };
}