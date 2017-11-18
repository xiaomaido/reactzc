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
					</div>
				</div>
				<CommentList total={28} list={[{},{},{},{},{}]} />
            </div>
		)
	}
}