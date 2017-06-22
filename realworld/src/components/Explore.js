import React, { Component } from 'react'
import '../styles/explore.scss'

export default class Explore extends Component{
	constructor(props){
		super(props)
		this.handleClick=this.handleClick.bind(this)
		this.handleKeyUp=this.handleKeyUp.bind(this)
	}
	render(){
		return (
			<div className="inputButton">
				<input ref="keyword_input" onKeyUp={this.handleKeyUp} defaultValue={this.props.keyword} />
				<div className="button" onClick={this.handleClick} >搜索</div>
			</div>
		)
	}
  	componentWillReceiveProps(nextProps) {
		if(nextProps.keyword!==this.props.keyword){
			this.setInputValue(nextProps.keyword)
		}	
	}
	handleChange(){
		this.props.handleChange(this.getInputValue())
	}
	handleClick(e){
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