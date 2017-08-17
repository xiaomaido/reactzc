import { REQUEST_API } from '../middlewares/FetchAPI'
import * as T from '../types'
const requestUser=(name)=>({
	[REQUEST_API]:{
		types:[
			T.USER_REQUEST
			,T.USER_SUCCESS
			,T.USER_FAILURE
		]
      	,endpoint:`users/${name}`
	}
})
export const requestUserIfNeed=(name)=>(dispatch,getState)=>requestThunkEntities(name,dispatch,getState,requestUser,`users`)

function requestThunkEntities(name,dispatch,getState,requestObj,key){
	return dispatch(requestObj(name))
}