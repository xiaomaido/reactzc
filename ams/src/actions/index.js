import { REQUEST_API } from '../middlewares/FetchAPI'
import * as T from '../types'

const API_ROOT = 'https://api.github.com/'

const requestUser=(endpoint)=>({
	[REQUEST_API]:{
		types:[
			T.USER_REQUEST,
			T.USER_SUCCESS,
			T.USER_FAILURE,
		],
      	endpoint:(endpoint.indexOf(API_ROOT)===-1)?(API_ROOT+endpoint):endpoint,
	}
})

// import { RSAA } from 'redux-api-middleware' // RSAA=Redux Standard API-calling Actions
// const requestUser=(endpoint)=>({
// 	[RSAA]: {
// 		types:[
// 			T.USER_REQUEST,
// 			// T.USER_SUCCESS,
// 			{
// 				// type: 'SUCCESS',
// 				type: T.USER_SUCCESS,
// 				payload: (action, state, response) => {
// 					const contentType = response.headers.get('Content-Type');
// 					if (contentType && ~contentType.indexOf('json')) {
// 						// Just making sure response.json() does not raise an error 
// 						return response.json().then((json) => Object.assign({},json));
// 					}
// 				}
// 			},
// 			T.USER_FAILURE,
// 		],
// 		endpoint: (endpoint.indexOf(API_ROOT)===-1)?(API_ROOT+endpoint):endpoint,
// 		method: 'GET',
// 	}
// })

export const requestUserIfNeed=(endpoint)=>(dispatch,getState)=>getState().user.login?null:dispatch(requestUser(endpoint))
