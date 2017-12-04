const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const FETCH_PAGE = TYPES.FETCH_POST_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
	renderContent(){
        document.title='美食攻略'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
        const me = this
        const { query } = me.props.location
        const _t = query._t || 'EAT'
        const API_PAGE = APIS[`API_${_t}_POST_LIST`]
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
	const { query } = _location
	const _t = query._t || 'EAT'
    return (
        <div className="yummy-hot"> 
            <PostList list={data} me={me} type={_t} />
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    )
} 
