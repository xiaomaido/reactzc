import Confirm from '../../components/Confirm'

const initStateResponse = {
	data: {
        imgs: [],
        seller_info: {},
		is_like: 0,
        like_count: 0,
	}
}
const API_MY_COUPON_RECEIVE = APIS.API_MY_COUPON_RECEIVE
const API_PAGE = APIS.API_MY_COUPON_DETAIL
const FETCH_PAGE = TYPES.FETCH_EAT_TIME_DETAIL
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
	renderContent(){
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        return fetching ? <Spin /> : <Content response={response} me={me} handleReceiveCoupon={me.handleReceiveCoupon.bind(me)} />
    }
    componentDidMount(){
        const me = this
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
					const codeMap = {
						'20012': '您已经领取过该优惠券哦！'
					}
                    Confirm.show({
						title: '领取失败',
						desc: codeMap[code]||msg,
						callBacks: [
							// {text: '我知道了', onClick: () => {Confirm.close()}},
							// {text: '选择2', onClick: () => {}}
							{
								text: '查看优惠券',
								onClick: () => {
									Confirm.close()
									me.openPage(`/mycoupons?ltype=0`)
								}
							},
							// {
							// 	text: '我知道了',
							// 	onClick: () => {
							// 		Confirm.close()
							// 	}
							// },
						]
					})
					return
				}
				// {"msg":"","data":true,"code":0}
				Confirm.show({
					title: '领取成功',
					desc: '快去使用吧~',
					callBacks: [
						{
							text: '查看优惠券',
							onClick: () => {
                                Confirm.close()
                                me.openPage(`/mycoupons?ltype=0`)
							}
						},
						// {
						// 	text: '我知道了',
						// 	onClick: () => {
						// 		Confirm.close()
						// 	}
						// },
					]
				})
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
    const { response, me, handleReceiveCoupon } = props
    const { data = { imgs: [] }  } = response
    return data.id ? (
        <div className="xian-shi-fu-li-detail">
            <div className="fixed-footer-xian-shi">
                <div className="left">
                    <div className="clearboth thinner-border"></div>
                    {/* <div className="price">￥{me.centToYuan(data.realPrice)}<span>￥{me.centToYuan(data.mallPrice)}</span></div> */}
                    
                    <div className="price" style={{fontSize:'.6rem'}}>有效期: {misc.formatDateTime(new Date(data.start_dt*1000), misc.formatType['3'])}-{misc.formatDateTime(new Date(data.end_dt*1000), misc.formatType['3'])}</div>
                    
                </div>
                <div
                    className="right"
                    onClick={
                        ()=>{
                            handleReceiveCoupon({
                                coupon_id: data.id,
                                stock: data.stock,
                            })
                        }
                    }
                 >{data.stock?`立即领取`:`已领取完`}</div>
            </div>
            <div className="icon cover" style={{backgroundImage: `url(${data.imgs[0]+doImg.fw(500)})`,backgroundPosition: 'right'}}></div>

            <div className="fu-li">
                <div className="name">[{data.title}] {data.desc_title}</div>
                <div className="remain"><span>{data.reciev_count}</span> 人已领取</div>
                {/* <div>
                    <div>{data.desc_title}</div>
                    <div>{data.description}</div>
                </div> */}
            </div>
            <Intro data={data.seller} />
            {/* <Intro data={data.seller} handleJump={()=>{me.openPage(`/shophot/${data.seller_id}${me.props.location.search}`)}} /> */}
            <div className="publish">
                <div className="title">使用须知</div>
                <div className="clearboth thinner-border"></div>
                <div style={{paddingTop:'0.5rem',paddingRight: '1.1rem'}} dangerouslySetInnerHTML={{__html: data.description||''}}></div>
                <div className="clearboth"></div>
            </div> 
        </div>
    ) : null
}