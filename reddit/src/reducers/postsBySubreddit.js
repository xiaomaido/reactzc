import * as T from '../types'

const posts=(state={
		isFetching:false
		,didInvalidate:false
		,items:[]
	},action)=>{
	switch(action.type){
		case T.INVALIDATE_SUBREDDIT:
			return Object.assign({},state,{
				didInvalidate:true
			})
		case T.REQUEST_POSTS:
			return Object.assign({},state,{
				isFetching: true
				,didInvalidate:false
			})
		case T.RECEIVE_POSTS:
			return Object.assign({},state,{
				isFetching: false
				,didInvalidate:false
				,items:action.items
				,receivedAt:action.receivedAt
			})
		default:
			return state
	}
}
const postsBySubreddit=(state={},action)=>{
	switch(action.type){
		case T.INVALIDATE_SUBREDDIT:
		case T.REQUEST_POSTS:
		case T.RECEIVE_POSTS:
			// let nextState={}
			// nextState[action.subreddit]=posts(state[action.subreddit],action)
			// 与上面的写法等价
			let nextState={
				[action.subreddit]:posts(state[action.subreddit],action)
			}
			return Object.assign({},state,nextState)
			// 与上面的写法等价
			// return [
   //              ...state,
   //              nextState
   //          ]
		default:
			return state
	}
}
export default postsBySubreddit

