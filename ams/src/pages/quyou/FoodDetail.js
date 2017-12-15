const initStateResponse = {
	data: {
        stag_names: [],
        images: [],
        custom_avg: 0,
		comment_count: 0, 
		comments: [],
		is_like: 0,
        like_count: 0,
        rec_desc: '',
        star_count: 5,
	}
}
const ID = 'id'
const API_PAGE_LIKE = APIS.API_EAT_FOOD_LIKE
const API_PAGE_COMMENT = APIS.API_EAT_FOOD_COMMENT
const API_PAGE = APIS.API_EAT_FOOD_DETAIL
const FETCH_PAGE = TYPES.FETCH_EAT_FOOD_DETAIL
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
        document.title='美食信息'
        const me = this
		const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
		const me = this
		me.requestDetail(me,FETCH_PAGE,API_PAGE)
	}
}
const Content = (props) => {
    const { response, me } = props
    const { data = {}  } = response
    const { showCreateComment, textOkay } = me.state
    data.stag_names = Array.isArray(data.stag_names) ? data.stag_names : []
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
            <Intro data={data.seller_info} handleJump={me.openPage.bind(me,  `/shophot/${data.seller_info.id}`)} />
            <div className="gap"></div>
            <div className="necker">
                <div className="necker-box">
                    <div className="intro"><span></span>菜品介绍</div>
                    <div className="clearboth thinner-border"></div>
                    <div className="descrip">{data.description}</div>
                    {/* <div className="open-more">展开更多 ^</div> */}
                    {/* <div className="clearboth thinner-border"></div>
                    <div className="discount">
                        <div className="title"><div>惠</div>本品优惠</div>
                        <div className="buy-box">
                            <div className="left">
                                <div className="price">￥24.9<span>原价￥36.9</span></div>
                            </div>
                            <div className="right">抢购</div>
                        </div>
                    </div> */}
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