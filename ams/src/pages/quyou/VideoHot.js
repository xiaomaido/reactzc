import { Quyou } from './Quyou'
const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const API_PAGE = APIS.API_EAT_MEDIA_LIST
const FETCH_PAGE = TYPES.FETCH_EAT_MEDIA_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
	renderContent(){
        document.title='视频推荐'
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
        <div className="yummy-hot"> 
            <PostList list={data} me={me} isVideo={true} />
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    )
}  
