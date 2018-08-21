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
		isDoFollow: false,
		textFollow: '关注',
	}
	renderContent(){
		// document.title='美食攻略'
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
	const API_MY_DO_FOLLOW = APIS[`API_MY_DO_FOLLOW`]
	const cssObj = query.webview === '1' ? {paddingTop:0}:{}
	// const API_PAGE_LIKE = APIS[`API_${_t}_POST_LIKE`]
	// const API_PAGE_COMMENT = APIS[`API_${_t}_POST_COMMENT`]
	document.title = data && data.title ? data.title : document.title
    return data.id ? (
		<div className="yummy-detail" style={cssObj}>

			{/*<CommentFixed */}
				{/*d={data} */}
				{/*handleLike={me.handleLike.bind(me, { API_PAGE_LIKE, FETCH_PAGE, ID })} */}
				{/*handleShowCreateComment={me.handleShowCreateComment.bind(me)} />*/}
			<PaperDetail
				noShowHeder={true}
				isVideo={isVideo} 
				d={data} 
				params={{ API_MY_DO_FOLLOW, FETCH_PAGE }}
				me={me} /> 
			{/*<CommentList*/}
				{/*me={me} */}
				{/*total={data.comment_count} */}
				{/*list={data.comments} />*/}
		</div>
	) : null
} 