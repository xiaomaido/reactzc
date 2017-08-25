const user=(state={},action)=>{
	action.response=action.response||action.payload
	if(action.response&&action.response.id){
		return Object.assign({},state,action.response)
	}
	return state
}
export default user