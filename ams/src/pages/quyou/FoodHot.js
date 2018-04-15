
import banner from '../../images/quyou/banner/foodhot.png'
const initStateResponse = initState()
const API_PAGE = APIS.API_EAT_FOOD_LIST
const FETCH_PAGE = TYPES.FETCH_EAT_FOOD_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse,
            filteridsShowOptions: false,
        }
    }
    renderContent(){
        // document.title='人气美食'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        const { filterids } =  me
        const { filteridsShowOptions } = me.state
        let { filterid = 0 } =  me.props.location.query
        filterid = Number(filterid)
        return (
			<div className="food-hot">
                <img className="banner" src={banner} />
                <div>
                    <SearchInput me={me} handleSearch={me.handleSearch.bind(me)} placeholder={'搜索美食名称'}/>
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
            title:`人气美食`,
            imgUrl: `http://quyou.weichongming.com/static/images/foodhot.0f506936c300278554dbabac524f62d4.png`,
            desc:'整合崇明全域的人气美食、唯爱与美食不可辜负！',
        })
    }
    // 下拉刷新
	// renderContent(){
		// return (
		// 	<div className="food-hot">
        //         <div id="loading"></div>
        //         <div id="touchstart"></div>
        //         <div id="touchend"></div>
        //     </div>
		// )
    // }
    // componentDidMount(){
    //     const me = this
    //     me.requestList(me)
        // window.onscroll = () => { 
        //     if(!getScrollTop()){
        //         const touch = (event) => {  
        //             var event = event || window.event;  
        //             var loading = document.getElementById("loading");  
        //             var touchstart = document.getElementById("touchstart");  
        //             var touchend = document.getElementById("touchend");
                     
        //             switch(event.type){  
        //                 case "touchstart": 
        //                     loading.style.display='block'
        //                     loading.innerHTML = 'loading...'
        //                     window.touchstartY = event.touches[0].clientY
        //                     touchstart.innerHTML = "Touch started (" + event.touches[0].clientX + ", " + event.touches[0].clientY + ")"
        //                     break;  
        //                 case "touchend":  
        //                     loading.style.display='none'
        //                     window.touchendY = event.changedTouches[0].clientY
        //                     touchend.innerHTML = "<br>Touch end (" + event.changedTouches[0].clientX + ", " + event.changedTouches[0].clientY + ")";  
        //                     if(touchendY>touchstartY+70){
        //                         touchend.innerHTML = "<br>Touch end (" + event.changedTouches[0].clientX + ", " + event.changedTouches[0].clientY + ") " + ' pull refresh'
        //                     }
        //                     break; 
        //                 case "touchmove": 
        //                     // event.preventDefault();
        //                     loading.style.height=(event.touches[0].clientY-touchstartY)+'px'
        //                     break; 
        //                 }  
                       
        //         }  
        //         window.ontouchstart=touch
        //         window.ontouchend=touch
        //         window.ontouchmove=touch
        //     }
        //     if (getScrollTop() + getClientHeight() == getScrollHeight()) { 
        //         alert('load more')
        //     } 
        // }
    // }
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
                    data.map((d = { images: [] },i)=>{
                        d.stag_names = Array.isArray(d.stag_names) ? d.stag_names : []
                        return (
                            <div key={i}>
                                <div className="item" onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}>
                                    <LazyLoad key={i} height={100} offset={100}>
                                        <div className="icon cover" style={{backgroundImage:`url(${d.images[0]}${doImg.fw()})`}}></div>
                                    </LazyLoad>
                                    <div className="box">
                                        <div className="name">{d.title}</div>
                                        <div className="stars-permoney clearboth">
                                            <StarsShow number={d.star_count} />
                                            <div className="permoney">¥{d.custom_avg}/人</div>
                                        </div>
                                        <ul className="discount clearboth">
                                            {
                                                d.rec_desc.split(' ').map((da,i)=><li key={i}>{da}</li>)
                                            }
                                        </ul>
                                        <ul className="tags clearboth">
                                            {
                                                d.stag_names.map((d,i)=><li key={i}>{d.tagname}</li>)
                                            }
                                        </ul>
                                    </div>
                                    <div className={classnames({good:true,active:d.is_like})}> 
                                        <i className="icon" />
                                        <div>{d.like_count}</div>
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
    )
}