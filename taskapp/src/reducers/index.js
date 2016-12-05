import { combineReducers } from 'redux'
import tasks from './tasks'
import filters from './filters'

const tasksApp = combineReducers({
	tasks,
	filters
})

export default tasksApp