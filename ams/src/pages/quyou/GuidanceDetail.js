const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const API_PAGE = APIS.API_TOUR_PIC_DETAIL
const FETCH_PAGE = TYPES.FETCH_TOUR_PIC_DETAIL
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
	renderContent(){
        // document.title='导览图'
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
    let { 
        data = [],
    } = response
    data = Array.isArray(data) ? data : []
    let detail = data[0] || {}
    detail.seller = Array.isArray(detail.seller) ? detail.seller : []
    return detail.id ? (
        <div className="trip-guidance-detial">
            <img src={detail.img}  />
            <div className="top">
                <div className="area">{detail.title}区域</div>
                <div className="dic">拥有以下景点</div>
                <div className="clearboth thinner-border"></div>
                <div className="list">
                    {
                        detail.seller.map((d,i)=>(
                            <Link key={i} to={`/shophot/${d.id}?_t=TOUR`}>
                                <em></em>
                                {d.name}
                                <span>（点击查看）</span>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    ) : null
}