import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Menus from './Menus'
import { connect } from 'react-redux'

class AppPanel extends Component{
	render(){
		debugger
		const minHeight=(window.innerHeight-90)+'px'
		const { children,location } = this.props //调用children就是加载子路由里面的组件
		return (
			<div className="app">
				<Header />
				<div className="panel">
					<Menus ds={menusMapRoute} location={location} />
					<div className="main" style={{minHeight:minHeight}}>
					{  children } 
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
	return {
	    keyword: state.routing.locationBeforeTransitions.pathname.substring(1)
	}
}
export default connect(mapStateToProps)(AppPanel)
// export default AppPanel
