import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import Menus from './Menus'

class AppPanel extends Component{
	render(){
		const minHeight=(window.innerHeight-90)+'px'
		const { children,location } = this.props //调用children就是加载子路由里面的组件
		// { children } 可以直接这么用
		// 也可以用 React.cloneElement(ReactElement,Props,ChildrenReactElement)
		// React.cloneElement(children,{
  //           key: this.props.location.pathname,
  //           b:2
  //       }, <a href="#">Github</a>)
		return (
			<div className="app">
				<Header />
				<div className="panel">
					<Menus ds={menusMapRoute} location={location} />
					<div className="main" style={{minHeight:minHeight}}>
					{ 
						children
					} 
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}
export default AppPanel