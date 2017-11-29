const initStateResponse = {
	data: {
        imgs: [],
		is_like: 0,
        like_count: 0,
	}
}
const initTextOkay='发布'
export default class ShopDetail extends Quyou{
	state = {
        FETCH_EAT_SHOP_DETAIL:{
            response: initStateResponse
        },
		showCreateComment: false,
		valueCreateComment: '',
		textOkay: initTextOkay,
		textPlaceholder: '想搭讪，先评论',
		isLike: false,
	}
	renderContent(){
        document.title='商家信息'
        const me = this
        const { fetching, response = initStateResponse } = me.state.FETCH_EAT_SHOP_DETAIL
        return fetching ? <Spin /> : <Content response={response} me={me} />
    }
    componentDidMount(){
        const me = this
        const { FETCH_EAT_SHOP_DETAIL } = me.state
        me.setState({
            FETCH_EAT_SHOP_DETAIL: {
                ...FETCH_EAT_SHOP_DETAIL,
                fetching: 1,
            }
		})
		const { params } = me.props
        me.requestAPI(APIS.API_EAT_SHOP_DETAIL,{
			...params,
			user_id:0,
		},(response)=>{
            me.setState({
                FETCH_EAT_SHOP_DETAIL: {
                    response,
                    fetching: 0
                }
            })
        })
    }
}
const Content = (props) => {
    const { response, me } = props
    const { data = { }  } = response
    const { showCreateComment, textOkay, textPlaceholder } = me.state
    return data.id ? (
		<div className="shop-detail">
			<CommentFixed />
			<Intro data={data} needCover={true} />
			<div className="gap"></div>
			<div className="necker">
				<div className="necker-box">
					<div className="intro"><span></span>店铺简介</div>
					<div className="clearboth thinner-border"></div>
					<div className="descrip">{data.description||'暂无'}</div>
					{/* <div className="open-more">展开更多 ^</div> */}
					<div className="clearboth thinner-border"></div>
					<ProductList list={Array.apply(null,{length:5})} me={me} />
				</div>
			</div>
			<CommentList 
				total={data.comment_count} 
				list={data.comments} />
		</div>
	): null
}
const ProductList = (props) => {
    const { list, me } = props
    return (
		<div className="video clearboth">
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