
import banner from '../../images/quyou/banner/shophot.png'
const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
export default class Index extends Quyou{
    state={
        FETCH_EAT_SHOP_LIST:{
            response: initStateResponse
        }
    }
	renderContent(){
        document.title='人气商家'
        const me = this
        const { fetching, response = initStateResponse } = me.state.FETCH_EAT_SHOP_LIST
        return (
			<div className="shop-hot">
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
        const { FETCH_EAT_SHOP_LIST } = me.state
        if(me.page === 0) {
            me.setState({
                FETCH_EAT_SHOP_LIST: {
                    ...FETCH_EAT_SHOP_LIST,
                    fetching: 1,
                }
            })
        }
        me.requestAPI(APIS.API_EAT_SHOP_LIST,{
            limit: me.limit,
            offset: me.limit * me.page
        },(response)=>{
            if(me.page === 0) {
                me.setState({
                    FETCH_EAT_SHOP_LIST: {
                        response,
                        fetching: 0
                    }
                })
                return
            }
            const { FETCH_EAT_SHOP_LIST } = me.state
            FETCH_EAT_SHOP_LIST.response.data.data = [
                ...FETCH_EAT_SHOP_LIST.response.data.data,
                ...response.data.data,
            ]
            FETCH_EAT_SHOP_LIST.fetching = 0
            me.setState({
                FETCH_EAT_SHOP_LIST,
            })
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
                            <div className="box">
                                <div className="name">{d.name}</div>
                                <div className="address"><i className="icon"></i>{d.addr1+d.addr2+d.addr3+d.detail}</div>
                                <ul className="shop-sns">
                                    <li><i className="icon good"></i>{d.like_count}</li>
                                    <li><i className="icon comment"></i>{d.comment_count}</li>
                                    {/* <li><i className="icon collect"></i>0</li> */}
                                </ul>
                            </div>
                            <div className="num">月售<span>{d.sale_count}</span></div>
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