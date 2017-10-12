import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/yummyhot.scss'
class YummyHot extends Quyou{
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
                            <div className="do">1</div>
                            <div className="do">
                                <i className="icon"></i>
                                <span>2</span>
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
                    </div>
                    <div className="clearboth"></div>
                </div>
            </div>
		)
	}
}
export default YummyHot