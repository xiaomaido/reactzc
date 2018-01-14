const initStateResponse = initState()
const FETCH_PAGE = TYPES.FETCH_MY_COUPON_LIST
const API_PAGE = APIS.API_MY_COUPON_LIST
const API_MY_COUPON_USE = APIS.API_MY_COUPON_USE
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        },
        isDoUse: false,
        showCreateComment: false,
        textOkay: this.initTextOkay,
    }
    // {me.handleCouponUse.bind(me,{
    //     coupon_id: d.id,
    //     coupon_code: d.coupon_code,
    // })}
	handleSaveComment({ property = 'nickname', query = {} }, e){
        const me = this
        const { state, initTextOkay } = me
		const { valueCreateComment, textOkay } = state
		const { params } = me.props
		if(textOkay === initTextOkay && valueCreateComment) {
			me.setState({
				textOkay: `${initTextOkay}中...`,
            })
			me.requestAPI(API_MY_COUPON_USE,{
                ...query,
				[property]: valueCreateComment,
                token: me.user.token,
			},(response)=>{
				const { code = 0, data } = response
				if(code) {
					me.setState({
						textOkay: initTextOkay,
					})
					return
				}
                const user = {
                    ...me.user,
                    ...data,
                }
				me.setState({
					textOkay: initTextOkay,
					showCreateComment: false,
                    valueCreateComment: '',
                    user,
                })
                misc.setCookie('user',JSON.stringify(user))
			})
		}
	}
    ltypes=['未使用','已使用','已过期']
    handleClick(type=0){
        const me = this
        let { ltype = '0' } = _location.query
        ltype = Number(ltype)
        if(type !== ltype) {
            me.openPage(`/mycoupons?ltype=${type}`)
        }
    }
	handleChangeCreateComment(e){
		const me = this
		me.setState({
			valueCreateComment: e.target.value
		})
	}
	renderContent(){
        const me = this
        const { showCreateComment } = me.state
        const { fetching, response = initStateResponse, textOkay } = me.state[FETCH_PAGE]
        let { ltype = '0' } = _location.query
        ltype = Number(ltype)
        return (
            <div className="my-coupons">
                {
				    showCreateComment ? 
                        <CreateComment
                            maxLength={20}
                            textPlaceholder='请商户营业员输入核销口令～'
                            textTitle='商家核销'
                            textOkay={textOkay} 
                            handleClickCancel={me.handleShowCreateComment.bind(me)} 
                            handleClickOkay={me.handleSaveComment.bind(me, { property: 'nickname', query: {

                            } })} 
                            handleChangeInput={me.handleChangeCreateComment.bind(me)} /> : null
			    }
                <ul className="types">
                    {
                        me.ltypes.map((d,i)=>(
                            <li key={i} className={classnames({active:ltype===i})} onClick={me.handleClick.bind(me,i)}>
                                <div className="name">{d}</div>
                                {
                                    ltype===i?<div className="number">{response.data.count}</div>:null
                                }
                                <div className="t-down"></div>
                            </li>
                        ))
                    }
                </ul>
                {
                    fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
                }
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.requestList(me,FETCH_PAGE,API_PAGE)
        me.shareTextObjSetting({
            title:`趣游崇明之我的优惠券`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
    }
    componentWillReceiveProps(nextProps){
        const me = this 
        _location = nextProps.location
        me.requestList(me,FETCH_PAGE,API_PAGE)
    }
    handleCouponUse({ coupon_id,coupon_code }){
        const me = this
        const { state, props } = me
		const { isDoUse } = state
		const { params } = props
		if(!isDoUse){
			me.setState({
				isDoUse: true,
            })
			me.requestAPI(APIS.API_MY_COUPON_USE,{
                coupon_id,
                coupon_code:'123',
                token: me.user.token,
			},(response)=>{
                const { code = 0, data } = response
				if(code) {
					me.setState({
						isDoUse: false,
					})
					return
				}
				// const FETCH_TEMP = me.state[FETCH_PAGE]
				// FETCH_TEMP.response.data.is_like = !FETCH_TEMP.response.data.is_like
				// FETCH_TEMP.response.data.like_count = FETCH_TEMP.response.data.like_count + (FETCH_TEMP.response.data.is_like ? 1 : -1)
				// me.setState({
				// 	[FETCH_PAGE]: FETCH_TEMP,
				// 	isDoLike: false,
				// })
			})
		}
    }
    // renderContent(){
    //     const list = [1,3,4,7,5,8,9,0]
    //     const url = "https://avatars0.githubusercontent.com/u/11659631?v=4"
    //     return (
    //         <div className="my-coupons">
    //             {
    //                 list.map((d,i)=>(
    //                     <div key={i} className="item">
    //                         <div className="btn">点击使用</div>
    //                         <div className="icon cover" style={{backgroundImage:`url(${url})`}}></div>
    //                         <div className="content">
    //                             <div className="name">一点点奶茶券第二杯半价券快来使用哦</div>
    //                             <div className="end">2017-12-31到期</div>
    //                         </div>
    //                     </div>
    //                 ))
    //             }
    //         </div>
    //     )
    // }
}


const Content = (props) => {
    const { response, me } = props
    let { 
        count = 0,
        data = [],
    } = response.data
    data = Array.isArray(data) ? data : []
    data = [
        ...data,
    ]
    
    return (
        <div className="list">
            {
                data.map((d={},i)=>{
                    d.imgs=Array.isArray(d.imgs)?d.imgs:[]
                    return (
                        <div key={i} className="item">
                            <div className="btn" onClick={me.handleShowCreateComment.bind(me)}>点击使用</div>
                            <div className="icon cover circle" style={{backgroundImage:`url(${d.imgs[0]})`}}></div>
                            <div className="content">
                                <div className="name coupon">{`【${'凌一刀'}】`} {d.title} {d.desc_title} </div>
                                <div className="end coupon">{misc.formatDateTime(new Date(d.end_dt*1000), misc.formatType['1'])}到期</div>
                            </div>
                        </div>
                    )
                })
            }
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    )
} 