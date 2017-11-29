import { PostList } from './Quyou'
const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
export default class Index extends Quyou{
    state={
        FETCH_EAT_POST_LIST:{
            response: initStateResponse
        }
    }
	renderContent(){
        document.title='美食攻略'
        const me = this
        const { fetching, response = initStateResponse } = me.state.FETCH_EAT_POST_LIST
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
        const me = this
        me.requestList(me)
        // const { FETCH_EAT_POST_LIST } = me.state
        // if(TYPES.FETCH_EAT_POST_LIST in ResponseState){
        //     me.setState({
        //         FETCH_EAT_POST_LIST: ResponseState[TYPES.FETCH_EAT_POST_LIST]
        //     })
        //     return false
        // }
        // window.onscroll = () => {
        //     if (getScrollTop() + getClientHeight() == getScrollHeight()) { 
        //         ++me.page
        //         me.requestList(me)
        //     }
        // }
    }
    requestList(me){
        const { FETCH_EAT_POST_LIST } = me.state
        if(me.page === 0) {
            me.setState({
                FETCH_EAT_POST_LIST: {
                    ...FETCH_EAT_POST_LIST,
                    fetching: 1,
                }
            })
        }
        me.requestAPI(APIS.API_EAT_POST_LIST,{
            limit: me.limit,
            offset: me.limit * me.page
        },(response)=>{
            // let response = TYPES.FETCH_EAT_POST_LIST in ResponseState ? ResponseState[TYPES.FETCH_EAT_POST_LIST].response : initStateResponse
            // response.data=[...response.data,res.data]
            // response.count=res.count
            // ResponseState[TYPES.FETCH_EAT_POST_LIST]={
            //     response:{
            //         count: res.count
            //     },
            //     fetching: 0
            // }
            // me.setState({
            //     FETCH_EAT_POST_LIST: ResponseState[TYPES.FETCH_EAT_POST_LIST]
            // })
            if(me.page === 0) {
                me.setState({
                    FETCH_EAT_POST_LIST: {
                        response,
                        fetching: 0
                    }
                })
                return
            }
            const { FETCH_EAT_POST_LIST } = me.state
            FETCH_EAT_POST_LIST.response.data.data = [
                ...FETCH_EAT_POST_LIST.response.data.data,
                ...response.data.data,
            ]
            FETCH_EAT_POST_LIST.fetching = 0
            me.setState({
                FETCH_EAT_POST_LIST,
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
    return (
        <div className="yummy-hot"> 
            <PostList list={data} me={me} />
        </div>
    )
} 
