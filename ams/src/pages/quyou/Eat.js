import quick0 from '../../images/quyou/icon/quick0.png'
import quick1 from '../../images/quyou/icon/quick1.png'
import quick2 from '../../images/quyou/icon/quick2.png'
const API_PAGE = APIS.API_EAT_INDEX
const FETCH_PAGE = TYPES.FETCH_EAT_INDEX
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: {
                data: { }
            }
        }
    }
	renderContent(){
        document.title='趣游崇明'
        const me = this
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
        timeBenefits = '',
        banner = [],
        recomm_medias = [],
        post_index = {},
    } = response.data
    return (
        <div className="eat">
            <div className="top">
                <TouchSlideBox imgSlideList={banner} />
                <img className="bar" src={timeBenefits} onClick={me.openPage.bind(me, `/xianshifuli`)} />
                <ul className="quick">
                    <li onClick={me.openPage.bind(me,  `/shophot`)}>
                        <img src={quick0} style={{float:'left'}} />
                        <div style={{textAlign:'left'}}>人气商家</div>
                    </li>
                    <li onClick={me.openPage.bind(me,  `/foodhot`)}>
                        <img src={quick1} />
                        <div>人气美食</div>
                    </li>
                    <li onClick={me.openPage.bind(me,  `/seasonhot`)}>
                        <img src={quick2} style={{float:'right'}} />
                        <div style={{textAlign:'right'}}>当季推荐</div>
                    </li>
                </ul>
            </div>
            <div className="yummy clearboth">
                <div className="icon logo" onClick={me.openPage.bind(me,  `/yummyhot`)}></div>
                <div className="icon picture" style={{backgroundImage:`url(${post_index.imgs})`}} onClick={me.openPage.bind(me,  `/yummyhot/${post_index.id}`)}></div>
                <div className="content" onClick={me.openPage.bind(me,  `/yummyhot/${post_index.id}`)}>{post_index.description}</div>
            </div>
            <VideoList list={recomm_medias} me={me} />
        </div>
    )
} 
const VideoList = (props) => {
    const { list, me } = props
    return (
        <div className="video clearboth">
            <div className="title-box">
                <div className="line thinner-border clearboth"></div>
                <div className="title" onClick={me.openPage.bind(me, `/videohot`)}>视频推荐</div>
            </div>
            <div className="vlist">
                <div className="ul-box">
                    <ul style={{width:(list.length*fontSize*(240+30)/40)}}>
                        {
                            list.map((d,i)=>(
                                <li key={i} onClick={me.openPage.bind(me, `/videohot${i===list.length-1?'':`/${d.id}`}`)}>
                                    <div className="icon poster" style={{backgroundImage:`url(${d.media})`}}>
                                        {
                                            i===list.length-1 ? <div className="more">更多视频 &gt;</div> : <img src={play} />
                                        }
                                    </div>
                                    <div className="text">{d.title}</div>
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