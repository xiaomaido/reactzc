import banner from '../../images/quyou/banner/shophot.png'
const initStateResponse = initState()
const API_PAGE = APIS.API_EAT_SHOP_LIST
const FETCH_PAGE = TYPES.FETCH_EAT_SHOP_LIST
export default class Index extends Quyou{
    state={
        [FETCH_PAGE]:{
            response: initStateResponse
        }
    }
	renderContent(){
        // document.title='人气商家'
        const me = this
        const { fetching, response = initStateResponse } = me.state[FETCH_PAGE]
        return (
			<div className="shop-hot">
                <img className="banner" src={banner} />
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
            title:`人气商家`,
            imgUrl: `http://quyou.weichongming.com/static/images/shophot.6aa46ea1b7d4a35f033ee113df4e7a03.png`,
            desc:'整合崇明全域的人气商家、精推品质之选！',
        })
    }
}

const List = (props) => {
    const { response, me } = props
    const { 
        count = 0,
        data = [],
    } = response.data
    const { pathname } = _location
    return (
        <div>
            <div className="list">
                {
                    data.map((d = { imgs: [] },i)=>(
                        <div key={i}>
                            <div className="item" onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}>
                                <div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]})`}}></div>
                                <div className="box">
                                    <div className="name">{d.name}</div>
                                    <div className="address text-elip"><i className="icon"></i>{d.addr1+d.addr2+d.addr3+d.detail}</div>
                                    <ul className="shop-sns">
                                        <li><i className="icon good"></i>{d.like_count}</li>
                                        <li><i className="icon comment"></i>{d.comment_count}</li>
                                        {/* <li><i className="icon collect"></i>0</li> */}
                                    </ul>
                                </div>
                                {/* <div className="num">月售<span>{d.sale_count}</span></div> */}
                            </div>
                            {
                                i===data.length-1 ? null : <div className="clearboth thinner-border"></div>
                            }
                        </div>
                    ))
                }
            </div>
            {
                me.page >= Math.ceil(count/me.limit)-1 ?  <NoMoreData /> : <Spin.Spin2 />
            }
        </div>
    )
}