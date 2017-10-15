import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/eat.scss'
import bar from '../../images/quyou/banner/bar.png'
import banner1 from '../../images/quyou/banner/banner1.png'
import play from '../../images/quyou/icon/play.png'
import quick0 from '../../images/quyou/icon/quick0.png'
import quick1 from '../../images/quyou/icon/quick1.png'
import quick2 from '../../images/quyou/icon/quick2.png'
import TouchSlideBox from '../../components/TouchSlideBox/'
const imgSlideList=[banner1,banner1]
class SeasonHot extends Quyou{
	render(){
        document.title='趣游崇明'
		return (
			<div className="eat">
                <div className="top">
                    <TouchSlideBox imgSlideList={imgSlideList} />
                    <img className="bar" src={bar} />
                    <ul className="quick">
                        <li>
                            <img src={quick0} style={{float:'left'}} />
                            <div style={{textAlign:'left'}}>人气商家</div>
                        </li>
                        <li>
                            <img src={quick1} />
                            <div>人气商家</div>
                        </li>
                        <li>
                            <img src={quick2} style={{float:'right'}} />
                            <div style={{textAlign:'right'}}>人气商家</div>
                        </li>
                    </ul>
                </div>
                <div className="yummy clearboth">
                    <div className="icon picture"></div>
                    <div className="icon logo"></div>
                    <div className="content">崇明岛两天三夜游，我的朋友的觅食之旅，良心推荐之旅。。。</div>
                </div>
                <div className="video clearboth">
                    <div className="title-box">
                        <div className="line thinner-border clearboth"></div>
                        <div className="title">视频推荐</div>
                    </div>
                    <div className="vlist">
                        <div className="ul-box">
                            <ul style={{width:(4*fontSize*(240+30)/40)}}>
                                <li>
                                    <div className="icon poster"><img src={play} /></div>
                                    <div className="text">崇明特色美食</div>
                                </li>
                                <li>
                                    <div className="icon poster"><img src={play} /></div>
                                    <div className="text">崇明特色美食</div>
                                </li>
                                <li>
                                    <div className="icon poster"><img src={play} /></div>
                                    <div className="text">崇明特色美食</div>
                                </li>
                                <li>
                                    <div className="icon poster"><img src={play} /></div>
                                    <div className="text">崇明特色美食</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div style={{height: 100,background:'#fff'}}></div>
            </div>
		)
	}
}
export default SeasonHot