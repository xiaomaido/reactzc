import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import entities from './entities'
import paginations from './paginations'

const rootReducer=combineReducers({
	router
	,entities
	,paginations
})
export default rootReducer