import quick0 from '../../images/quyou/icon/quick0.png'
import quick1 from '../../images/quyou/icon/quick1.png'
import quick2 from '../../images/quyou/icon/quick2.png'
import quick3 from '../../images/quyou/icon/quick3.png'
import canyinmingdian from '../../images/quyou/icon/canyinmingdian.png'
import eatcover from '../../images/quyou/eatcover.png'
import './eat/eat.scss'
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
                title:`趣游崇明之美食`,
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
    return (
        <div className="eat">
            <div className="top">
                <TouchSlideBox imgSlideList={banner} />
                {/* <img className="bar" src={timeBenefits} onClick={me.openPage.bind(me, `/xianshifuli`)} /> */}
                {/* <ul className="quick">
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
                </ul> */}
                <ul className="quickicon">
                    <li onClick={me.openPage.bind(me,  `/shophot`)}>
                        <img src={quick0} />
                        <div>人气商家</div>
                    </li>
                    <li onClick={me.openPage.bind(me,  `/foodhot`)}>
                        <img src={quick1} />
                        <div>人气美食</div>
                    </li>
                    <li onClick={me.openPage.bind(me,  `/seasonhot`)}>
                        <img src={quick2}/>
                        <div>当季推荐</div>
                    </li>
                    <li onClick={me.openPage.bind(me,  `/tehuihot`)}>
                        <img src={quick3}/>
                        <div>特惠专场</div>
                    </li>
                </ul>
            </div>
            <div className="yummy clearboth">
                <div className="icon eat-log canyinmingdian" onClick={me.openPage.bind(me,  `/canyinhot`)}></div>
            </div>
            <div className="yummy clearboth">
                <div className="icon eat-log" onClick={me.openPage.bind(me,  `/posthot`)}></div>
                {/*<div className="icon logo" onClick={me.openPage.bind(me,  `/posthot`)}></div>*/}
                {/*<div className="icon picture" style={{backgroundImage:`url(${post_index.imgs})`}} onClick={me.openPage.bind(me,  `/posthot/${post_index.id}`)}></div>*/}
                {/*<div className="content" onClick={me.openPage.bind(me,  `/posthot/${post_index.id}`)}>{post_index.description}</div>*/}
            </div>
            {/* <div className="yummy clearboth" onClick={me.openPage.bind(me,  `/posthot?_t=PLUS`)}>
                <div className="icon logo"></div>
                <div className="icon picture" style={{backgroundImage:`url(${post_index.imgs})`}}></div>
                <div className="content">点此进入图文列表</div>
            </div> */}
            <VideoList
                list={recomm_medias}
                me={me}
                cover={eatcover}
            />
        </div>
    )
}

// onClick={me.openPage.bind(me,  `/posthot/${post_index.id}`)}