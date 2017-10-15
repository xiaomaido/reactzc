import React, { Component } from 'react'
import TouchSlide from '../../vendors/touchslide'
import './index.css'
export default class TouchSlideBox extends Component{
	constructor(props){
		super(props)
	}
	render(){
		const { imgSlideList } = this.props
		return (
			<div id="TouchSlideBox" className="slideBox">
			    <div className="bd">
			        <ul>
                   		{ 
                   			imgSlideList.map((d,i)=>
                   				(
        							<li key={i}><div className="icon sample" style={{ backgroundImage: 'url(' + d + ')' }}></div></li>
                   				)
                   			)
                   		}
			        </ul>
			    </div>
			    <div className="hd">
			        <ul style={{display: imgSlideList.length>1?'block':'none'}}></ul>
			    </div>
			</div>
		)
	}
	componentDidMount(){
		const { imgSlideList } = this.props
		this.touchSlide=imgSlideList.length>1?this.configTouchSlide():null
	}
	configTouchSlide(){
		return typeof TouchSlide==="function"?TouchSlide({ 
            slideCell: "#TouchSlideBox",
            titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
            mainCell:".bd ul", 
            effect:"leftLoop", 
            autoPage: true, //自动分页
            autoPlay: false, //自动播放
            delayTime: 100,
            interTime: 6000,
        }):null
	}

}
