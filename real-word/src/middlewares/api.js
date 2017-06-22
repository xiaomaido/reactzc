import fetch from 'isomorphic-fetch'
import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'

const USER = new Schema('users',{
	idAttribute: 'login'
})
const REPO = new Schema('repos',{
  	idAttribute: 'fullName'
})
REPO.define({
  	owner: USER
})
export const SchemaObj={
	USER: USER,
	REPO: REPO,
	USER_ARRAY:arrayOf(USER),
	REPO_ARRAY:arrayOf(REPO)
}
export const REQUEST_API=Symbol('REQUEST API')

const API_ROOT = 'https://api.github.com/'
const getNextPageUrl=(response)=>{
	const link=response.headers.get('link')
	if (!link) {
		return null
	}
  	const nextLink=link.split(',').find(s => s.indexOf('rel="next"') > -1)
	if (!nextLink) {
		return null
	}
	return nextLink.split(';')[0].slice(1, -1)
}
const requestAPI=(endpoint, schema)=>{
	const url=(endpoint.indexOf(API_ROOT)===-1)?(API_ROOT+endpoint):endpoint
	return fetch(url)
	.then(response=>response.json().then(json => ({ json, response })))
	.then(({ json, response }) => {
    	if (!response.ok) {
        	return Promise.reject(json)
      	}
      	const camelizedJson=camelizeKeys(json)
      	const nextPageUrl=getNextPageUrl(response)
    	return Object.assign({},normalize(camelizedJson, schema),{ nextPageUrl })
    })
}
const API=store=>next=>action=>{
	const REQ_API=action[REQUEST_API]
	if (typeof REQ_API === 'undefined') {
    	return next(action)
  	}
  	let { endpoint, schema, types } = REQ_API
  	if(typeof endpoint === 'function') {
    	endpoint = endpoint(store.getState())
  	}
  	if (typeof endpoint !== 'string') {
	    throw new Error('异步请求的URL必须是字符串.')
	}
	if (!schema) {
		throw new Error('Specify one of the exported Schemas.')
	}
	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error('Expected an array of three action types.')
	}
	if (!types.every(type => typeof type === 'string')) {
		throw new Error('Expected action types to be strings.')
	}
	function actionWith(data) {
	    const finalAction = Object.assign({}, action, data)
	    delete finalAction[REQ_API]
	    return finalAction
	}

	const [REQUEST,SUCCESS,FAILURE]=types

	next(actionWith({ type: REQUEST })) 

	return requestAPI(endpoint, schema).then(
		response => next(actionWith({
			response,
			type: SUCCESS
		})),
		error => next(actionWith({
    		error: error,
			type: FAILURE
		}))
	)
}
export default API