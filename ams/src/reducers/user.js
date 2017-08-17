const user=(state={},action)=>{
	if(action.response&&action.response.id){
		return Object.assign({},state,action.response)
	}
	return state
}
export default user