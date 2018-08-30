import fuli from '../../images/quyou/banner/fuli.png'
const imgSlideList=[
    {
        img: '//s4.xiaohongshu.com/static/message/886dfb568604f2c990ff891329c09688.jpg',
        url: '/shophot/3',
    },
    {
        img: '//s4.xiaohongshu.com/static/message/8b733c9c2ef37551487aaad3d7b1a080.jpeg',
        url: '',
    },
    {
        img: fuli,
        url: 'https://m.xiaohongshu.com/discovery/item/59fc80bbc1605f58897f26a4',
    },
]
const initStateResponse = initState()
const API_PAGE_SET=[APIS.API_EAT_SHOP_LIST,APIS.API_SLEEP_SHOP_LIST,APIS.API_TOUR_SHOP_LIST]
const FETCH_PAGE_SET=[TYPES.FETCH_EAT_SHOP_LIST,TYPES.FETCH_SLEEP_SHOP_LIST,TYPES.FETCH_TOUR_SHOP_LIST]

const ltypesSet=['EAT','SLEEP','TOUR']
export default class Index extends Quyou{
    ltypes=['吃','住','游']
    ltypesEn=['eat-m','zhu-m','trip-m']
    
    constructor(props){
        super(props)
        this.ltype = Number(props.location.query.ltype) || 0
        this.state={
            [FETCH_PAGE_SET[this.ltype]]:{
                response: initStateResponse
            }
        }
    }
    handleClick(type=0){
        const me = this
        if(type !== this.ltype) {
            me.openPage(`/mallfuli?has_coupon=1&ltype=${type}`)
        }
    }
	renderContent(){      
        // document.title='平台福利专区'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE_SET[this.ltype]]
        return (
            <div className="mall-fuli">
                {/* <div className="neck">
                    <TouchSlideBox imgSlideList={imgSlideList} />               
                </div> */}
                <ul className="types">
                    {
                        me.ltypes.map((d,i)=>(
                            <li key={i} className={classnames({active:this.ltype===i})} onClick={me.handleClick.bind(me,i)}>
                                <div className="name">{d}</div>
                                <div className={`${this.ltypesEn[i]} image-m`}></div>
                                <div className="t-down"></div>
                            </li>
                        ))
                    }
                </ul>
                {
                    fetching ? <Spin /> : <List response={response} me={me} ltype={this.ltype}/>
                }
            </div>
        )
    }
    componentDidMount(){
        const me = this
        me.requestList(me,FETCH_PAGE_SET[this.ltype],API_PAGE_SET[this.ltype])
        me.shareTextObjSetting({
            title:`趣游-平台福利专区`,
            imgUrl:`http://www.weichongming.com/quyou/logo.png`,
            desc:'整合崇明全域“吃住游购”旅游产品的综合平台和崇明旅游行业引导的风向标。',
        })
    }
    componentWillReceiveProps(nextProps){
        const me = this 
        _location = nextProps.location
        this.ltype = Number(nextProps.location.query.ltype) || 0
        me.requestList(me,FETCH_PAGE_SET[this.ltype],API_PAGE_SET[this.ltype])
    }
} 

const List = (props) => {
    const { response, me, ltype } = props
    let { 
        count = 0,
        data = [],
    } = response.data
    const { pathname } = _location
    data = Array.isArray(data)?data:[]
    return (
        <div>
            <ul className="coupon-list">
                {
                    data.map((d = { imgs: [] },i)=>{
                        d.coupon = Array.isArray(d.coupon) ? d.coupon : []
                        const idx = Object.keys(Array.apply(null,{length: d.coupon.length})).sort((a,b)=>Math.random()>=0.5)[0]
                        // console.log(Object.keys(Array.apply(null,{length: d.coupon.length})).sort((a,b)=>Number(b)-Number(a)))
                        // const idx = 0
                        console.log(idx)
                        return (
                            <li key={i}>
                                <div className="cover-box" onClick={me.openPage.bind(me,`/shophot/${d.id}?_t=${ltypesSet[ltype]}`)}>
                                    <div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]}${doImg.fw()})`}}></div>
                                    <div className="box">
                                        <div className="handed"><span>{d.coupon.length && d.coupon[idx] ? d.coupon[idx].reciev_count : 0}</span> 人已领取</div>
                                        <div className="name">{d.name}</div>
                                        <div className="addr">[{d.addr2+(d.addr3?'·'+d.addr3:'')}店]</div>
                                        {
                                            d.coupon.length ? (
                                                <ul className="discountarr">
                                                    <li className={"text-elip color" + [1, 2, 3].sort((a)=>Math.random()<0.5)[0]}>{d.coupon[idx].title}</li>
                                                </ul>
                                            ) : null
                                        }
                                    </div>
                                </div>
                                {
                                    i===data.length-1 ? null : <div className="clearboth thinner-border"></div>
                                }
                            </li>
                        )
                    })
                }
            </ul>
            {
                me.page === 0? null: (me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />)
            }
        </div>
    )
}