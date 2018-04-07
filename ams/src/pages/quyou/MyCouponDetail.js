const initStateResponse = {
	data: {
        imgs: [],
        seller_info: {},
		is_like: 0,
        like_count: 0,
	}
}
const API_PAGE = APIS.API_EAT_TIME_DETAIL
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
        return fetching ? <Spin /> : <Content response={response} me={me} />
    }
    componentDidMount(){
        const me = this
		me.requestDetail(me,FETCH_PAGE,API_PAGE)
	}
}


const Content = (props) => {
    const { response, me } = props
    const { data = { imgs: [] }  } = response
    const cover = `http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg`
    return data.id ? (
        <div className="xian-shi-fu-li-detail">
            <div className="fixed-footer-xian-shi">
                <div className="left">
                    <div className="clearboth thinner-border"></div>
                    <div className="price">￥{me.centToYuan(data.realPrice)}<span>￥{me.centToYuan(data.mallPrice)}</span></div>
                </div>
                <div className="right">立即领取</div>
            </div>
            <div className="icon cover" style={{backgroundImage: `url(${data.imgs[0]})`}}></div>
            <div className="fu-li">
                <div className="name">[{data.name}] {data.title}</div>
                <div className="remain"><span>{data.stock}</span>已领取</div>
            </div>
            <Intro data={data.seller_info} />
            <div className="publish">
                <div className="title">使用须知</div>
                <div className="clearboth thinner-border"></div>
                <div>{data.rule}</div>
            </div>                
        </div>
    ) : null
}