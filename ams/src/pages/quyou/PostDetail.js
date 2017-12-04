const initStateResponse = {
	data: {
		comment_count: 0, 
		comments: [],
		is_like: 0,
		like_count: 0,
	}
}
const isVideo = false
const ID = 'post_id'
const FETCH_PAGE = TYPES.FETCH_POST_DETAIL
export default class Index extends Quyou{
	state = {
        [FETCH_PAGE]:{
            response: initStateResponse
        },
		showCreateComment: false,
		valueCreateComment: '',
		textOkay: this.initTextOkay,
		isDoLike: false,
	}
	renderContent(){
		document.title='美食攻略'
		const me = this
		const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
	}
    componentDidMount(){
		const me = this
        const { query } = me.props.location
		const _t = query._t || 'EAT'
		const API_PAGE = APIS[`API_${_t}_POST_DETAIL`]
		me.requestDetail(me,FETCH_PAGE,API_PAGE)
	}
}
const Content = (props) => {
    const { response, me } = props
    const { 
        data = {},
	} = response
	const { showCreateComment, textOkay } = me.state
	const { query } = _location
	const _t = query._t || 'EAT'
	const API_PAGE_LIKE = APIS[`API_${_t}_POST_LIKE`]
	const API_PAGE_COMMENT = APIS[`API_${_t}_POST_COMMENT`]
    return data.id ? (
		<div className="yummy-detail">
			{
				showCreateComment ? 
					<CreateComment 
						textOkay={textOkay} 
						handleClickOkay={me.handleSaveCreateComment.bind(me, { API_PAGE_COMMENT, FETCH_PAGE, ID })} 
						handleClickCancel={me.handleShowCreateComment.bind(me)} 
						handleChangeInput={me.handleChangeCreateComment.bind(me)} /> : null
			}
			<CommentFixed 
				d={data} 
				handleLike={me.handleLike.bind(me, { API_PAGE_LIKE, FETCH_PAGE, ID })} 
				handleShowCreateComment={me.handleShowCreateComment.bind(me)} />
			<PostDetail 
				isVideo={isVideo} 
				d={data} 
				me={me} /> 
			<CommentList 
				total={data.comment_count} 
				list={data.comments} />
		</div>
	) : null
} 