import Confirm from '../../components/Confirm'

const API_MY_COUPON_RECEIVE_EXCHANGE = APIS.API_MY_COUPON_RECEIVE_EXCHANGE
const API_PAGE = APIS.API_MY_COUPON_DETAIL
const FETCH_PAGE = TYPES.FETCH_EAT_TIME_DETAIL
export default class Index extends Quyou{
    state={
        exchangeCode: '',
    }
    checkExchangeCode(){
        const me=this
        const {exchangeCode} = me.state
        if(!exchangeCode) return
        me.requestAPI(API_MY_COUPON_RECEIVE_EXCHANGE,{
            coupon_code: exchangeCode,
            token: me.user.token,
        },(response={})=>{
            const { code=-1, data="", msg="" } = response

            // 随便输入一个码 {"msg":"","data":false,"code":0}

            // // {"msg":"已经领取","data":"","code":20012}
            // if(code){
            // 	const codeMap = {
            // 		'20012': '您已经领取过该优惠券哦！'
            // 	}
            //     Confirm.show({
            // 		title: '兑换失败',
            // 		desc: codeMap[code]||msg,
            // 		callBacks: [
            // 			{
            // 				text: '查看优惠券',
            // 				onClick: () => {
            // 					Confirm.close()
            // 					me.openPage(`/mycoupons?ltype=0`)
            // 				}
            // 			},
            // 			{
            // 				text: '我知道了',
            // 				onClick: () => {
            // 					Confirm.close()
            // 				}
            // 			},
            // 		]
            // 	})
            // 	return
            // }
            // // {"msg":"","data":true,"code":0}
            // Confirm.show({
            // 	title: '兑换成功',
            // 	desc: '快去使用吧~',
            // 	callBacks: [
            // 		{
            // 			text: '查看优惠券',
            // 			onClick: () => {
            //                 Confirm.close()
            //                 me.openPage(`/mycoupons?ltype=0`)
            // 			}
            // 		},
            // 	]
            // })
            // const FETCH_TEMP = me.state[FETCH_PAGE]
            // const temp = FETCH_TEMP.response.data.coupon.find(d=>d.id===coupon_id)
            // temp.reciev_count += 1
            // this.setState({
            // 	[FETCH_PAGE]: FETCH_TEMP
            // })
        })
        Confirm.show({
            title: '兑换成功',
            desc: '快去使用吧~',
            callBacks: [
                {
                    text: '查看优惠券',
                    onClick: () => {
                        Confirm.close()
                        me.openPage(`/mycoupons?ltype=0`)
                    }
                },
            ]
        })
        // const codeMap = {
        //     '20012': '您已经领取过该优惠券哦！'
        // }
        // const code = 0
        // const msg = '已经领取完'
        // Confirm.show({
        //     title: '兑换失败',
        //     desc: codeMap[code]||msg,
        //     callBacks: [
        //         // {
        //         //     text: '查看优惠券',
        //         //     onClick: () => {
        //         //         Confirm.close()
        //         //         me.openPage(`/mycoupons?ltype=0`)
        //         //     }
        //         // },
        //         {
        //             text: '我知道了',
        //             onClick: () => {
        //                 Confirm.close()
        //             }
        //         },
        //     ]
        // })
    }
	handleChangeCode(e){
		const me = this
		me.setState({
			exchangeCode: e.target.value.trim()
		})
	}
	handleResetCode(e){
		const me = this
		me.setState({
			exchangeCode: ''
		})
	}
	renderContent(){
        // document.title="兑换码领券"
        const me = this
        const {exchangeCode} = me.state
        return (
            <div className="my-coupon-exchange" style={{minHeight: window.innerHeight}}>
                <input
                    value={exchangeCode}
                    type="text"
                    maxLength="20"
                    placeholder="请输入兑换码"
                    onChange={me.handleChangeCode.bind(me)}
                />
                <div className={exchangeCode?'active':''} onClick={me.checkExchangeCode.bind(me)}>兑换</div>
                {
                    exchangeCode ? <i className="icon" onClick={me.handleResetCode.bind(me)}></i> : null
                }
            </div>
        )
    }
}