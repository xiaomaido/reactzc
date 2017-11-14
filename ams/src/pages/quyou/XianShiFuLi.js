
import banner from '../../images/quyou/banner/shophot.png'
export default class XianShiFuLi extends Quyou{
	render(){
        document.title='限时福利'
        const { location } = this.props
		return (
			<div className="xian-shi-fu-li"> 
                <img className="banner" src={banner} />
                <div className="list">
                    <div className="item" onClick={this.openPage.bind(this,location.pathname+'/abc')}>
                        <div className="icon cover"></div>
                        <div className="product">[快乐柠檬] 恶魔波霸奶茶买一送一</div>
                        <div className="price-buy">
                            <div className="buy">
                                <div className="remain">剩余<span>69</span>份</div>
                                <div className="btn">抢购</div>
                            </div>
                            <div className="price">
                                <div className="now"><span>¥</span>29.9</div>
                                <div className="origin">¥39.9</div>
                            </div>
                        </div>
                        <div className="clearboth foot"></div>
                    </div>
                    <div className="clearboth thinner-border"></div>
                    <div className="item" onClick={this.openPage.bind(this,location.pathname+'/abc')}>
                        <div className="icon cover"></div>
                        <div className="product">[快乐柠檬] 恶魔波霸奶茶买一送一</div>
                        <div className="price-buy">
                            <div className="buy">
                                <div className="remain">剩余<span>69</span>份</div>
                                <div className="btn">抢购</div>
                            </div>
                            <div className="price">
                                <div className="now"><span>¥</span>29.9</div>
                                <div className="origin">¥39.9</div>
                            </div>
                        </div>
                        <div className="clearboth foot"></div>
                    </div>
                    <div className="clearboth thinner-border"></div>
                </div>
            </div>
		)
	}
}