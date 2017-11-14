
import banner from '../../images/quyou/banner/foodhot.png'
import good from '../../images/quyou/icon/good.png'
import goodActive from '../../images/quyou/icon/good-active.png'
import StarsShow from '../../components/StarsShow/'
export default class Index extends Quyou{
	render(){
        document.title='人气美食'
        const { location } = this.props
		return (
			<div className="food-hot"> 
                <img className="banner" src={banner} />
                <FoodList list={Array.apply(null,{length:5})} me={this} pathname={location.pathname} />
            </div>
		)
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
                            <div className="good">
                                <i className="icon" style={{backgroundImage:'url('+good+')'}}></i>
                                <div>587</div>
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