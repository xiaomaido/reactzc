import { PostList } from './Quyou'
export default class Index extends Quyou{
    state={
        FETCH_EAT_POST_LIST:{
            response: {
                data: { }
            }
        }
    }
	renderContent(){
        document.title='美食攻略'
        const me = this
        const { fetching, response = { data: { } } } = me.state.FETCH_EAT_POST_LIST
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
        const me = this
        const { FETCH_EAT_POST_LIST } = me.state
        if(TYPES.FETCH_EAT_POST_LIST in ResponseState){
            me.setState({
                FETCH_EAT_POST_LIST: ResponseState[TYPES.FETCH_EAT_POST_LIST]
            })
            return false
        }
        me.setState({
            FETCH_EAT_POST_LIST: {
                ...FETCH_EAT_POST_LIST,
                fetching: 1,
            }
        })
        me.requestAPI(APIS.API_EAT_POST_LIST,{},(response)=>{
            ResponseState[TYPES.FETCH_EAT_POST_LIST]={
                response,
                fetching: 0
            }
            me.setState({
                FETCH_EAT_POST_LIST: ResponseState[TYPES.FETCH_EAT_POST_LIST]
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
