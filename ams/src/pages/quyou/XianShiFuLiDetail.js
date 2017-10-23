import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/xianshifulidetail.scss'
import addr from '../../images/quyou/icon/addr.png'
import shop from '../../images/quyou/icon/shop.png'
export default class Index extends Quyou{
	render(){
        document.title='限时福利'
        const { id } = this.props.params
        // {id: "134"}
		return (
			<div className="xian-shi-fu-li-detail">
                <div className="fixed-footer">
                    <div className="left">
                        <div className="clearboth thinner-border"></div>
                        <div className="price">￥24.9<span>￥36.9</span></div>
                    </div>
                    <div className="right">抢购</div>
                </div>
                <div className="publish">
                    <div className="title">抢购须知</div>
                    <div className="clearboth thinner-border"></div>
                    <div className="discount">买一送一</div>
                    
                </div>                
            </div>
		)
	}
}