const initStateResponse = {
	data: {
		comment_count: 0, 
		comments: [],
		is_like: 0,
		like_count: 0,
	}
}
const initTextOkay='发布'
const API_PAGE = APIS.API_EAT_MEDIA_DETAIL
const FETCH_PAGE = TYPES.FETCH_EAT_MEDIA_DETAIL
export default class Index extends Quyou{
	state = {
        [FETCH_PAGE]:{
            response: initStateResponse
        },
		showCreateComment: false,
		valueCreateComment: '',
		textOkay: initTextOkay,
		textPlaceholder: '想搭讪，先评论',
		isLike: false,
	}
	renderContent(){
		document.title='视频推荐'
		const me = this
		const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
		return fetching ? <Spin /> : <Content response={response} me={me} />
	}
    componentDidMount(){
		const me = this
        me.setState({
            [FETCH_PAGE]: {
                ...me.state[FETCH_PAGE],
                fetching: 1,
            }
		})
		const { params } = me.props
        me.requestAPI(API_PAGE,{
			...params,
			user_id:0,
		},(response)=>{
            me.setState({
                [FETCH_PAGE]: {
					response,
					fetching: 0
				}
            })
        })
	}
	handleLike(e){
		const me = this
		const { isLike } = me.state
		const { params } = me.props
		if(!isLike){
			me.setState({
				isLike: !isLike,
			})
			me.requestAPI(APIS.API_EAT_POST_LIKE,{
				post_id:params.id,
				user_id:1,
			},(response)=>{
				const { code = 0, data } = response
				if(code) {
					me.setState({
						isLike: !isLike,
					})
					return
				}
				ResponseState[TYPES.FETCH_EAT_POST_DETAIL].response.data.like_count += 1
				ResponseState[TYPES.FETCH_EAT_POST_DETAIL].response.data.is_like = true
				me.setState({
					FETCH_EAT_POST_DETAIL: ResponseState[TYPES.FETCH_EAT_POST_DETAIL],
				})
			})
		}
	}
	handleSaveCreateComment(e){
		const me = this
		const { valueCreateComment } = me.state
		const { params } = me.props
		if(valueCreateComment){
			me.setState({
				textOkay: `${initTextOkay}中...`,
			})
			me.requestAPI(APIS.API_EAT_POST_COMMENT,{
				content:valueCreateComment,
				post_id:params.id,
				user_id:1,
			},(response)=>{
				const { code = 0, data } = response
				if(code) return
				if(!data.id) return
				ResponseState[TYPES.FETCH_EAT_POST_DETAIL].response.data.comment_count += 1
				ResponseState[TYPES.FETCH_EAT_POST_DETAIL].response.data.comments.unshift(data)
				me.setState({
					FETCH_EAT_POST_DETAIL: ResponseState[TYPES.FETCH_EAT_POST_DETAIL],
					showCreateComment: false,
					valueCreateComment: '',
					textOkay: initTextOkay,
				})
				// document.getElementsByClassName('comment-title')[0].scrollIntoView()
				window.scrollTo(0, document.getElementsByClassName('comment-title')[0].offsetTop-fontSize*2.2)
			})
		}
	}
	handleShowCreateComment(e){
		const me = this
		const { showCreateComment } = me.state
		me.setState({
			showCreateComment: !showCreateComment
		})
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
	const { showCreateComment, textOkay, textPlaceholder } = me.state
    return data.id ? (
		<div className="yummy-detail">
			{
				showCreateComment ? <Mask /> : null
			}
			{
				showCreateComment ? 
					<CreateComment 
						textOkay={textOkay}
						handleChangeInput={me.handleChangeCreateComment.bind(me)} 
						handleClickOkay={me.handleSaveCreateComment.bind(me)} 
						handleClickCancel={me.handleShowCreateComment.bind(me)} /> : null
			}
			<CommentFixed 
				d={data} 
				textPlaceholder={textPlaceholder}
				handleLike={me.handleLike.bind(me)} 
				handleShowCreateComment={me.handleShowCreateComment.bind(me)} />
			<PostDetail 
				isVideoPost={true} 
				d={data} 
				me={me} /> 
			<CommentList 
				total={data.comment_count} 
				list={data.comments} />
		</div>
	) : null
} 