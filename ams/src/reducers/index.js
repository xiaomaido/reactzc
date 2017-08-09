import { combineReducers } from 'redux'
import tasks from './tasks'
import filters from './filters'
// import { routerStateReducer as router } from 'redux-router'

const rootReducer=combineReducers({
	tasks,
	filters,
})
export default rootReducer