import { REQUEST_API, SchemaObj } from '../middlewares/api'
import * as T from '../types'
const per_page=2
const requestUser=(name)=>({
	[REQUEST_API]:{
		types:[
			T.USER_REQUEST
			,T.USER_SUCCESS
			,T.USER_FAILURE
		]
		,schema:SchemaObj.USER
      	,endpoint:`users/${name}`
	}
})

const requestRepo=(name)=>({
	[REQUEST_API]:{
		types:[
			T.REPO_REQUEST
			,T.REPO_SUCCESS
			,T.REPO_FAILURE
		]
		,schema:SchemaObj.REPO
		,endpoint:`repos/${name}`

	}
})
const requestStarred=(name,nextPageUrl)=>({
	[REQUEST_API]:{
		types:[
			T.STARRED_REQUEST
			,T.STARRED_SUCCESS
			,T.STARRED_FAILURE
		]
		,schema:SchemaObj.REPO_ARRAY
		,endpoint:nextPageUrl

	}
	,name
})
const requestStargazers=(name,nextPageUrl)=>({
	[REQUEST_API]:{
		types:[
			T.STARGAZERS_REQUEST
			,T.STARGAZERS_SUCCESS
			,T.STARGAZERS_FAILURE
		]
		,schema:SchemaObj.USER_ARRAY
		,endpoint:nextPageUrl

	}
	,name
})

export const requestUserIfNeed=(name,requestFields=[])=>(dispatch,getState)=>requestThunkEntities(name,requestFields,dispatch,getState,requestUser,`users`)

export const requestRepoIfNeed=(name,requestFields=[])=>(dispatch,getState)=>requestThunkEntities(name,requestFields,dispatch,getState,requestRepo,`repos`)

export const requestStarredIfNeed=(name,nextPage)=>(dispatch,getState)=>requestThunkPagination(name,nextPage,dispatch,getState,requestStarred,`starredByUser`,`users/${name}/starred?per_page=${per_page}`)

export const requestStargazersIfNeed=(name,nextPage)=>(dispatch,getState)=>requestThunkPagination(name,nextPage,dispatch,getState,requestStargazers,`stargazersByRepo`,`repos/${name}/stargazers?per_page=${per_page}`)

function requestThunkEntities(name,requestFields,dispatch,getState,requestObj,key){
	const obj=getState().entities[key][name]
	if(obj&&requestFields.every(d=>obj.hasOwnProperty(d))) return null
	return dispatch(requestObj(name))
}
function requestThunkPagination(name,nextPage,dispatch,getState,requestObj,key,nextPageUrlParam){
	const {
		pageCount=0
		,nextPageUrl=nextPageUrlParam
	} = getState().paginations[key][name]||{}
	if(pageCount&&!nextPage) return null
	return dispatch(requestObj(name,nextPageUrl))
}





