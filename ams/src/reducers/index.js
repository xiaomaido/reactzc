import { combineReducers } from 'redux'
import tasks from './tasks'
import filters from './filters'
import { routerReducer as routing } from 'react-router-redux';
// import { routerStateReducer as router } from 'redux-router'

const rootReducer=combineReducers({
	routing,
	tasks,
	filters,
})
export default rootReducer