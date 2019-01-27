import { combineReducers } from 'redux';
import {
  REQUEST_CREATE_TOPIC,
  RECEIVE_CREATE_TOPIC,
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
  RECEIVE_EDIT_TOPIC,
  RECEIVE_DELETE_TOPIC,
  OPEN_QUIZ,
  CLOSE_QUIZ,
  OPEN_SUPPORT,
  CLOSE_SUPPORT,
} from './actions';

import {
  REQUEST_QUESTIONS,
  RECEIVE_QUESTIONS,
  RECEIVE_CREATE_QUESTION,
  RECEIVE_EDIT_QUESTION,
  RECEIVE_DELETE_QUESTION,
  OPEN_QUESTION,
  CLOSE_QUESTION,
} from './actions/questions';

const initialStates = {
  fetchStatus: {
    isTopicsFetching: false,
    isQuestionsFetching: false,
    isTopicCreating: false,
  },
  topics: {},
  questions: {},
  quiz: {},
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
    case OPEN_SUPPORT:
      return Object.assign({}, state, { isSupportOpen: true });
    case CLOSE_SUPPORT:
      return Object.assign({}, state, { isSupportOpen: false });
    default:
      return state;
  }
}

function topics(state=initialStates.topics, action) {
  switch (action.type) {
    case RECEIVE_TOPICS:
      let reducer = (accumulator, topic) => (
        Object.assign(accumulator, {[topic.id]: topic})
      )
      return action.response.data.reduce(reducer, state);
    case RECEIVE_CREATE_TOPIC:
    case RECEIVE_EDIT_TOPIC:
      let topic = action.response.data;
      return Object.assign({}, state, {[topic.id]: topic});
    case RECEIVE_DELETE_TOPIC:
    // uses destructuring assignment syntax to delete topic immutably
    // to be replaced by createReducer from redux-starter-kit once I have sufficient native JS experience
      let { [action.id]: deletedTopic, ...withoutDeletedTopics } = state;
      return withoutDeletedTopics;
    default:
      return state;
  }
}

function questions(state=initialStates.questions, action) {
  switch (action.type) {
    case OPEN_QUESTION:
      return {...state, openedQuestion: action.id}
    case CLOSE_QUESTION:
      let { openedQuestion: id, ...withoutOpenQuestion } = state;
      return withoutOpenQuestion;
    case RECEIVE_QUESTIONS:
      let reducer = (accumulator, question) => (
        Object.assign(accumulator, {[question.id]: question})
      );
      return action.response.data.reduce(reducer, state);
    case RECEIVE_CREATE_QUESTION:
    case RECEIVE_EDIT_QUESTION:
      let question = action.response.data;
      return {...state, [question.id]: question};
    case RECEIVE_DELETE_QUESTION:
      let { [action.id]: deletedQuestion, ...others } = state;
      return others;
    default:
      return state;
  }
}

function quiz(state=initialStates.quiz, action) {
  switch (action.type) {
    case OPEN_QUIZ:
      return { open: true, questions: action.questions };
    case CLOSE_QUIZ:
      return { open: false };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  fetchStatus,
  topics,
  questions,
  quiz,
});

export default rootReducer;