import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/shophot.scss'
import comment from '../../images/quyou/icon/comment.png'
import collect from '../../images/quyou/icon/collect.png'
import good from '../../images/quyou/icon/good.png'
import addr from '../../images/quyou/icon/addr.png'
import banner from '../../images/quyou/banner/shophot.png'
export default class Index extends Quyou{
	render(){
        document.title='人气商家'
		return (
			<div className="shop-hot"> 
                <img className="banner" src={banner} />
                <div className="list">
                    <div className="item" onClick={this.openPage.bind(this,'/shophot/1')}>
                        <div className="icon cover"></div>
                        <div className="box">
                            <div className="name">宝岛蟹庄</div>
                            <div className="address"><i className="icon" style={{backgroundImage:'url('+addr+')'}}></i>城桥镇南门路37弄18号</div>
                            <ul className="shop-sns">
                                <li><i className="icon" style={{backgroundImage:'url('+good+')'}}></i>23</li>
                                <li><i className="icon" style={{backgroundImage:'url('+comment+')'}}></i>23</li>
                                <li><i className="icon" style={{backgroundImage:'url('+collect+')'}}></i>23</li>
                            </ul>
                        </div>
                        <div className="num">月售<span>688</span></div>
                    </div>
                    <div className="clearboth thinner-border"></div>
                    
                    <div className="item" onClick={this.openPage.bind(this,'/shophot/1')}>
                        <div className="icon cover"></div>
                        <div className="box">
                            <div className="name">宝岛蟹庄</div>
                            <div className="address"><i className="icon" style={{backgroundImage:'url('+addr+')'}}></i>城桥镇南门路37弄18号</div>
                            <ul className="shop-sns">
                                <li><i className="icon" style={{backgroundImage:'url('+good+')'}}></i>23</li>
                                <li><i className="icon" style={{backgroundImage:'url('+comment+')'}}></i>23</li>
                                <li><i className="icon" style={{backgroundImage:'url('+collect+')'}}></i>23</li>
                            </ul>
                        </div>
                        <div className="num">月售<span>688</span></div>
                    </div>
                    <div className="clearboth thinner-border"></div>
                </div>
            </div>
		)
	}
}