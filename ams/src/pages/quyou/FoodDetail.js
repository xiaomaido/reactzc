import { CommentFixed, CommentList, Intro } from './Quyou'
import phone from '../../images/quyou/icon/phone.png'
import addr from '../../images/quyou/icon/addr.png'
import StarsShow from '../../components/StarsShow/'
export default class Index extends Quyou{
	render(){
        document.title='商家信息'
        // debugger
        // location.query
        // {id: "2"}
		return (
			<div className="shop-detail food-detail">
                <CommentFixed />
                <div className="fooder">
                    <div className="stars-permoney">
                        <StarsShow number={5} />
                        <div className="permoney">¥10/人</div>
                    </div>
                    <div className="food-name">红烧东坡肉套餐</div>
                    <div className="discount-tags">
                        <ul className="discount">
                            <li>全场9折</li>
                            <li>满20减3</li>
                        </ul>
                        <ul className="tags">
                            <li>本帮菜</li>
                            <li>回头客多</li>
                        </ul>
                    </div>
					<PictureList list={Array.apply(null,{length:5})} me={this} />
                    <div className="clearboth thinner-border"></div>
                </div>
                <Intro />
				<div className="gap"></div>
				<div className="necker">
					<div className="necker-box">
						<div className="intro"><span></span>菜品介绍</div>
						<div className="clearboth thinner-border"></div>
						<div className="descrip">源自美国，手术后妇女节昵称开心农场开心农场看查看源自美国，手术后妇女节昵称开心农场开心农场看查看源自美国手术后妇女节昵称开心农场开心农场看查看源自美国，手术后妇女节昵称开心农场开心农场看查看</div>
						{/* <div className="open-more">展开更多 ^</div> */}
						<div className="clearboth thinner-border"></div>
                        <div className="discount">
			                <div className="title"><div>惠</div>本品优惠</div>
                            <div className="buy-box">
                                <div className="left">
                                    <div className="price">￥24.9<span>原价￥36.9</span></div>
                                </div>
                                <div className="right">抢购</div>
                            </div>
                        </div>
					</div>
				</div>
                <CommentList total={28} list={[{},{},{},{},{}]} />
            </div>
		)
	}
}

const PictureList = (props) => {
    const { list, me } = props
    return (
		<div className="video clearboth">
			<div className="vlist">
				<div className="ul-box">
					<ul style={{width:(list.length*fontSize*(200+30)/40)}}>
						{
							list.map((d,i)=>(
								<li key={i} onClick={me.openPage.bind(me, `abc${i===list.length-1?'':`/${i+1}`}`)}>
									<div className="icon poster" style={{backgroundImage:'url(http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg)'}}>
									</div>
								</li>
							))
						}
					</ul>
				</div>
			</div>
			<div className="gap"></div>
		</div>
    )
}