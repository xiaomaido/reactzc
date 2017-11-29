import { CommentFixed, CommentList, Intro } from './Quyou'
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
export default class Index extends Quyou{
    state = {
        FETCH_EAT_FOOD_DETAIL:{
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
        const { fetching, response = initStateResponse } = me.state.FETCH_EAT_FOOD_DETAIL
        return fetching ? <Spin /> : <Content response={response} me={me} />
        // return <Content response={response} me={me} />
    }
    componentDidMount(){
        const me = this
        const { FETCH_EAT_FOOD_DETAIL } = me.state
        me.setState({
            FETCH_EAT_FOOD_DETAIL: {
                ...FETCH_EAT_FOOD_DETAIL,
                fetching: 1,
            }
		})
		const { params } = me.props
        me.requestAPI(APIS.API_EAT_FOOD_DETAIL,{
			...params,
			user_id:0,
		},(response)=>{
            me.setState({
                FETCH_EAT_FOOD_DETAIL: {
                    response,
                    fetching: 0
                }
            })
        })
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
    var o = {
        "msg": "",
        "data": {
            "custom_avg": 20,
            "id": 5,
            "tags": [
                1,
                2,
                3
            ],
            "has_promotion": "1",
            "description": "有啥不一样",
            "seller_info": {
                "imgs": [
                    "http://sfmimg.b0.upaiyun.com/prod_00/b1e1a745820f31be.jpg"
                ],
                "custom_avg": 20,
                "id": 1,
                "tags": [
                    2,
                    3
                ],
                "status": "0000",
                "extraAddr": "阳光",
                "description": "",
                "geoinfo": "(5,2)",
                "detail": "434号",
                "stags": {},
                "name": "珍奶会所",
                "area": 0,
                "comment_count": 2,
                "rtype": "0000",
                "addr1": "崇明区",
                "has_promotion": "1",
                "addr3": "八二路",
                "sale_count": 0,
                "phone": "17321066362",
                "addr2": "城桥镇",
                "like_count": 1
            },
            "stags": [
                4,
                5,
                6
            ],
            "images": [
                "http://img01",
                "http://03.jpg"
            ],
            "products": {},
            "comments": [
                {
                    "comment": "ddd",
                    "opt_id": 5,
                    "creat_dt": "1511885748",
                    "status": "0000",
                    "rtype": "0010",
                    "user_id": 1,
                    "id": 40
                },
                {
                    "comment": "ddd",
                    "opt_id": 5,
                    "creat_dt": "1511885733",
                    "status": "0000",
                    "rtype": "0010",
                    "user_id": 1,
                    "id": 39
                },
                {
                    "comment": "ddd",
                    "opt_id": 5,
                    "creat_dt": "1511885514",
                    "status": "0000",
                    "rtype": "0010",
                    "user_id": 1,
                    "id": 38
                },
                {
                    "comment": "ddd",
                    "opt_id": 5,
                    "creat_dt": "1511885412",
                    "status": "0000",
                    "rtype": "0010",
                    "user_id": 1,
                    "id": 37
                }
            ],
            "stag_names": [
                {
                    "createtime": 0,
                    "id": 4,
                    "mode": "0000",
                    "status": "0",
                    "tagname": "回头客多"
                },
                {
                    "createtime": 1509292298,
                    "id": 6,
                    "mode": "0001",
                    "status": "0",
                    "tagname": "专属"
                },
                {
                    "createtime": 1509292257,
                    "id": 5,
                    "mode": "0000",
                    "status": "0",
                    "tagname": "蛋糕"
                }
            ],
            "comment_count": 4,
            "is_like": 0,
            "title": "人气美食",
            "status": "1",
            "star_count": 4,
            "tag_names": [
                {
                    "createtime": 0,
                    "id": 1,
                    "mode": "0000",
                    "status": "0",
                    "tagname": "中餐"
                },
                {
                    "createtime": 0,
                    "id": 2,
                    "mode": "0000",
                    "status": "0",
                    "tagname": "农家乐"
                },
                {
                    "createtime": 0,
                    "id": 3,
                    "mode": "0000",
                    "status": "0",
                    "tagname": "地方特色"
                }
            ],
            "seller_id": 1,
            "rec_desc": "3元一个 5元两个",
            "like_count": 1
        },
        "code": 0
    }
    const { data = {}  } = response
    const { showCreateComment, textOkay, textPlaceholder } = me.state
    
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
				textPlaceholder={textPlaceholder}
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