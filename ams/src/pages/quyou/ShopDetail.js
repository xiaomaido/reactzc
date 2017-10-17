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
						<i className="icon phone" style={{backgroundImage:'url('+phone+')'}}></i>
						<div className="name">乐凯普面包烘焙</div>
						<div className="address"><i className="icon" style={{backgroundImage:'url('+addr+')'}}></i>城桥镇南门路37弄18号</div>
					</div>
				</div>
				<div className="gap"></div>
				<div className="necker">
					<div className="necker-box">
						<div className="intro"><span></span>店铺简介</div>
					</div>
				</div>
            </div>
		)
	}
}