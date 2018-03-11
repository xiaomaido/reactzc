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

const API_MY_COUPON_RECEIVE = APIS.API_MY_COUPON_RECEIVE
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
		window.state=this.state
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
	handleReceiveCoupon({coupon_id,stock}){
		const me=this
		if(stock){
			me.requestAPI(API_MY_COUPON_RECEIVE,{
				coupon_id,
				token: me.user.token,
			},(response={})=>{
				const { code=-1, data="", msg="" } = response
				// {"msg":"已经领取","data":"","code":20012}
				if(code){
					alert(msg)
					return
				}
				// {"msg":"","data":true,"code":0}
				alert('领取成功')
				const FETCH_TEMP = me.state[FETCH_PAGE]
				const temp = FETCH_TEMP.response.data.coupon.find(d=>d.id===coupon_id)
				temp.reciev_count += 1
				this.setState({
					[FETCH_PAGE]: FETCH_TEMP
				})
			})
		}
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
	data.description = data.description || ''
	const Composed = (
		<div className="necker" style={{padding: 0}}>
			<div className="necker-box">
				<ProductList list={data.coupon} me={me} activities={data.activities} />
			</div>
		</div>
	)
	// {
	// 	data.description.split('<br>').map((d,i)=><div className="descrip" key={i}>{d}</div>)
	// }
	// <div className="open-more">展开更多 ^</div>
	// <ProductList list={data.coupon} me={me} activities={data.activities} />
    return data.id ? (
		<div className="shop-detail">
			<Intro data={data} needCover={true} Composed={Composed} />
			<div className="gap"></div>
			<div className="necker">
				<div className="necker-box">
					<div className="intro"><span></span>简介</div>
					<div className="clearboth thinner-border"></div>
					<div style={{paddingTop:'0.5rem',paddingRight: '1.1rem'}} dangerouslySetInnerHTML={{__html: data.description||''}}></div>
					<div className="clearboth"></div>
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
	let { list, me, activities = [] } = props
    return (
		<div className="video clearboth">
			{
				Array.isArray(activities) ? activities.map((d,i)=>(
					<div key={i}>
						<div style={{padding: '10px 0 2px'}}><div className="clearboth thinner-border"></div></div>
						<div className="title activity"><div className="activity">活</div>近期活动</div>
						<div className="descrip activity">
							活动名：{d.title}<br/>
							内容：<br/>
							{d.description}
						</div>
					</div>
				)) : null
			}
			{
				Array.isArray(list) ? (
					<div>
						<div style={{padding: '10px 0 2px'}}><div className="clearboth thinner-border"></div></div>
						<div className="title"><div>惠</div>商家优惠</div>
						<div className="vlist">
							<div className="ul-box">
								<ul style={{width:(list.length*fontSize*(200+30)/40)}}>
									{
										list.map((d,i)=>{
											d.imgs=Array.isArray(d.imgs)?d.imgs:[]
											return (
												<li key={i}>
													<div className="icon poster" style={{backgroundImage:`url(${d.imgs[0]})`}}>
														{
															d.reciev_count?<div className="sold">{d.reciev_count}人已领</div>:null
														}
													</div>
													<div className="text">{d.title}</div>
													<div className="price">{d.desc_title}</div>
													<div className={classnames({btn:true,enable:d.stock})} onClick={me.handleReceiveCoupon.bind(me,{
														coupon_id:d.id,
														stock:d.stock,
													})}>{d.stock?`立即领取`:`已领取完`}</div>
												</li>
											)
										})
									}
								</ul>
							</div>
						</div>
						<div className="gap"></div>
					</div>
				) : null
			}
		</div>
	)
}