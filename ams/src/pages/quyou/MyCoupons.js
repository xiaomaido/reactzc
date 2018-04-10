const initStateResponse = initState()
const FETCH_PAGE = TYPES.FETCH_MY_COUPON_LIST
const API_PAGE = APIS.API_MY_COUPON_LIST
const API_MY_COUPON_USE = APIS.API_MY_COUPON_USE
const okay='核销'
const title='商家确认'
export default class Index extends Quyou{
    initTextOkay=okay
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        },
        isDoUse: false,
        showCreateComment: false,
        textOkay: okay,
        textTitle: title
    }
    ltypes=['未使用','已使用','已过期']
    ltypesEn = ['unused-m', 'used-m', 'expired-m']
	handleSaveComment({ property = '' }, e){
        const me = this
        const { state, initTextOkay } = me
        const { valueCreateComment, textOkay, coupon_id: couponId } = state
		if(textOkay === initTextOkay && valueCreateComment) {
			me.setState({
				textOkay: `${initTextOkay}中...`,
            })
			me.requestAPI(API_MY_COUPON_USE,{
                coupon_id: couponId,
                [property]: valueCreateComment,
                token: me.user.token,
			},(response)=>{
                // {"msg":"口令错误","data":"","code":20015}
				const { code = 0, data, msg } = response
				if(code) {
					me.setState({
                        textOkay: initTextOkay,
                        textTitle: msg
					},()=>{
                        setTimeout(()=>{
                            me.setState({
                                textTitle: title
                            })
                        },2000)
                    })
					return
                }
                const FETCH_TEMP = {
                    ...me.state[FETCH_PAGE]
                }
                FETCH_TEMP.response.data.count += -1
                FETCH_TEMP.response.data.data = FETCH_TEMP.response.data.data.filter(({coupon_id})=>coupon_id!==couponId)
				me.setState({
					textOkay: initTextOkay,
					showCreateComment: false,
                    valueCreateComment: '',
                    [FETCH_PAGE]: FETCH_TEMP
                })
                me.openPage(`/mycoupons?ltype=1`)
			})
		}
	}
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
        const { showCreateComment, textTitle, textOkay } = me.state
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        let { ltype = '0' } = _location.query
        ltype = Number(ltype)
        return (
            <div className="my-coupons">
                {
				    showCreateComment ? 
                        <CreateComment
                            type="password"
                            maxLength={20}
                            textPlaceholder='请商户营业员输入核销口令～'
                            textTitle={textTitle}
                            textOkay={textOkay}
                            handleClickCancel={me.handleShowCreateComment.bind(me)} 
                            handleClickOkay={me.handleSaveComment.bind(me, { property: 'coupon_code' })} 
                            handleChangeInput={me.handleChangeCreateComment.bind(me)} /> : null
			    }
                <ul className="types">
                    {
                        me.ltypes.map((d,i)=>(
                            <li key={i} className={classnames({active:ltype===i})} onClick={me.handleClick.bind(me,i)}>
                                <div className="name">
                                    {d}
                                    {
                                        ltype===i?<div className="number">{response.data.count}</div>:null
                                    }
                                </div>
                                <div className={`${this.ltypesEn[i]} image-m`}></div>
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
}


const Content = (props) => {
    const { response, me } = props
    let { 
        count = 0,
        data = [],
    } = response.data
    data = Array.isArray(data) ? data : []
    // data = [
    //     ...data,
    // ]
    const ltype = _location.query.ltype
    const tempStyle = ltype !== '0' ? {width:'12rem'} : {}
    return (
        <div className="list">
            {
                data.map((d={},i)=>{
                    d.imgs=Array.isArray(d.imgs)?d.imgs:[]
                    return (
                        <div key={i} className="item">
                            {
                                ltype === '0' ? <div className="btn" onClick={me.handleShowCreateComment.bind(me, { coupon_id: d.coupon_id })}>点击使用</div> : null
                            }
                            <div style={{height:'4.28rem'}} onClick={me.openPage.bind(me,`/mycoupons/${d.coupon_id}`)}>
                                <div className="icon cover" style={{backgroundPosition: 'right',backgroundSize: 'cover',backgroundImage:`url(${d.imgs[0]}${doImg.fw(100)})`}}></div>
                                <div className="content">
                                    <div className="name coupon" style={tempStyle}>{`【${d.seller.name}】`} {d.title} {d.desc_title} </div>
                                    {
                                        ltype === '1' ? <div className="end coupon">{misc.formatDateTime(new Date(d.end_dt*1000), misc.formatType['1'])} 使用</div> : <div className="end coupon">{misc.formatDateTime(new Date(d.end_dt*1000), misc.formatType['1'])} 到期</div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData type={data.length?'nomoredata':'nodata'} /> : <Spin.Spin2 />
            }
        </div>
    )
} 

// {
//     me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
// }

// {
//     data.length ? (
//         <div className="item">
//             <div className="icon cover circle"></div>
//             <div className="content">
//                 <div className="name follow"></div>
//             </div>
//         </div>
//     ) : null
// }