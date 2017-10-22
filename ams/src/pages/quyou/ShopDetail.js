import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/shopdetail.scss'
import phone from '../../images/quyou/icon/phone.png'
import addr from '../../images/quyou/icon/addr.png'
export default class ShopDetail extends Quyou{
	render(){
        document.title='商家信息'
		return (
			<div className="shop-detail">
				<div className="header">
					<div className="header-box">
						<div className="thin-border-verical-box">
							<div className="thin-border-verical"></div>
						</div>
						<a href="tel:13248238215" className="icon phone" style={{backgroundImage:'url('+phone+')'}}></a>
						<div className="name">【乐凯普面包烘焙】</div>
						<div className="address"><i className="icon" style={{backgroundImage:'url('+addr+')'}}></i>城桥镇南门路37弄18号</div>
						<div className="icon cover"></div>
					</div>
				</div>
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
            </div>
		)
	}
}