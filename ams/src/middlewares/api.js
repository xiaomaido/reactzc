import fetch from 'isomorphic-fetch'


export const REQUEST_API=Symbol('REQUEST API')

const API_ROOT = 'https://api.github.com/'

const requestAPI=(endpoint)=>{
	const url=(endpoint.indexOf(API_ROOT)===-1)?(API_ROOT+endpoint):endpoint
	return fetch(url)
	.then(response=>response.json().then(json => ({ json, response })))
	.then(({ json, response }) => {
    	if (!response.ok) {
        	return Promise.reject(json)
      	}
    	return Object.assign({},json)
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

	return requestAPI(endpoint).then(
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