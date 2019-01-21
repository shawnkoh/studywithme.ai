import { createStore, combineReducers } from 'redux'
import { settings, topics } from './reducers'

const rootReducer = combineReducers({
  settings,
  topics
})

export default createStore(rootReducer);