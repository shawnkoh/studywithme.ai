import { combineReducers } from 'redux';
import {
  REQUEST_CREATE_TOPIC,
  RECEIVE_CREATE_TOPIC,
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
  RECEIVE_QUESTIONS,
  REQUEST_QUESTIONS
} from './actions';

const handleFabSubmit = (event) => {
  event.preventDefault();
}

const initialStates = {
  fetchStatus: {
    isTopicsFetching: false,
    isQuestionsFetching: false,
    isTopicCreating: false,
  },
  topics: [],
  questions: {},
  handleFabSubmit: handleFabSubmit
}

function fetchStatus(state=initialStates.fetchStatus, action) {
  switch (action.type) {
    case REQUEST_TOPICS:
      return Object.assign({}, state, { isTopicsFetching: true });
    case RECEIVE_TOPICS:
      return Object.assign({}, state, { isTopicsFetching: false });
    case REQUEST_QUESTIONS:
      return Object.assign({}, state, { isQuestionsFetching: true });
    case RECEIVE_QUESTIONS:
      return Object.assign({}, state, { isQuestionsFetching: false });
    case REQUEST_CREATE_TOPIC:
      return Object.assign({}, state, { isTopicCreating: true });
    case RECEIVE_CREATE_TOPIC:
      return Object.assign({}, state, { isTopicCreating: false });
    default:
      return state;
  }
}

function topics(state=initialStates.topics, action) {
  switch (action.type) {
    case RECEIVE_TOPICS:
      return action.response;
    case RECEIVE_CREATE_TOPIC:  
      return state.concat(action.response);
    default:
      return state;
  }
}

function questions(state=initialStates.questions, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return Object.assign({}, state, action.response);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  fetchStatus,
  topics,
  questions,
});

export default rootReducer;