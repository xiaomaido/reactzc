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
        me.shareTextObjSetting({
            title:`趣游崇明之景点导览图`,
            imgUrl:`http://qyadmin.weichongming.com/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
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