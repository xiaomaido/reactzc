// import { combineReducers } from 'redux'
// import { routerReducer as routing } from 'react-router-redux'
// import tasks from './tasks'
// import filters from './filters'
// import user from './user'

// const rootReducer=combineReducers({
// 	routing,
// 	tasks,
// 	filters,
// 	user,
// })
// export default rootReducer

import routing from './routing'
import { combineReducers } from 'redux-immutable'
const rootReducer=combineReducers({
	routing
})
export default rootReducer
