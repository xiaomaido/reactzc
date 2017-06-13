import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import entities from './entities'
import paginations from './paginations'

const rootReducer=combineReducers({
	// router:routerStateReducer // 这里必须用router做属性名称，否则渲染不出App这个组件，与下面等价
	router
	,entities
	,paginations
})
export default rootReducer