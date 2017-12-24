const API_PAGE = APIS.API_SLEEP_INDEX
const FETCH_PAGE = TYPES.FETCH_SLEEP_INDEX
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
    const tags = [12,4,3,9,10,11]
    return (
        <div className="eat">
            <div className="top">
                <TouchSlideBox imgSlideList={banner} />
                <div className="hotelhot" onClick={me.openPage.bind(me, `/hotelhot?cate=-1`)}>
                    <div className="icon"></div>
                    <div className="clearboth thinner-border"></div>
                </div>
                <div className="hotelCates">
                    {
                        tags.map(d=><a key={d} className="icon" href={`${window.isHashHistory}/hotelhot?tag=${d}`}></a>)
                    }
                </div>
            </div>
            <div className="yummy clearboth" onClick={me.openPage.bind(me,  `/posthot?_t=SLEEP`)}>
                <div className="icon logo hotel"></div>
                <div className="icon picture" style={{backgroundImage:`url(${post_index.imgs})`}}></div>
                <div className="content">{post_index.description}</div>
            </div>
            <VideoList list={recomm_medias} me={me} title={"酒店视频"} type={"SLEEP"} />
        </div>
    )
}
