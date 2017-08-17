import { combineReducers } from 'redux'
import tasks from './tasks'
import filters from './filters'
import { routerReducer as routing } from 'react-router-redux'

const rootReducer=combineReducers({
	routing,
	tasks,
	filters,
})
export default rootReducer