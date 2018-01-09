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
            me.shareTextObjSetting({
                title:`趣游崇明之雅宿`,
                imgUrl:`http://www.weichongming.com/quyou/logo.png`,
                desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
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
    // {
    //     me.hotelTags.map(({id, name})=><a key={id} className="icon" href={`${window.isHashHistory}/hotelhot?tagname=${name}&tag=${id}`}></a>)
    // }
    return (
        <div className="eat">
            <div className="top">
                <TouchSlideBox imgSlideList={banner} />
                <div className="hotelhot" onClick={me.openPage.bind(me, `/hotelhot`)}>
                    <div className="icon"></div>
                    <div className="clearboth thinner-border"></div>
                </div>
                <div className="hotelCates">
                    {
                        me.hotelTags.map(({id, name})=><a key={id} className="icon" href={`${window.isHashHistory}/hotelhot?tag=${id}`}></a>)
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
