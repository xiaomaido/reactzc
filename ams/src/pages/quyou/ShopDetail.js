import { CommentFixed, CommentList, Intro } from './Quyou'
import phone from '../../images/quyou/icon/phone.png'
import addr from '../../images/quyou/icon/addr.png'
export default class ShopDetail extends Quyou{
	render(){
		document.title='商家信息'
		
		return (
			<div className="shop-detail">
				<CommentFixed />
				<Intro needCover={true} />
				<div className="gap"></div>
				<div className="necker">
					<div className="necker-box">
						<div className="intro"><span></span>店铺简介</div>
						<div className="clearboth thinner-border"></div>
						<div className="descrip">源自美国，手术后妇女节昵称开心农场开心农场看查看源自美国，手术后妇女节昵称开心农场开心农场看查看源自美国手术后妇女节昵称开心农场开心农场看查看源自美国，手术后妇女节昵称开心农场开心农场看查看</div>
						<div className="open-more">展开更多 ^</div>
						<div className="clearboth thinner-border"></div>
						<ProductList list={Array.apply(null,{length:5})} me={this} />
					</div>
				</div>
				<CommentList total={28} list={[{},{},{},{},{}]} />
            </div>
		)
	}
}
const ProductList = (props) => {
    const { list, me } = props
    return (
		<div className="video clearboth">
			<div className="title"><div>惠</div>商家优惠</div>
			<div className="vlist">
				<div className="ul-box">
					<ul style={{width:(list.length*fontSize*(200+30)/40)}}>
						{
							list.map((d,i)=>(
								<li key={i} onClick={me.openPage.bind(me, `abc${i===list.length-1?'':`/${i+1}`}`)}>
									<div className="icon poster" style={{backgroundImage:'url(http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg)'}}>
										<div className="sold">已售10</div>
									</div>
									<div className="text">焦糖玛奇朵</div>
									<div className="price">抢购 ¥18</div>
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