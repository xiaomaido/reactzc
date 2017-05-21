import * as T from '../types'
const selectedSubreddit=(state='nba',action)=>{
	switch(action.type){
		case T.SELECT_SUBREDDIT: 
			return action.subreddit
		default:
			return state
	}
}
export default selectedSubreddit