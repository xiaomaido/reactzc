
import banner from '../../images/quyou/banner/seasonhot.png'
const initStateResponse = initState()
const API_PAGE = APIS.API_EAT_SEASON_LIST
const FETCH_PAGE = TYPES.FETCH_EAT_SEASON_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse,
            filteridsShowOptions: false,
        }
    }
	renderContent(){
        // document.title='当季推荐'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        const { filterids } =  me
        const { filteridsShowOptions } = me.state
        let { filterid = 0 } =  me.props.location.query
        filterid = Number(filterid)
        return (
			<div className="season-hot">
                <img className="banner" src={banner} />
                <div>
                    <SearchInput me={me} handleSearch={me.handleSearch.bind(me)} />
                </div>
                <div>
                    <SelectBox showOptions={filteridsShowOptions} options={filterids} optionId={filterid}  type={'filterids'} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'filterids')} />
                </div>
                {
                    fetching ? <Spin /> : <List response={response} me={me} />
                }
            </div>
        )
    }
    handleSelectBoxChageColumn(type){
        const temp = `${type}ShowOptions`
        // console.log('temp',temp)
        let nextState = {
            [temp]: !this.state[temp],
        }
        if(type === 'tags'){
            nextState['filteridsShowOptions']=false
        }else if(type === 'filterids'){
            nextState['tagsShowOptions']=false
        }
        this.setState(nextState)
    }
    handleSelectBoxChage({type = '',option = {}}){
        const me = this
        console.log('type',type)
        console.log('option',option)
        let { query } = me.props.location
        if(type === 'tags'){
            if(option.id){
                query['tag'] = option.id
            }else{
                delete query['tag']
            } 
        }
        else if(type === 'filterids'){
            if(option.id){
                query['filterid'] = option.id
                query['filter'] = encodeURIComponent(option.title)
            }else{
                delete query['filter']
                delete query['filterid']
            }
        }
        me.openPage(`/seasonhot${me.getRequestParam(query)}`)
    }
    componentWillReceiveProps(nextProps){
        const me = this 
        _location = nextProps.location
        me.page = 0
        me.requestList(me,FETCH_PAGE,API_PAGE)
    }
    componentDidMount(){
        const me = this
        me.requestList(me,FETCH_PAGE,API_PAGE,true)
        me.shareTextObjSetting({
            title:`当季推荐`,
            imgUrl: `http://quyou.weichongming.com/static/images/seasonhot.f9c8bbfed7a87aa734c6ba2f40b44591.png`,
            desc:'整合崇明全域的当季推荐优惠活动！',
        })
    }
}
const List = (props) => {
    const { response, me } = props
    const { 
        count = 0,
        data = [],
    } = response.data
    const { pathname } = _location
    return (
        <div> 
            <div className="list">
                {
                    data.map((d = { imgs: [] },i)=>(
                        <div key={i}>
                            <div className="item" onClick={me.openPage.bind(me,`/shophot/${d.id}`)}>
                                <LazyLoad key={i} height={100} offset={100}>
                                    <div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]}${doImg.fw()})`}}></div>
                                </LazyLoad>
                                <div className="box">
                                    <div className="name">{d.season_rec}</div>
                                    <div className="shop">【{d.name}】</div>
                                    <div className="address text-elip"><i className="icon"></i>{d.addr1+d.addr2+d.addr3+d.detail}</div>
                                </div>
                                <div className="good">
                                    <i className="icon"></i>
                                    <div>{d.like_count}</div>
                                </div>
                            </div>
                            {
                                i===data.length-1 ? null : <div className="clearboth thinner-border"></div>
                            }
                        </div>
                    ))
                }
            </div>
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    )
}