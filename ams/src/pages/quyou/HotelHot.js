import { debug } from "util";
const initStateResponse = initState()
const API_PAGE = APIS.API_SLEEP_SHOP_LIST
const FETCH_PAGE = TYPES.FETCH_SLEEP_SHOP_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        },
        tagsShowOptions: false,
        filteridsShowOptions: false,
    }
    constructor(props){
        super(props)
        const me = this
        me.tags=[
            {
                title:'全部类型',
                id:0, 
            },
            ...me.hotelTags.map(({id, title})=>({id, title}))
        ]
        // console.log(me.tags)
    }
    renderContent(){
        // document.title='精品酒店'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        const { tags, filterids } =  me
        const { tagsShowOptions, filteridsShowOptions } = me.state
        let { tag = 0, filterid = 0 } =  me.props.location.query
        tag = Number(tag)
        filterid = Number(filterid)
        return (
			<div className="food-hot hotel-hot">
                <div>
                    <SearchInput me={me} handleSearch={me.handleSearch.bind(me)} />
                </div>
                <div>
                    <SelectBox showOptions={tagsShowOptions} options={tags} optionId={tag} type={'tags'} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'tags')} />
                    <SelectBox showOptions={filteridsShowOptions} options={filterids} optionId={filterid}  type={'filterids'} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'filterids')} />
                </div>
                {
                    fetching ? <Spin /> : <List response={response} me={me} />
                }
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.requestListOrCacheData({FETCH_PAGE,API_PAGE})
        // me.requestList(me,FETCH_PAGE,API_PAGE,true)
        me.shareTextObjSetting({
            title:`趣游崇明`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
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
        me.openPage(`/hotelhot${me.getRequestParam(query)}`)
    }
    componentWillReceiveProps(nextProps){
        const me = this 
        _location = nextProps.location
        me.page = 0
        me.requestList(me,FETCH_PAGE,API_PAGE)
    }
    handleSearch(like){
        const me = this
        let { query } = me.props.location
        query = {
            ...query,
            like
        }
        console.log('query', query)
        me.openPage(`/hotelhot${me.getRequestParam(query)}`)
    }
}
const List = (props) => {
    const { response, me } = props
    const { 
        count = 0,
        data = [],
    } = response.data
    return data.length ? (
        <div>
            <div className="list">
                {
                    data.map((d = { imgs: [] },i)=>{
                        d.stag_names = Array.isArray(d.stag_names) ? d.stag_names : []
                        d.coupon = Array.isArray(d.coupon) ? d.coupon : []
                        return (
                            <div key={i}>
                                <div
                                    className="item"
                                    onClick={()=>{
                                        if(sessionStorage) {
                                            sessionStorage.setItem(FETCH_PAGE, JSON.stringify({
                                                response: me.state[FETCH_PAGE],
                                                scrollTop: getScrollTop(),
                                                page: me.page
                                            }))
                                        }
                                        me.openPage(`/shophot/${d.id}?_t=SLEEP`)
                                    }}
                                    // onClick={me.openPage.bind(me,`/shophot/${d.id}?_t=SLEEP`)}
                                >
                                    <LazyLoad key={i} height={100} offset={100}>
                                        <div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]}${doImg.fw()})`}}></div>
                                    </LazyLoad>
                                    <div className="box">
                                        <div className="name">{d.name}</div>
                                        <div className="stars-permoney">
                                            <StarsShow number={d.star_count||5} />
                                            <div className="permoney"><span>¥{d.custom_avg}</span> 起</div>
                                        </div>
                                        <ul className="tags">
                                            {
                                                d.stag_names.map((d,i)=><li key={i}>{d.tagname}</li>)
                                            }
                                        </ul>
                                        <div className="address clearboth text-elip"><i className="icon"></i>{d.addr1+d.addr2+d.addr3+d.detail}</div>
                                        {
                                            d.coupon.length ? (
                                                <ul className="discountarr">
                                                    <li className={"text-elip color" + [1, 2, 3].sort((a)=>Math.random()<0.5)[0]}>{d.coupon[0].title}</li>
                                                </ul>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                {
                                    i===data.length-1 ? null : <div className="clearboth thinner-border"></div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    ) : <NoMoreData type={'nodata'}/>
}