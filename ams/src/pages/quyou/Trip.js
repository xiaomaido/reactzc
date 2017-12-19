import bar from '../../images/quyou/trip/bar.png'
import bus from '../../images/quyou/trip/bus.png'
import polist from '../../images/quyou/trip/pic-you-list@3x.png'
const imgSlideList=[
    {
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1511101690419&di=a98e9651e4a9db6941ab4193311bd857&imgtype=0&src=http%3A%2F%2Fstaticfile.tujia.com%2Fupload%2Finfo%2Fday_130821%2F201308211016286747_s.jpg',
        url: '/guidance',
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
            <div className="polistdiv" onClick={me.openPage.bind(me,  `/triphot?cate=-1`)}>
                <img src={polist}  />
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
								<li key={i} onClick={me.openPage.bind(me, `posthot/${d.id}?_t=TOUR`)}>
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
