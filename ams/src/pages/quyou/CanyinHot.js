
import banner from '../../images/quyou/icon/canyinmingdian.png'
const initStateResponse = initState()
const API_PAGE = APIS.API_EAT_CANYIN_LIST
const FETCH_PAGE = TYPES.FETCH_EAT_CANYIN_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse,
            filteridsShowOptions: false,
        }
    }
	renderContent(){
        // document.title='餐饮名店'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        const { filterids } =  me
        const { filteridsShowOptions } = me.state
        let { filterid = 0 } =  me.props.location.query
        filterid = Number(filterid)
        return (
			<div className="shop-hot">
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
        me.requestListOrCacheData({FETCH_PAGE,API_PAGE})
        // me.requestList(me,FETCH_PAGE,API_PAGE,true)
        me.shareTextObjSetting({
            title:`餐饮名店`,
            imgUrl: `http://www.weichongming.com/static/images/canyinmingdian1.png`,
            desc:'整合崇明全域的餐饮名店！',
        })
    }
}

const List = (props) => {
    const { response, me } = props
    let { 
        count = 0,
        data = [],
    } = response.data
    const { pathname } = _location
    data = Array.isArray(data)?data:[]
    return (
        <div>
            <div className="list">
                {
                    
                    data.map((d = { imgs: [] },i)=>{
                        d.coupon = Array.isArray(d.coupon) ? d.coupon : []
                        d.tag_name = Array.isArray(d.tag_name) ? d.tag_name : []
                        d.tag_name = [
                            {createtime: 1514872995, id: 5, mode: "0000", status: "0", tagname: "餐饮名店"},
                            // {createtime: 1514872995, id: 6, mode: "0000", status: "0", tagname: "限时特惠"},
                            // {createtime: 1514872995, id: 7, mode: "0000", status: "0", tagname: "全场95折"},
                            {createtime: 1514872995, id: 8, mode: "0000", status: "0", tagname: "买二送一"},
                        ]
                        d.tag_name.length = d.tag_name.length<=4 ? d.tag_name.length : 4
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
                                        me.openPage(`${pathname}/${d.id}`)
                                    }}
                                    // onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}

                                >
                                    <div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]}${doImg.fw()})`}}></div>
                                    <div className="box">
                                        <div className="name">{d.name}</div>
                                        <div className="address text-elip"><i className="icon"></i>{d.addr1+d.addr2+d.addr3+d.detail}</div>
                                        
                                        <ul className="shop-sns">
                                            <li><i className="icon good"></i>{d.like_count}</li>
                                            <li><i className="icon comment"></i>{d.comment_count}</li>
                                            {/* <li><i className="icon collect"></i>0</li> */}
                                        </ul>
                                        {
                                            d.tag_name.length ? (
                                                <ul className="discountarr">
                                                {
                                                    d.tag_name.map((d,i)=><li key={i} className={`text-elip color${i}`}>{d.tagname}</li>)
                                                }
                                                </ul>
                                            ) : null
                                            // d.coupon.length ? (
                                            //     <ul className="discountarr">
                                            //         <li className={"text-elip color" + [0, 1, 2, 3].sort((a)=>Math.random()<0.5)[0]}>{d.coupon[0].title}</li>
                                            //     </ul>
                                            // ) : null
                                        }
                                    </div>
                                    {/* <div className="num">月售<span>{d.sale_count}</span></div> */}
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
    )
}