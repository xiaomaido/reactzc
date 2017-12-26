const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const API_PAGE = APIS.API_TOUR_PIC_LIST
const FETCH_PAGE = TYPES.FETCH_TOUR_PIC_LIST
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
    return (
        <div className="mall trip-guidance">
            <ul className="ad-list">
                {
                    data.map((d,i)=>(
                        <li key={i}>
                            <LazyLoad height={200} offset={100}>
                                <a href={`${window.isHashHistory}/guidance/${d.id}`} className="icon big" style={{backgroundImage:`url(${d.img})`}}></a>
                            </LazyLoad>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}