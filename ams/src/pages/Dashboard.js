import React, { Component } from 'react'
import { Base } from './Base'

class Dashboard extends Base{
	constructor(props){
		super(props)
		this.state={d:0}
	}
	render(){
		return this.state.d<2?(
			<div style={{'padding':10}}>
				<div>Dashboard {this.state.d}</div>
				<div onClick={this.handleClick.bind(this)}>Click Me</div>
			</div>
		):(<span>12</span>)
	}
	componentWillUnmount(){
	}
	handleClick(e){
		this.setState({
			d:this.state.d+1
		})
	}
}
export default Dashboard
