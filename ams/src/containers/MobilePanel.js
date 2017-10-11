import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/quyou/mobilepanel.scss'
class MobilePanel extends Component{
	render(){
		const { children } = this.props //调用children就是加载子路由里面的组件
		return (
			<div className="mobile-panel">
				{ children } 
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
	return {
	    keyword: state.routing.locationBeforeTransitions.pathname.substring(1) 
	}
}
export default connect(mapStateToProps)(MobilePanel)
