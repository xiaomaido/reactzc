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
const VideoList = (props) => {
    const { list, me } = props
    return (
        <div className="video clearboth">
            <div className="title-box">
                <div className="line thinner-border clearboth"></div>
                <div className="title">视频推荐</div>
            </div>
            <div className="vlist">
                <div className="ul-box">
                    <ul style={{width:(list.length*fontSize*(240+30)/40)}}>
                        {
                            list.map((d,i)=>(
                                <li key={i} onClick={me.openPage.bind(me,`videohot/${i}`)}>
                                    <div className="icon poster" style={{backgroundImage:'url(http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg)'}}>
                                        {
                                            i===list.length-1 ? <div className="more">更多视频 &gt;</div> : <img src={play} />
                                        }
                                    </div>
                                    <div className="text">崇明特色美食</div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
        
    )
}
export default class Eat extends Quyou{
	render(){
        document.title='趣游崇明'
		return (
			<div className="eat">
                <div className="top">
                    <TouchSlideBox imgSlideList={imgSlideList} />
                    <img className="bar" src={bar} />
                    <ul className="quick">
                        <li onClick={this.openPage.bind(this,  `/shophot`)}>
                            <img src={quick0} style={{float:'left'}} />
                            <div style={{textAlign:'left'}}>人气商家</div>
                        </li>
                        <li onClick={this.openPage.bind(this,  `/foodhot`)}>
                            <img src={quick1} />
                            <div>人气美食</div>
                        </li>
                        <li onClick={this.openPage.bind(this,  `/seasonhot`)}>
                            <img src={quick2} style={{float:'right'}} />
                            <div style={{textAlign:'right'}}>当季推荐</div>
                        </li>
                    </ul>
                </div>
                <div className="yummy clearboth">
                    <div className="icon picture"></div>
                    <div className="icon logo"></div>
                    <div className="content">崇明岛两天三夜游，我的朋友的觅食之旅，良心推荐之旅。。。</div>
                </div>
                <VideoList list={Array.apply(null,{length:8})} me={this} />
                <div style={{height: 100,background:'#fff'}}></div>
            </div>
		)
	}
} 