import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/shophot.scss'
import goodActive from '../../images/quyou/icon/good-active.png'
import good from '../../images/quyou/icon/good.png'
import addr from '../../images/quyou/icon/addr.png'
import banner from '../../images/quyou/banner/shophot.png'
export default class Index extends Quyou{
	openDetail(e){
		// 点击跳转路由，打开商品详情页面
		this.context.router.push('/shopdetail')
	}
	render(){
        document.title='人气商家'
		return (
			<div className="shop-hot"> 
                <img className="banner" src={banner} />
                <div className="list">
                    <div className="item" onClick={this.openDetail.bind(this)}>
                        <div className="icon cover"></div>
                        <div className="box">
                            <div className="name">宝岛蟹庄</div>
                            <div className="address"><i className="icon" style={{backgroundImage:'url('+addr+')'}}></i>城桥镇南门路37弄18号</div>
                        </div>
                        <div className="num">月售<span>688</span></div>
                    </div>
                    <div className="clearboth thinner-border"></div>
                    <div className="item">
                        <div className="icon cover"></div>
                    </div>
                    <div className="clearboth thinner-border"></div>
                </div>
            </div>
		)
	}
}
Index.contextTypes={
	router: React.PropTypes.object
}