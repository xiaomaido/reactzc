const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const FETCH_PAGE = TYPES.FETCH_MY_FOLLOW_LIST
const API_PAGE= APIS.API_MY_FOLLOW_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
	renderContent(){
        // document.title='我的关注'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
        const me = this
        me.requestList(me,FETCH_PAGE,API_PAGE)
        me.shareTextObjSetting({
            title:`趣游崇明之我的关注`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
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
    const url = "http://sfmimg.b0.upaiyun.com/prod_00/db68ca0aeb8c19a7.jpg"
    return (
        <div className="my-coupons">
            {
                data.map((d,i)=>(
                    <div key={i} className="item">
                        <div className="btn active">已关注</div>
                        <div className="icon cover" style={{backgroundImage:`url(${url})`}}></div>
                        <div className="content">
                            <div className="name">一点点奶茶券第二</div>
                            <div className="end">1个粉丝</div>
                        </div>
                    </div>
                ))
            }
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    )
} 