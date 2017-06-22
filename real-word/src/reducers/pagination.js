import merge from 'lodash/object/merge'
import union from 'lodash/array/union'

const pagination=({ mapActionToKey,types })=>{
	if(typeof mapActionToKey!=="function")
		throw new Error('mapActionToKey must be function')
	if(!Array.isArray(types)||types.length!==3)
		throw new Error('action types must be an array of 3 elements when result list pagination')
	if(!types.every(d=>(typeof d==="string"))){
		throw new Error('action type must be string')
	}
	const [REQUEST,SUCCESS,FAILURE]=types

	const paginationUpdate=( state={ isFetching:false, pageCount:0, nextPageUrl: undefined, ids:[] } ,action)=>{
		switch(action.type){
			case REQUEST: 
				return merge({}, state, {
          			isFetching: true
        		})
        	case SUCCESS: 
				return merge({}, state, {
          			isFetching: false
          			,pageCount:state.pageCount+1
          			,nextPageUrl:action.response.nextPageUrl
          			,ids:union(state.ids,action.response.result)
        		})
        	case FAILURE: 
				return merge({}, state, {
          			isFetching: false
        		})
		    default:
		        return state
		}
	}
	const paginationUpdateByKey=(state={},action)=>{
		switch(action.type){
			case REQUEST: 
        	case SUCCESS: 
        	case FAILURE: 
        		const key=mapActionToKey(action)
				return merge({}, state, {
					[key]:paginationUpdate(state[key],action)
        		})
		    default:
		        return state
		}
	}
	return paginationUpdateByKey
}
export default pagination