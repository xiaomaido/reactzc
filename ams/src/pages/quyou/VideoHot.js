import { Quyou } from './Quyou'
const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
export default class Index extends Quyou{
    state={
        FETCH_EAT_MEDIA_LIST:{
            response: initStateResponse
        }
    }
	renderContent(){
        document.title='视频推荐'
        const me = this
        const { fetching, response = initStateResponse } = me.state.FETCH_EAT_MEDIA_LIST
        return (
            <div className="yummy-hot"> 
                {
                    fetching ? <Spin /> : <Content response={response} me={me} />
                }
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.requestList(me)
    }
    requestList(me){
        const { FETCH_EAT_MEDIA_LIST } = me.state
        if(me.page === 0) {
            me.setState({
                FETCH_EAT_MEDIA_LIST: {
                    ...FETCH_EAT_MEDIA_LIST,
                    fetching: 1,
                }
            })
        }
        me.requestAPI(APIS.API_EAT_MEDIA_LIST,{
            limit: me.limit,
            offset: me.limit * me.page
        },(response)=>{
            if(me.page === 0) {
                me.setState({
                    FETCH_EAT_MEDIA_LIST: {
                        response,
                        fetching: 0
                    }
                })
                return
            }
            const { FETCH_EAT_MEDIA_LIST } = me.state
            FETCH_EAT_MEDIA_LIST.response.data.data = [
                ...FETCH_EAT_MEDIA_LIST.response.data.data,
                ...response.data.data,
            ]
            FETCH_EAT_MEDIA_LIST.fetching = 0
            me.setState({
                FETCH_EAT_MEDIA_LIST,
            })
        })
    }
    doGood(e){
        alert('点赞成功')
    }
}
const Content = (props) => {
    const { response, me } = props
    const { 
        data = [],
    } = response.data
    return data.length ? <PostList list={data} me={me} isVideoPost={true} /> :null
} 
