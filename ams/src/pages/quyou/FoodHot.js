import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/foodhot.scss'
import banner from '../../images/quyou/banner/foodhot.png'
import good from '../../images/quyou/icon/good.png'
import goodActive from '../../images/quyou/icon/good-active.png'
import star from '../../images/quyou/icon/star.png'
import StarsShow from '../../components/StarsShow/'
export default class FoodHot extends Quyou{
	render(){
        document.title='人气美食'
		return (
			<div className="food-hot"> 
                <img className="banner" src={banner} />
                <div className="list">
                    <div className="item">
                        <div className="icon cover"></div>
                        <div className="box">
                            <div className="name">老西门</div>
                            <div className="stars-permoney">
                                <StarsShow star={star} number={3.8} />
                                <div className="permoney">¥20/人</div>
                            </div>
                            <ul className="tags">
                                <li>本帮菜</li>
                                <li>回头客多</li>
                            </ul>
                            <ul className="discount">
                                <li>全场9折</li>
                                <li>满20减3</li>
                            </ul>
                        </div>
                        <div className="good">
                            <i className="icon" style={{backgroundImage:'url('+good+')'}}></i>
                            <div>587</div>
                        </div>
                    </div>
                    <div className="clearboth thinner-border"></div>
                    <div className="item">
                        <div className="icon cover"></div>
                        <div className="box">
                            <div className="name">老西门</div>
                            <div className="stars-permoney">
                                <StarsShow star={star} number={5} />
                                <div className="permoney">¥10/人</div>
                            </div>
                            <ul className="tags">
                                <li>本帮菜</li>
                                <li>回头客多</li>
                            </ul>
                            <ul className="discount">
                                <li>全场9折</li>
                                <li>满20减3</li>
                            </ul>
                        </div>
                        <div className="good">
                            <i className="icon" style={{backgroundImage:'url('+goodActive+')'}}></i>
                            <div>187</div>
                        </div>
                    </div>
                    <div className="clearboth thinner-border"></div>
                </div>
            </div>
		)
	}
}