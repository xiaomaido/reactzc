import React, { Component } from 'react'
import '../styles/explore.scss'

export default class Explore extends Component{
	constructor(props){
		super(props)
		window.touchstart=0
		window.touchend=0
		window.click=0
		this.handleClickBtn=this.handleClickBtn.bind(this)
		this.handleKeyUp=this.handleKeyUp.bind(this)
	}
	render(){
		return (
			<div className="inputButton">
				<input ref="keyword_input" onKeyUp={this.handleKeyUp} defaultValue={this.props.keyword} />
				<div className="button" onClick={this.handleClickBtn}>搜索</div>
			</div>
		)
		// <div><br/></div>
		// 		<div><br/></div>
		// 		<div className="button" onTouchStart={this.handleTouchStart}>touchstart</div>
		// 		<div className="button" onTouchStart={this.handleTouchEnd}>touchend</div>
		// 		<div className="button" onClick={this.handleClick} onC>click</div>
	}
  	componentWillReceiveProps(nextProps) {
		if(nextProps.keyword!==this.props.keyword){
			this.setInputValue(nextProps.keyword)
		}	
	}
	handleChange(){
		this.props.handleChange(this.getInputValue())
	}
	handleTouchStart(){
		window.touchstart=Date.now()
	}
	handleTouchEnd(e){
		e.preventDefault()
		window.touchend=Date.now()
		this.setInputValue(window.touchend-window.touchstart)
	}
	handleClick(e){
		e.preventDefault()
		window.click=Date.now()
		this.setInputValue(window.click-window.touchend)
	}
	handleClickBtn(e){
		e.preventDefault()
		this.handleChange()
	}
	handleKeyUp(e){
    	e.preventDefault()
		if(e.keyCode===13){
			this.handleChange()
		}
	}
	getInputValue(){
		return this.refs.keyword_input.value
	}
	setInputValue(value){
		this.refs.keyword_input.value=value
	}
}