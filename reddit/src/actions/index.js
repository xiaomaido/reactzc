import fetch from 'isomorphic-fetch'
import * as T from '../types'

const selectSubreddit=(subreddit)=>({
	type: T.SELECT_SUBREDDIT
	,subreddit
})
const invalidateSubreddit=(subreddit)=>({
	type: T.INVALIDATE_SUBREDDIT
	,subreddit
})
const requestPosts=(subreddit)=>({
	type: T.REQUEST_POSTS
	,subreddit
})
const receivePosts=(subreddit,res)=>({
	type: T.RECEIVE_POSTS
	,subreddit
	,receivedAt: Date.now()
	,items:res.items||res.data.children.map(d=>d.data)
})
const requestPostsFetch=(subreddit)=>{
	return dispatch => {
		// 请求数据中 fetch data 
		fetch(`http://www.subreddit.com/r/${subreddit}.json`)
		.then(response=>response.json())
		.then(result => dispatch(receivePosts(subreddit, result))) // UI交互应渲染result列表
	    return dispatch(requestPosts(subreddit)) // UI交互应显示 加载中... 或 loading图标
	}
}
const requestPostsFetchShould=(subreddit,postsBySubreddit)=>{
	const d=postsBySubreddit[subreddit]
	if(!d){
		return true
	}else if(d.isFetching){
		return false
	}else{
		return d.didInvalidate
	}
}
const requestPostsFetchIfNeed=(subreddit)=>((dispatch,getState)=>{
	const { postsBySubreddit }=getState()
	if(requestPostsFetchShould(subreddit,postsBySubreddit)){
		return dispatch(requestPostsFetch(subreddit))
	}
	else{
		const result=postsBySubreddit[subreddit]
		return dispatch(receivePosts(subreddit,result))
	}
})
export { selectSubreddit,invalidateSubreddit,requestPostsFetchIfNeed }