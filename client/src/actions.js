import axios from 'axios';

// Synchronous actions

// Network request actions

export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const REQUEST_CREATE_TOPIC = 'REQUEST_CREATE_TOPIC';
export const RECEIVE_CREATE_TOPIC = 'RECEIVE_CREATE_TOPIC';

function requestTopics() {
  return { type: REQUEST_TOPICS };
}

function receiveTopics(response) {
  return { type: RECEIVE_TOPICS, response };
}

function requestQuestions() {
  return { type: REQUEST_QUESTIONS };
}

function receiveQuestions(response) {
  return { type: RECEIVE_QUESTIONS, response };
}

function requestCreateTopic(title, description) {
  return { type: REQUEST_CREATE_TOPIC, title, description };
}

function receiveCreateTopic(response) {
  return { type: RECEIVE_CREATE_TOPIC, response };
}

// export const REQUEST_EDIT_TOPIC = 'REQUEST_EDIT_TOPIC';

// function requestEditTopic() {
//   return { type: REQUEST_EDIT_TOPIC };
// }

// Thunk middleware passes dispatch method as an argument to the function
// thus making it able to dispatch functions to itself

export function fetchTopics() {
  return function (dispatch) {
    dispatch(requestTopics());
    return axios.get('/api/topics')
      .then(response => dispatch(receiveTopics(response.data)))
        // return dispatch(receiveTopics(response)))
  }
}

export function fetchQuestions() {
  return function (dispatch) {
    dispatch(requestQuestions());
    return axios.get('/api/questions')
      .then(response => dispatch(receiveQuestions(response.data)))
  }
}

export function createTopic(title, description) {
  return function (dispatch) {
    dispatch(requestCreateTopic(title, description));
    let payload = {title: title, description: description};
    return axios.post('/api/topics', payload)
      .then(response => dispatch(receiveCreateTopic(response.data)))
  }
}

export const RECEIVE_EDIT_TOPIC = 'RECEIVE_EDIT_TOPIC';

function receiveEditTopic(response) {
  return { type: RECEIVE_EDIT_TOPIC, response };
}

export function editTopic(id, payload) {
  return function(dispatch) {
    return axios.patch(`/api/topics/${id}`, payload)
      .then(response => dispatch(receiveEditTopic(response.data)))
  }
}

/*
state schema

fetchStatus: {
  topicsIsFetching
  questionsIsFetching
}

topics: {
  0...n: {
    id
    title
    description
  }
}

questions: {
  0...n: {
    id
    topic_id
    name
    answer
  }
}
*/