import './hotel/hotel.scss';
import hotelcover from '../../images/quyou/hotelcover.png'
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
    const wenzi = [
        '精品酒店',
        '经济适用',
        '特色民宿',
        '人气推荐',
        '特惠折扣',
        '生态农庄',
    ]
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
                        me.hotelTags.map(({id, name, title}, index)=>{
                            // return <a key={id} className="icon" href={`${window.isHashHistory}/hotelhot?tag=${id}`}>
                            //     </a>
                            return <div key={index} className="cont icon">

                                <a key={id} className="icon" href={`${id===11?`${window.isHashHistory}/tehuihot`:`${window.isHashHistory}/hotelhot?tag=${id}`}`}>
                                </a>
                                <div className="wenzi">{title}</div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="yummy clearboth">
                <div className="zhu2 icon" onClick={me.openPage.bind(me,  `/posthot?_t=SLEEP`)}>
                </div>
                {/*<div className="icon logo hotel" onClick={me.openPage.bind(me,  `/posthot?_t=SLEEP`)}></div>*/}
                {/*<div className="icon picture" style={{backgroundImage:`url(${post_index.imgs})`}} onClick={me.openPage.bind(me,  `/posthot/${post_index.id}?_t=SLEEP`)}></div>*/}
                {/*<div className="content" onClick={me.openPage.bind(me, `/posthot/${post_index.id}?_t=SLEEP`)}>{post_index.description}</div>*/}
            </div>
            <VideoList
                list={recomm_medias}
                me={me}
                title={"酒店视频"}
                type={"SLEEP"}
                cover={hotelcover}
            />
        </div>
    )
}
