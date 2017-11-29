
import banner from '../../images/quyou/banner/shophot.png'
const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const API_PAGE = APIS.API_EAT_TIME_LIST
const FETCH_PAGE = TYPES.FETCH_EAT_TIME_LIST
export default class XianShiFuLi extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
	renderContent(){
        document.title='限时福利'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        return (
			<div className="xian-shi-fu-li">
                <img className="banner" src={banner} />
                {
                    fetching ? <Spin /> : <List response={response} me={me} />
                }
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.requestList(me)
    }

    requestList(me){
        if(me.page === 0) {
            me.setState({
                [FETCH_PAGE]: {
                    ...me.state[FETCH_PAGE],
                    fetching: 1,
                }
            })
        }
        me.requestAPI(API_PAGE,{
            limit: me.limit,
            offset: me.limit * me.page
        },(response)=>{
            if(me.page === 0) {
                me.setState({
                    [FETCH_PAGE]: {
                        response,
                        fetching: 0
                    }
                })
                return
            }
            // const { FETCH_EAT_SHOP_LIST } = me.state
            // FETCH_EAT_SHOP_LIST.response.data.data = [
            //     ...FETCH_EAT_SHOP_LIST.response.data.data,
            //     ...response.data.data,
            // ]
            // FETCH_EAT_SHOP_LIST.fetching = 0
            // me.setState({
            //     FETCH_EAT_SHOP_LIST,
            // })
        })
    }
}

const List = (props) => {
    const { response, me } = props
    const { 
        data = [],
    } = response.data
    const { pathname } = _location
    return (
        <div className="list">
            {
                data.map((d = { imgs: [] },i)=>(
                    <div key={i}>
                        <div className="item" onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}>
                            <div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]})`}}></div>
                            <div className="product">[{d.name}] {d.title}</div>
                            <div className="price-buy">
                                <div className="buy">
                                    <div className="remain">剩余<span>{d.stock}</span>份</div>
                                    <div className="btn">抢购</div>
                                </div>
                                <div className="price">
                                    <div className="now"><span>¥</span>{me.centToYuan(d.realPrice)}</div>
                                    <div className="origin">¥{me.centToYuan(d.mallPrice)}</div>
                                </div>
                            </div>
                            <div className="clearboth foot"></div>
                        </div>
                        {
                            i===data.length-1 ? null : <div className="clearboth thinner-border"></div>
                        }
                    </div>
                ))
            }
        </div>
    )
}