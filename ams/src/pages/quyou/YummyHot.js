import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/yummyhot.scss'
import goodActive from '../../images/quyou/icon/good-active.png'
import good from '../../images/quyou/icon/good.png'
import comment from '../../images/quyou/icon/comment.png'

export default class YummyHot extends Quyou{
	render(){
        document.title='美食攻略'
		return (
			<div className="yummy-hot"> 
                <div className="list">
                    <div className="item">
                        <div className="avatar-name">
                            <i className="icon"></i>
                            <span>吃货小分队</span>
                        </div>
                        <div className="content">驴肉火烧简直是人间美味~~~</div>
                        <div className="icon cover"></div>
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
                    <div className="item">
                        <div className="avatar-name">
                            <i className="icon"></i>
                            <span>吃货小分队</span>
                        </div>
                        <div className="content">驴肉火烧简直是人间美味~~~</div>
                        <div className="icon cover"></div>
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