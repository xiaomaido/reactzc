import bar from '../../images/quyou/trip/bar.png'
import busicon from '../../images/quyou/trip/busicon.png'
import boaticon from '../../images/quyou/trip/boaticon.png'
import guidance from '../../images/quyou/trip/pic-daolantu@3x.png'
import banner from '../../images/quyou/trip/pic-you-list@3x.png'
import tropBak1 from '../../images/quyou/trip/trip-bk1.png';
import tropBak2 from '../../images/quyou/trip/trip-bk2.png';
import tropBakTop from '../../images/quyou/trip/trip-bak-top.png';


const imgSlideList=[
    {
        img: banner,
        url: `/guidance`,
    },
]
const API_PAGE = APIS.API_TOUR_INDEX
const FETCH_PAGE = TYPES.FETCH_TOUR_INDEX
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: {
                data: { }
            }
        }
    }
	renderContent(){
        // document.title='趣游崇明'
        const me=this
        const { fetching, response = { data: { } } } = me.state[FETCH_PAGE]
		return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
		const me = this
        me.setState({
            [FETCH_PAGE]: {
                ...me.state[FETCH_PAGE],
                fetching: 1,
            }
        })
        me.requestAPI(API_PAGE,{},(response)=>{
            me.setState({
                [FETCH_PAGE]: {
                    response,
                    fetching: 0
                }
            })
            me.shareTextObjSetting({
                title:`趣游崇明之靓景`,
                imgUrl:`http://www.weichongming.com/quyou/logo.png`,
                desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
            })
        })
	}
} 


const Content = (props) => {
    const { response, me } = props
    const { 
        tour_pic = '',
        recommPost = [],
    } = response.data
    return (
        <div className="trip">
            {/* <div className="query-box" onClick={me.openPage.bind(me, `/query`)}>
                <div className="query">
                    <i className="icon" />
                    <span>请输入关键字查询</span>
                </div>
            </div> */}
            <TouchSlideBox imgSlideList={imgSlideList} />    
            <div className="menulist">
                <div className="row">
                    <a href="javascript:;" className="row_a" style={{right:0}}>
                        <div className="icon yingyuan"></div>                        
                        <div className="text">影院排名</div>                        
                    </a>
                    <a href={`${window.isHashHistory}/triphot?cate=-1`} className="row_a" style={{left:0}}>
                        <div className="icon jingdian"></div>                        
                        <div className="text">热门景点</div>                        
                    </a>
                    <div className="row_div">
                        <a href="javascript:;">
                            <div className="icon evcard"></div>                        
                            <div className="text">EVCARD</div>                        
                        </a>
                    </div>
                </div>
                <div className="row">
                    <a href="javascript:;" className="row_a" style={{right:0}}>
                        <div className="icon huodong shadow"></div>                        
                        <div className="text">活动报名</div>                        
                    </a>
                    <a href="http://wx.weather.com.cn/mweather/101021100.shtml?from=quyou&isappinstalled=0#1" className="row_a" style={{left:0}}>
                        <div className="icon tianqi"></div>                        
                        <div className="text">天气预报</div>                        
                    </a>
                    <div className="row_div">
                        <a href="javascript:;">
                            <div className="icon geren shadow"></div>                        
                            <div className="text">个人定制</div>                        
                        </a>
                    </div>
                </div>
            </div>
            <div className="top" onClick={me.openPage.bind(me, `/posthot?_t=TOUR`)}>
                <img className="bar" src={bar}  />
                <div style={{height:0}}>&nbsp;</div>
            </div>
            <PictureList list={recommPost} me={me} />
            {/* <div className="banner-box">
                <div className="bigsmall" onClick={me.openPage.bind(me,  `/busline`)}>
                    <div className="big"><span>打造</span>低碳环保出行</div>
                    <div className="small">公共交通线路时刻一览表</div>
                </div>
                <img className="bus" src={bus}  />
            </div> */}
            <div className="busboat">
                <a className="column" href={'http://shanghaicity.openservice.kankanews.com/public/bus'}>
                    <img src={tropBak1} />
                    <div className="trip-bk-icon1"></div>
                    <div className="trip-bk-wenzi">
                        <div>崇明轮渡出行</div>
                        <div className="content">横渡长江中部首选</div>
                    </div>
                    <div className="trip-bk-top"/>
                    {/*<div className="titlet">崇明公交线路</div>*/}
                    {/*<div className="desct">打造低碳环保出行</div>*/}
                    {/*<img alt={'崇明公交'} src={busicon} />*/}
                </a>
                <div className="column" style={{width:0}}><div className="thin-border-verical"></div></div>
                <a className="column" href={'http://shcm.dashenw.cn/static/ferrytime.html'}>
                    <img src={tropBak2} />
                    <div className="trip-bk-icon2"></div>
                    <div className="trip-bk-wenzi">
                        <div>崇明公交线路</div>
                        <div className="content">打造低碳环保出行</div>
                    </div>
                    <div className="trip-bk-top"/>
                    {/*<div className="titlet">崇明轮渡出行</div>*/}
                    {/*<div className="desct">横渡长江岛中部首选</div>*/}
                    {/*<img alt={'崇明轮渡'} src={boaticon} />*/}
                </a>
            </div>
            {/* <div style={{height:0}}>&nbsp;</div> */}
            {/* <div className="guidancediv" onClick={me.openPage.bind(me,  `/guidance`)}>
                <img src={guidance}  />
            </div> */}
        </div>
    )
} 


const PictureList = (props) => {
    const { list, me } = props
    return (
		<div className="video clearboth">
			<div className="vlist">
				<div className="ul-box">
					<ul style={{width:(list.length*fontSize*(200+30)/40)}}>
						{
							list.map((d,i)=>(
								<li key={i} onClick={me.openPage.bind(me, `/posthot/${d.id}?_t=TOUR`)}>
									<div className="icon poster" style={{backgroundImage:`url(${d.imgs})`}}>
									</div>
                                    <div className="text text-elip">{d.title}</div>
								</li>
							))
						}
					</ul>
				</div>
			</div>
			<div className="gap"></div>
		</div>
    )
}
