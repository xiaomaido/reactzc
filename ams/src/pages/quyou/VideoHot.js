import { Quyou } from './Quyou'
const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const FETCH_PAGE = TYPES.FETCH_MEDIA_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        },
        blocksShowOptions: false,
        catesShowOptions: false,
        townsShowOptions: false,
    }
    blocks=[
        {
            title:'板块',
            id:0, 
        },
        {
            title:'吃',
            id:1, 
        },
        {
            title:'住',
            id:2, 
        },
    ]
    // groups = ["请选择所在单位","新村乡","绿华镇","三星镇","庙镇","港西镇","城桥镇","建设镇","新河镇","竖新镇","堡镇","港沿镇","向化镇","中兴镇","陈家镇","长兴镇","横沙镇","新海镇","东平镇","经委","农委","建管委","卫生计生委","公安分局","人力资源社会保障局","民政局","教育局","文广影视局","规划土地局","住房保障房屋管理局","城管执法局","水务局","交通委","崇明工业园区","富盛经济开发区","森林旅游园区","亚通公司","税务局","市场监管局","崇明客轮公司","区级机关","上海客轮公司","巴士公交公司","新闻传媒中心","其他单位"]
    towns=[
        {
            title:'区域',
            id:0, 
        },
        {
            title:'新村乡',
            id:1, 
        }, 
        {
            title:'绿华镇',
            id:2, 
        }, 
        {
            title:'三星镇',
            id:3, 
        },
        {
            title:'庙镇',
            id:4, 
        }, 
        {
            title:'港西镇',
            id:5, 
        }, 
        {
            title:'竖新镇',
            id:6, 
        }, 
        {
            title:'城桥镇',
            id:7, 
        }, 
        {
            title:'新河镇',
            id:8, 
        }, 
        {
            title:'港沿镇',
            id:9, 
        }, 
        {
            title:'中兴镇',
            id:10, 
        }, 
        {
            title:'向化镇',
            id:11, 
        }, 
    ]
    cates=[
        {
            title:'筛选',
            id:0, 
        },
        {
            title:'川湘菜',
            id:1, 
        },
        {
            title:'本帮菜',
            id:2, 
        },
        {
            title:'日料',
            id:3, 
        },
    ]
    handleSelectBoxChageColumn(type){
        const temp = `${type}ShowOptions`
        console.log(temp)
        let nextState = {
            [temp]: !this.state[temp],
        }
        if(type === 'blocks'){
            nextState['catesShowOptions']=false
            nextState['townsShowOptions']=false
        }else if(type === 'cates'){
            nextState['blocksShowOptions']=false
            nextState['townsShowOptions']=false
        }else if(type === 'towns'){
            nextState['blocksShowOptions']=false
            nextState['catesShowOptions']=false
        }
        this.setState(nextState)
    }
    handleSelectBoxChage(value){
        console.log(value)
    }
	renderContent(){
        // document.title='视频推荐'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        // const { blocks, cates, towns } =  me
        // const { blocksShowOptions, catesShowOptions, townsShowOptions } = me.state
        // return (
        //     <div className="yummy-hot video-hot">
        //         <div>
        //             <SelectBox showOptions={blocksShowOptions} options={blocks} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'blocks')} />
        //             {/* <div className="clearboth thin-border-verical"></div> */}
        //             <SelectBox showOptions={catesShowOptions} options={cates} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'cates')} />
        //             <SelectBox showOptions={townsShowOptions} options={towns} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'towns')} />
        //         </div>
        //         <div style={{height: 800}}></div>
        //     </div>
        // )
        return fetching ? <Spin /> : (response.code === 0 ? <Content response={response} me={me} /> : null)
    }
    componentDidMount(){
        const me = this
        const { query } = me.props.location
        const _t = query._t || 'EAT'
        const API_PAGE = APIS[`API_${_t}_MEDIA_LIST`]
        me.requestList(me, FETCH_PAGE, API_PAGE)
        me.shareTextObjSetting({
            title:`趣游崇明之精选视频`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
    }
}

const Content = (props) => {
    const { response, me } = props
    let { 
        count = 0,
        data = [],
    } = response.data
    data = Array.isArray(data) ? data : []
	const { query } = _location
    const _t = query._t || 'EAT'
    const { blocks, cates, towns } =  me
    const { blocksShowOptions, catesShowOptions, townsShowOptions } = me.state
    return (
        <div className="yummy-hot video-hot"> 
            {/* <div>
                <SelectBox showOptions={blocksShowOptions} options={blocks} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'blocks')} />
                <SelectBox showOptions={catesShowOptions} options={cates} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'cates')} />
                <SelectBox showOptions={townsShowOptions} options={towns} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'towns')} />
            </div> */}
            <PostList list={data} me={me} type={_t} isVideo={true} />
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    )
}  
