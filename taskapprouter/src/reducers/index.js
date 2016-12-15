import { combineReducers } from 'redux'
import tasks from './tasks'

const tasksApp = combineReducers({
	tasks
})

export default tasksApp