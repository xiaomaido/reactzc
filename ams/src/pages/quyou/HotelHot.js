import { debug } from "util";

const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const API_PAGE = APIS.API_SLEEP_SHOP_LIST
const FETCH_PAGE = TYPES.FETCH_SLEEP_SHOP_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
    renderContent(){
        // document.title='精品酒店'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        return (
			<div className="food-hot hotel-hot">
                {
                    fetching ? <Spin /> : <List response={response} me={me} />
                }
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.requestList(me,FETCH_PAGE,API_PAGE)
    }
}
const List = (props) => {
    const { response, me } = props
    const { 
        count = 0,
        data = [],
    } = response.data
    return data.length ? (
        <div>
            <div className="list">
                {
                    data.map((d = { imgs: [] },i)=>{
                        d.stag_names = Array.isArray(d.stag_names) ? d.stag_names : []
                        return (
                            <div key={i}>
                                <div className="item" onClick={me.openPage.bind(me,`/shophot/${d.id}?_t=SLEEP`)}>
                                    <LazyLoad key={i} height={100} offset={100}>
                                        <div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]})`}}></div>
                                    </LazyLoad>
                                    <div className="box">
                                        <div className="name">{d.name}</div>
                                        <div className="stars-permoney">
                                            <StarsShow number={d.star_count||5} />
                                            <div className="permoney"><span>¥{d.custom_avg}</span> 起</div>
                                        </div>
                                        <ul className="tags">
                                            {
                                                d.stag_names.map((d,i)=><li key={i}>{d.tagname}</li>)
                                            }
                                        </ul>
                                        <div className="address clearboth"><i className="icon"></i>{d.addr1+d.addr2+d.addr3+d.detail}</div>
                                    </div>
                                </div>
                                {
                                    i===data.length-1 ? null : <div className="clearboth thinner-border"></div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    ) : null
}