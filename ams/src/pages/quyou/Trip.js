import bar from '../../images/quyou/trip/bar.png'
import bus from '../../images/quyou/trip/bus.png'
import guidance from '../../images/quyou/trip/pic-daolantu@3x.png'
import banner from '../../images/quyou/trip/pic-you-list@3x.jpg'
const imgSlideList=[
    {
        img: banner,
        url: `/triphot?cate=-1`,
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
            <div className="top" onClick={me.openPage.bind(me, `/posthot?_t=TOUR`)}>
                <img className="bar" src={bar}  />
                <div style={{height:0}}>&nbsp;</div>
            </div>
            <PictureList list={recommPost} me={me} />
            <div className="banner-box">
                <div className="bigsmall" onClick={me.openPage.bind(me,  `/busline`)}>
                    <div className="big"><span>打造</span>低碳环保出行</div>
                    <div className="small">公共交通线路时刻一览表</div>
                </div>
                <img className="bus" src={bus}  />
                
            </div>
            <div style={{height:0}}>&nbsp;</div>
            <div className="guidancediv" onClick={me.openPage.bind(me,  `/guidance`)}>
                <img src={guidance}  />
            </div>
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
