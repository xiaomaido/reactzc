import { CommentFixed, CommentList, PostDetail } from './Quyou'
export default class Index extends Quyou{
	state = {
        FETCH_EAT_POST_DETAIL:{
            response: {
                data: { }
            }
        },
		showCreateComment: false,
		valueCreateComment: '',
	}
	render(){
		document.title='美食攻略'
		const me = this
		const { fetching, response = { data: { } } } = me.state.FETCH_EAT_POST_DETAIL
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
	}
    componentDidMount(){
		const me = this
		// me.props.params = {id: "8"}
        const { FETCH_EAT_POST_DETAIL } = me.state
        if(TYPES.FETCH_EAT_POST_DETAIL in ResponseState){
            me.setState({
                FETCH_EAT_POST_DETAIL: ResponseState[TYPES.FETCH_EAT_POST_DETAIL]
            })
            return false
        }
        me.setState({
            FETCH_EAT_POST_DETAIL: {
                ...FETCH_EAT_POST_DETAIL,
                fetching: 1,
            }
        })
        me.requestAPI(APIS.API_EAT_POST_DETAIL,{
			...me.props.params,
			user_id:0,
		},(response)=>{
            ResponseState[TYPES.FETCH_EAT_POST_DETAIL]={
                response,
                fetching: 0
            }
            me.setState({
                FETCH_EAT_POST_DETAIL: ResponseState[TYPES.FETCH_EAT_POST_DETAIL]
            })
        })
		
	}
	handleLike(e){

	}
	handleShowCreateComment(e){
		const me = this
		const { showCreateComment } = me.state
		me.setState({
			showCreateComment: !showCreateComment
		})
	}
	handleSaveCreateComment(e){
		const me = this
		const { valueCreateComment } = me.state
		if(valueCreateComment){
			alert(valueCreateComment)
		}
	}
	handleChangeCreateComment(e){
		const me = this
		me.setState({
			valueCreateComment: e.target.value
		})
	}
	handleFollow(id,e){
		alert('follow ' + id)
	}
}
const Content = (props) => {
    const { response, me } = props
    const { 
        data = {},
	} = response
	const { showCreateComment } = me.state
    return (
		<div className="yummy-detail">
			{
				showCreateComment ? <Mask /> : null
			}
			{
				showCreateComment ? 
					<CreateComment 
						handleChangeInput={me.handleChangeCreateComment.bind(me)} 
						handleClickOkay={me.handleSaveCreateComment.bind(me)} 
						handleClickCancel={me.handleShowCreateComment.bind(me)} /> : null
			}
			<CommentFixed 
				d={data} 
				handleLike={me.handleLike.bind(me)} 
				handleShowCreateComment={me.handleShowCreateComment.bind(me)} />
			<PostDetail 
				isImagePost={true} 
				d={data} 
				me={me} /> 
			<CommentList 
				total={data.comment_count} 
				list={data.comments} />
		</div>
	)
} 