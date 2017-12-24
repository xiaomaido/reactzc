const initStateResponse = {
	data: {
		comment_count: 0, 
		comments: [],
        imgs: [],
		is_like: 0,
        like_count: 0,
	}
}
const ID = 'id'
const API_PAGE_LIKE = APIS.API_EAT_SHOP_LIKE
const FETCH_PAGE = TYPES.FETCH_SHOP_DETAIL
export default class Index extends Quyou{
	state = {
        [FETCH_PAGE]:{
            response: initStateResponse
        },
		showCreateComment: false,
		valueCreateComment: '',
		textOkay: this.initTextOkay,
		isLike: false,
	}
	renderContent(){
        // document.title='商家信息'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
		const me = this
        const { query } = me.props.location
		const _t = query._t || 'EAT'
		const API_PAGE = APIS[`API_${_t}_SHOP_DETAIL`]
		me.requestDetail(me,FETCH_PAGE,API_PAGE)
	}
}
const Content = (props) => {
    const { response, me } = props
    const { data = { }  } = response
	const { showCreateComment, textOkay } = me.state
	const { query } = _location
	const _t = query._t || 'EAT'
	const API_PAGE_LIKE = APIS[`API_${_t}_SHOP_LIKE`]
	const API_PAGE_COMMENT = APIS[`API_${_t}_SHOP_COMMENT`]
	data.activities = Array.isArray(data.activities) ? data.activities : []
    return data.id ? (
		<div className="shop-detail">
			<Intro data={data} needCover={true} />
			<div className="gap"></div>
			<div className="necker">
				<div className="necker-box">
					<div className="intro"><span></span>简介</div>
					<div className="clearboth thinner-border"></div>
					<div className="descrip">{data.description||'暂无'}</div>
					{/* <div className="open-more">展开更多 ^</div> */}
					{/* <div className="clearboth thinner-border"></div> */}
					{/* <ProductList list={Array.apply(null,{length:5})} me={me} activities={data.activities} /> */}
				</div>
			</div>
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
			<CommentList 
				me={me}
				total={data.comment_count} 
				list={data.comments} />
		</div>
	): null
}
const ProductList = (props) => {
    const { list, me, activities = [] } = props
    return (
		<div className="video clearboth">
			{
				Array.isArray(activities) ? activities.map((d,i)=>(
					<div key={i}>
						<div className="title activity"><div className="activity">活</div>近期活动</div>
						<div className="descrip activity">
							活动名：{d.title}<br/>
							内容：<br/>
							{d.description}
						</div>
					</div>
				)) : null
			}
			<div className="title"><div>惠</div>商家优惠</div>
			<div className="vlist">
				<div className="ul-box">
					<ul style={{width:(list.length*fontSize*(200+30)/40)}}>
						{
							list.map((d,i)=>(
								<li key={i} onClick={me.openPage.bind(me, `abc${i===list.length-1?'':`/${i+1}`}`)}>
									<div className="icon poster" style={{backgroundImage:'url(http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg)'}}>
										<div className="sold">已售10</div>
									</div>
									<div className="text">焦糖玛奇朵</div>
									<div className="price">抢购 ¥18</div>
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