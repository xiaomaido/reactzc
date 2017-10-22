import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/yummyhot.scss'
import goodActive from '../../images/quyou/icon/good-active.png'
import good from '../../images/quyou/icon/good.png'
import comment from '../../images/quyou/icon/comment.png'
import play from '../../images/quyou/icon/play.png'

export default class Index extends Quyou{
    doGood(e){
        alert('点赞成功')
    }
	openDetail(e){
		// 点击跳转路由，打开商品详情页面
		this.context.router.push('/yummydetail')
	}
	render(){
        document.title='视频推荐'
		return (
			<div className="yummy-hot"> 
                <div className="list">
                    <div className="item">
                        <div className="avatar-name">
                            <i className="icon"></i>
                            <span>吃货小分队</span>
                        </div>
                        <div className="content" onClick={this.openDetail.bind(this)}>驴肉火烧简直是人间美味~~~</div>
                        <div className="icon cover" onClick={this.openDetail.bind(this)}><img src={play} /></div>
                        <div className="dos">
                            <div className="do" onClick={this.doGood.bind(this)}>
                                <i className="icon good" style={{backgroundImage:'url('+good+')'}}></i>
                                <span>1088</span>
                            </div>
                            <div className="thin-border-verical"></div>
                            <div className="do" onClick={this.openDetail.bind(this)}>
                                <i className="icon comment" style={{backgroundImage:'url('+comment+')'}}></i>
                                <span>2058</span>
                            </div>
                        </div>
                    </div>
                    <div className="clearboth"></div>
                    <div className="item">
                        <div className="avatar-name">
                            <i className="icon"></i>
                            <span>吃货小分队</span>
                        </div>
                        <div className="content">驴肉火烧简直是人间美味~~~</div>
                        <div className="icon cover" onClick={this.openDetail.bind(this)}><img src={play} /></div>
                        
                        <div className="dos">
                            <div className="do">
                                <i className="icon good" style={{backgroundImage:'url('+goodActive+')'}}></i>
                                <span className="active">1088</span>
                            </div>
                            <div className="thin-border-verical"></div>
                            <div className="do">
                                <i className="icon comment" style={{backgroundImage:'url('+comment+')'}}></i>
                                <span>2058</span>
                            </div>
                        </div>
                    </div>
                    <div className="clearboth"></div>
                </div>
            </div>
		)
	}
}
Index.contextTypes={
	router: React.PropTypes.object
}