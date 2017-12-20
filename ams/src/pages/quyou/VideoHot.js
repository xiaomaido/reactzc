import { Quyou } from './Quyou'
const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const FETCH_PAGE = TYPES.FETCH_MEDIA_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        },
    }
    blocks=[
        {
            title:'板块',
            id:0, 
        },
        {
            title:'吃',
            id:1, 
        },
        {
            title:'住',
            id:2, 
        },
    ]
    cates=[
        {
            title:'筛选',
            id:0, 
        },
        {
            title:'川湘菜',
            id:1, 
        },
        {
            title:'本帮菜',
            id:2, 
        },
        {
            title:'日料',
            id:3, 
        },
    ]
    handleSelectBoxChage(value){
        console.log(value)
    }
	renderContent(){
        // document.title='视频推荐'
        // return null
        const me = this
        const { blocks, cates } =  me
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        // return (
        //     <div className="yummy-hot video-hot">
        //         <div>
        //             <SelectBox options={blocks} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} />
        //             <SelectBox options={cates} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} />
        //         </div>
        //         <div style={{height: 800}}></div>
        //     </div>
        // )
        return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
        const me = this
        const { query } = me.props.location
        const _t = query._t || 'EAT'
        const API_PAGE = APIS[`API_${_t}_MEDIA_LIST`]
        me.requestList(me, FETCH_PAGE, API_PAGE)
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
        <div className="yummy-hot video-hot"> 
            <PostList list={data} me={me} type={_t} isVideo={true} />
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    )
}  
