
import banner from '../../images/quyou/banner/foodhot.png'
const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const API_PAGE = APIS.API_EAT_FOOD_LIST
const FETCH_PAGE = TYPES.FETCH_EAT_FOOD_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
    renderContent(){
        document.title='人气美食'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        return (
			<div className="food-hot">
                <img className="banner" src={banner} />
                {
                    fetching ? <Spin /> : <List response={response} me={me} />
                }
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.requestList(me,FETCH_PAGE,API_PAGE)
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
        data = [],
    } = response.data
    const { pathname } = _location
    return (
        <div className="list">
            {
                data.map((d = { images: [] },i)=>(
                    <div key={i}>
                        <div className="item" onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}>
                            <div className="icon cover" style={{backgroundImage:`url(${d.images[0]})`}}></div>
                            <div className="box">
                                <div className="name">{d.title}</div>
                                <div className="stars-permoney">
                                    <StarsShow number={d.star_count} />
                                    <div className="permoney">¥{d.custom_avg}/人</div>
                                </div>
                                <ul className="discount">
                                    {
                                        d.rec_desc.split(' ').map((da,i)=><li key={i}>{da}</li>)
                                    }
                                </ul>
                                <ul className="tags">
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
                ))
            }
        </div>
    )
}