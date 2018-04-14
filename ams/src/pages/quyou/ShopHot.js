import banner from '../../images/quyou/banner/shophot.png'
const initStateResponse = initState()
const API_PAGE = APIS.API_EAT_SHOP_LIST
const FETCH_PAGE = TYPES.FETCH_EAT_SHOP_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse,
            filteridsShowOptions: false,
        }
    }
	renderContent(){
        // document.title='人气商家'
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
        me.openPage(`/shophot${me.getRequestParam(query)}`)
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
            title:`人气商家`,
            imgUrl: `http://quyou.weichongming.com/static/images/shophot.6aa46ea1b7d4a35f033ee113df4e7a03.png`,
            desc:'整合崇明全域的人气商家、精推品质之选！',
        })
    }
    handleSearch(like){
        const me = this
        let { query } = me.props.location
        query = {
            ...query,
            like
        }
        console.log('query', query)
        me.openPage(`/shophot${me.getRequestParam(query)}`)
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
                        return (
                            <div key={i}>
                                <div className="item" onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}>
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
                                            d.coupon.length ? (
                                                <ul className="discountarr">
                                                    <li className={"text-elip color" + [1, 2, 3].sort((a)=>Math.random()<0.5)[0]}>{d.coupon[0].title}</li>
                                                </ul>
                                            ) : null
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