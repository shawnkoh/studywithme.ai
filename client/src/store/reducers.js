import { TYPES } from './actions'

const initialStates = {
  settings: {
    notifications: true
  },
  topics: {
    isFetching: false
  }
}

export const settings = (state = initialStates.settings, action) => {
  switch (action.type) {
    case TYPES.SET_NOTIFICATIONS:
      return Object.assign({}, state, { notifications: action.bool })
    default:
      return state
  }
}

export const topics = (state = initialStates.topics, action) => {
  switch (action.type) {
    case TYPES.FETCH_TOPICS_REQUEST:
      return Object.assign({}, state, { isFetching: true } )
    default:
      return state
  }
}