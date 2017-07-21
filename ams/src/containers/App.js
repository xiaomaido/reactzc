import React, { Component } from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import '../styles/components/app.scss'
import Dashboard from '../pages/Dashboard'
import * as Pages from '../pages';
console.log(Pages)
// const pageMapRoute={
//       '/users': Pages.Users
//       ,'/products/:id': Pages.Products
// }
class AppPanel extends Component{
	render(){
		const { children } = this.props //调用children就是加载子路由里面的组件
		return (
			<div className="app">
				<div className="title">App Panel</div>
				{children}
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
                	<IndexRoute component={Dashboard} />
                	<Route path="/users" component={Pages.Users} />
                	<Route path="/products/:id" component={Pages.Products} />
              	</Route>
			</Router>
		)
	}
}
export default App
