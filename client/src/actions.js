import axios from 'axios';

// Synchronous actions

// Network request actions

export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const REQUEST_CREATE_TOPIC = 'REQUEST_CREATE_TOPIC';
export const RECEIVE_CREATE_TOPIC = 'RECEIVE_CREATE_TOPIC';

export function fetchTopics() {
  return function (dispatch) {
    dispatch(requestTopics());
    return axios.get('/api/topics')
      .then(response => dispatch( receiveTopics(response)) )
  }
}

function requestTopics() {
  return { type: REQUEST_TOPICS };
}

function receiveTopics(response) {
  return { type: RECEIVE_TOPICS, response };
}

export function createTopic(title, description) {
  return function (dispatch) {
    dispatch(requestCreateTopic(title, description));
    let payload = {title: title, description: description};
    return axios.post('/api/topics', payload)
      .then(response => dispatch( receiveCreateTopic(response)) )
  }
}

function requestCreateTopic(title, description) {
  return { type: REQUEST_CREATE_TOPIC, title, description };
}

function receiveCreateTopic(response) {
  return { type: RECEIVE_CREATE_TOPIC, response };
}

// Thunk middleware passes dispatch method as an argument to the function
// thus making it able to dispatch functions to itself


export const RECEIVE_EDIT_TOPIC = 'RECEIVE_EDIT_TOPIC';

function receiveEditTopic(response) {
  return { type: RECEIVE_EDIT_TOPIC, response };
}

export function editTopic(id, payload) {
  return function(dispatch) {
    return axios.patch(`/api/topics/${id}`, payload)
      .then(response => dispatch( receiveEditTopic(response)) )
  }
}

export const RECEIVE_DELETE_TOPIC = 'RECEIVE_DELETE_TOPIC';

function receiveDeleteTopic(id, response) {
  return { type: RECEIVE_DELETE_TOPIC, id, response };
}

export function deleteTopic(id) {
  return function(dispatch) {
    return axios.delete(`/api/topics/${id}`)
      .then(response => dispatch( receiveDeleteTopic(id, response)) )
  }
}

// -------------------- STATUS --------------------

export const OPEN_QUIZ = 'OPEN_QUIZ';

export function openQuiz(questions) {
  return { type: OPEN_QUIZ, questions };
};

export const CLOSE_QUIZ = 'CLOSE_QUIZ';

export function closeQuiz() {
  return { type: CLOSE_QUIZ };
};

export const OPEN_SUPPORT = 'OPEN_SUPPORT';

export function openSupport() {
  return { type: OPEN_SUPPORT };
};

export const CLOSE_SUPPORT = 'CLOSE_SUPPORT';

export function closeSupport() {
  return { type: CLOSE_SUPPORT };
};


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