 import moment from 'moment';

const initStateResponse = {
	data: {
        imgs: [],
        seller_info: {},
		is_like: 0,
        like_count: 0,
	}
}
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
                <div className="left" style={{ display: 'none'}}>
                    <div className="clearboth thinner-border"></div>
                    <div className="price">￥{me.centToYuan(data.realPrice)}<span>￥{me.centToYuan(data.mallPrice)}</span></div>
                </div>
                <div style={{ width: '100%' }} className="right">立即领取</div>
            </div>
            <div className="icon cover" style={{backgroundImage: `url(${data.imgs[0]})`}}></div>

            <div className="fu-li">
                <div className="name">[{data.title}] {data.desc_title}</div>
                <div className="remain"><span>{data.stock}</span>已领取</div>
                {/*<div>*/}
                    {/*<div>{data.desc_title}</div>*/}
                    {/*<div>{data.description}</div>*/}
                {/*</div>*/}
            </div>

            <Intro data={data.seller} />
            <div className="publish">
                <div className="title">使用须知</div>
                <div>
                    使用时间：
                    <div style={{ fontWeight: 200 }}>{moment(data.start_dt*1000).format('YYYY.MM.DD')} - {moment(data.end_dt*1000).format('YYYY.MM.DD')}</div>
                </div>
                <div className="clearboth thinner-border"></div>
                <div style={{paddingTop:'0.5rem',paddingRight: '1.1rem'}} dangerouslySetInnerHTML={{__html: data.description||''}}></div>
                <div className="clearboth"></div>
            </div>                
        </div>
    ) : null
}