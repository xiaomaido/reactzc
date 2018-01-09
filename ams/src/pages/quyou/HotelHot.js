import { debug } from "util";

const initStateResponse = {
	data: {
        "count": 0,
        "data": [],
    }
}
const API_PAGE = APIS.API_SLEEP_SHOP_LIST
const FETCH_PAGE = TYPES.FETCH_SLEEP_SHOP_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        },
        tagsShowOptions: false,
        townsShowOptions: false,
    }
    constructor(props){
        super(props)
        const me = this
        me.tags=[
            {
                title:'全部',
                id:0, 
            },
            ...me.hotelTags.map(({id, title})=>({id, title}))
        ]
        // console.log(me.tags)
    }
    renderContent(){
        // document.title='精品酒店'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        return (
			<div className="food-hot hotel-hot">
                {
                    fetching ? <Spin /> : <List response={response} me={me} />
                }
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.requestList(me,FETCH_PAGE,API_PAGE)
        me.shareTextObjSetting({
            title:`趣游崇明`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
    }
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
    handleSelectBoxChageColumn(type){
        const temp = `${type}ShowOptions`
        // console.log('temp',temp)
        let nextState = {
            [temp]: !this.state[temp],
        }
        if(type === 'tags'){
            nextState['townsShowOptions']=false
        }else if(type === 'towns'){
            nextState['tagsShowOptions']=false
        }
        this.setState(nextState)
    }
    handleSelectBoxChage({type = '',option = {}}){
        const me = this
        console.log('type',type)
        console.log('option',option)
        let { query } = me.props.location
        if(type === 'tags'){
            query['tag'] = option.id
        }
        else if(type === 'towns'){
            query['town'] = option.id
        }
        me.openPage(`/hotelhot${me.getRequestParam(query)}`)
    }
    componentWillReceiveProps(nextProps){
        const me = this 
        _location = nextProps.location
        me.page = 0
        me.requestList(me,FETCH_PAGE,API_PAGE)
    }
}
const List = (props) => {
    const { response, me } = props
    const { 
        count = 0,
        data = [],
    } = response.data
    const { tags, towns } =  me
    const { tagsShowOptions, townsShowOptions } = me.state
    let { tag = 0, town = 0 } =  me.props.location.query
    tag = Number(tag)
    town = Number(town)
    return data.length ? (
        <div>
            <div>
                <SelectBox showOptions={tagsShowOptions} options={tags} optionId={tag} type={'tags'} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'tags')} />
                <SelectBox showOptions={townsShowOptions} options={towns} optionId={town}  type={'towns'} handleSelectBoxChage={me.handleSelectBoxChage.bind(me)} handleSelectBoxChageColumn={me.handleSelectBoxChageColumn.bind(me,'towns')} />
            </div>
            <div className="list">
                {
                    data.map((d = { imgs: [] },i)=>{
                        d.stag_names = Array.isArray(d.stag_names) ? d.stag_names : []
                        return (
                            <div key={i}>
                                <div className="item" onClick={me.openPage.bind(me,`/shophot/${d.id}?_t=SLEEP`)}>
                                    <LazyLoad key={i} height={100} offset={100}>
                                        <div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]})`}}></div>
                                    </LazyLoad>
                                    <div className="box">
                                        <div className="name">{d.name}</div>
                                        <div className="stars-permoney">
                                            <StarsShow number={d.star_count||5} />
                                            <div className="permoney"><span>¥{d.custom_avg}</span> 起</div>
                                        </div>
                                        <ul className="tags">
                                            {
                                                d.stag_names.map((d,i)=><li key={i}>{d.tagname}</li>)
                                            }
                                        </ul>
                                        <div className="address clearboth"><i className="icon"></i>{d.addr1+d.addr2+d.addr3+d.detail}</div>
                                    </div>
                                </div>
                                {
                                    i===data.length-1 ? null : <div className="clearboth thinner-border"></div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    ) : null
}