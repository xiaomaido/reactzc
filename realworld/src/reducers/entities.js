import merge from 'lodash/object/merge'
// 根据返回的结果实体对象实时更新缓存的实体对象
const entities=( state={ users:{}, repos:{} } ,action)=>{
	if(action.response&&action.response.entities){
		return merge({},state,action.response.entities)
	}
	return state
}
export default entities
