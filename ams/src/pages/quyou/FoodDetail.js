const initStateResponse = {
	data: {
        stag_names: [],
        images: [],
        custom_avg: 0,
		is_like: 0,
        like_count: 0,
        rec_desc: '',
        star_count: 5,
	}
}
const initTextOkay='发布'
const API_PAGE = APIS.API_EAT_FOOD_DETAIL
const FETCH_PAGE = TYPES.FETCH_EAT_FOOD_DETAIL
export default class Index extends Quyou{
    state = {
        [FETCH_PAGE]:{
            response: initStateResponse
        },
		showCreateComment: false,
		valueCreateComment: '',
		textOkay: initTextOkay,
		isLike: false,
	}
	renderContent(){
        document.title='美食信息'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        return fetching ? <Spin /> : <Content response={response} me={me} />
    }
    componentDidMount(){
		const me = this
		me.requestDetail(me,FETCH_PAGE,API_PAGE)
	}
	handleLike(e){
        
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
}
const Content = (props) => {
    const { response, me } = props
    const { data = {}  } = response
    const { showCreateComment, textOkay } = me.state
    return data.id ? (
        <div className="shop-detail food-detail">
            <div className="fooder">
                <div className="stars-permoney">
                    <StarsShow number={data.star_count} />
                    <div className="permoney clearboth">¥{data.custom_avg}/人</div>
                </div>
                <div className="food-name">{data.title}</div>
                <div className="discount-tags">
                    <ul className="discount">
                        {
                            data.rec_desc.split(' ').map((da,i)=><li key={i}>{da}</li>)
                        }
                    </ul>
                    <ul className="tags">
                        {
                            data.stag_names.map((da,i)=><li key={i}>{da.tagname}</li>)
                        }
                    </ul>
                </div>
                <PictureList list={data.images} me={me} />
                <div className="clearboth thinner-border"></div>
            </div>
            <Intro data={data.seller_info} />
            <div className="gap"></div>
            <div className="necker">
                <div className="necker-box">
                    <div className="intro"><span></span>菜品介绍</div>
                    <div className="clearboth thinner-border"></div>
                    <div className="descrip">{data.description}</div>
                    {/* <div className="open-more">展开更多 ^</div> */}
                    <div className="clearboth thinner-border"></div>
                    <div className="discount">
                        <div className="title"><div>惠</div>本品优惠</div>
                        <div className="buy-box">
                            <div className="left">
                                <div className="price">￥24.9<span>原价￥36.9</span></div>
                            </div>
                            <div className="right">抢购</div>
                        </div>
                    </div>
                </div>
            </div>
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
				handleLike={me.handleLike.bind(me)} 
				handleShowCreateComment={me.handleShowCreateComment.bind(me)} />
			<CommentList 
				total={data.comment_count} 
				list={data.comments} />
        </div>
    ): null
}
const PictureList = (props) => {
    const { list, me } = props
    return (
		<div className="video clearboth">
			<div className="vlist">
				<div className="ul-box">
					<ul style={{width:(list.length*fontSize*(200+30)/40)}}>
						{
							list.map((d,i)=>(
								<li key={i}> 
									<div className="icon poster" style={{backgroundImage:`url(${d})`}}>
									</div>
								</li>
							))
						}
					</ul>
				</div>
			</div>
			<div className="gap"></div>
		</div>
    )
}