import React, { Component } from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Header from './Header'
import * as Pages from '../pages';
import '../styles/containers/app.scss'
import idashboard from '../images/icon/idashboard.png'
import iuser from '../images/icon/iuser.png'

const pageMapRoute={
      '/users': Pages.Users
      ,'/products': Pages.Products
}
class AppPanel extends Component{
	render(){
		const { children } = this.props //调用children就是加载子路由里面的组件
		const minHeight=(window.screen.height-200)+'px'
		return (
			<div className="app">
				<Header />
				<div className="panel">
					<ul className="menus">
						<li>
							<div className="menu">
								<div className="icon" style={{ backgroundImage: 'url('+idashboard+')' }}></div>
								<div className="name">工作概览</div>
							</div>
						</li>
						<li>
							<div className="menu">
								<div className="icon" style={{ backgroundImage: 'url('+iuser+')' }}></div>
								<div className="name">用户管理</div>
							</div>
							<div className="submenus">
								<a href="">用户列表</a>
								<a href="">用户积分</a>
								<a href="">用户积分</a>
							</div>
						</li>
						<li>
							<div className="menu">
								<div className="icon" style={{ backgroundImage: 'url('+idashboard+')' }}></div>
								<div className="name">帖子管理</div>
							</div>
						</li>
					</ul>
					<div className="main" style={{minHeight:minHeight}}>
						{children}
					</div>
				</div>
				<div className="footer clearboth">五五海淘科技（股份）有限公司 © 版权所有</div>
			</div>
		)
	}
}
class App extends Component{
	constructor(props){
		super(props)
		this.handleChange=this.handleChange.bind(this)
		this.handleClear=this.handleClear.bind(this)
	}
	componentDidMount(){

	}
	componentDidUpdate(){
		
	}
	handleChange(nextKeyword){

	}
	handleClear(e){
    	e.preventDefault()
	}
	render(){
		return ( 
			<Router history={browserHistory}>
			    <Route path="/" component={AppPanel} >
	            	<IndexRoute component={Pages.Dashboard} />
	            	{ Object.keys(pageMapRoute).map(d=><Route key={d} path={d} component={pageMapRoute[d]} />) }
	          	</Route>
			</Router>
		)
	}
}
export default App
