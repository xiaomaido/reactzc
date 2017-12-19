
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
        // document.title='限时福利'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        return (
			<div className="xian-shi-fu-li">
                <img className="banner" src={banner} />
                {
                    fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
                }
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.requestList(me,FETCH_PAGE,API_PAGE)
    }
}
const Content = (props) => {
    const { response, me } = props
    const { 
        count = 0,
        data = [],
    } = response.data
    const { pathname } = _location
    return (
        <div>
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
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    )
}