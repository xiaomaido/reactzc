
import banner from '../../images/quyou/banner/foodhot.png'
import good from '../../images/quyou/icon/good.png'
import StarsShow from '../../components/StarsShow/'
const FETCH_FOOD_HOT_LIST='FETCH_FOOD_HOT_LIST'
export default class Index extends Quyou{
    state = {
        FETCH_FOOD_HOT_LIST: {
            response: {
                datas: []
            },
            fetching: 0
        }
    }
	render(){
        document.title='人气美食'
        const { location } = this.props
        const { FETCH_FOOD_HOT_LIST } = this.state
		return (
			<div className="food-hot"> 
                <img className="banner" src={banner} />
                {
                    FETCH_FOOD_HOT_LIST.fetching ? <FoodList list={FETCH_FOOD_HOT_LIST.response.datas} me={this} pathname={location.pathname} /> : <Spin />
                }
            </div>
		)
    }
    componentDidMount(){
        let { FETCH_FOOD_HOT_LIST } = this.state
        FETCH_FOOD_HOT_LIST={
            ...FETCH_FOOD_HOT_LIST,
            fetching: 1,
            response: {
                datas: Array.apply(null,{length:5})
            },
        }
        setTimeout(()=>{
            this.setState({
                FETCH_FOOD_HOT_LIST
            })
        }, 1500)
    }
}
const FoodList = (props) => {
    const { list, me, pathname } = props
    return (
        <div className="list">
            {
                list.map((d,i)=>(
                    <div key={i}>
                        <div className="item" onClick={me.openPage.bind(me,`${pathname}/${i+1}`)}>
                            <div className="icon cover"></div>
                            <div className="box">
                                <div className="name">龙门花甲套餐</div>
                                <div className="stars-permoney">
                                    <StarsShow number={i+1} />
                                    <div className="permoney">¥20/人</div>
                                </div>
                                <ul className="tags">
                                    <li>本帮菜</li>
                                    <li>回头客多</li>
                                </ul>
                                <ul className="discount">
                                    <li>全场9折</li>
                                    <li>满20减3</li>
                                </ul>
                            </div>
                            <div className={classnames({good:true,active:i%2})}> 
                                <i className="icon" />
                                <div>58</div>
                            </div>
                        </div>
                        {
                            i===list.length-1 ? null : <div className="clearboth thinner-border"></div>
                        }
                    </div>
                ))
            }
        </div>
    )
}