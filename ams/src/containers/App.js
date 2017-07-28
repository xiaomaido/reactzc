import React, { Component } from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Header from './Header'
import Footer from './Footer'
import Menus from './Menus'
import * as Pages from '../pages';
import '../styles/containers/app.scss'

import idashboard from '../images/icon/idashboard.png'
import iuser from '../images/icon/iuser.png'
import ibusy from '../images/icon/ibusy.png'

const pageMapRoute={
	users: {
		url:'/users',
		page:Pages.Users
	},
	products: {
		url:'/products',
		page:Pages.Products
	},
	brands: {
		url:'/brands',
		page:Pages.Brands
	},
	sellers: {
		url:'/sellers',
		page:Pages.Sellers
	}
}
const menusMapRoute=[
	{
		name: '工作概览',
	    url: '/',
	    icon: idashboard,
	    submenus:[]
	},{
		name: '电商运营',
	    url: '',
	    icon: iuser,
	    submenus:[
		    {
				name: '商家列表',
			    url: pageMapRoute.sellers.url,
		    },{
				name: '商品列表',
			    url: pageMapRoute.products.url,
		    },{
				name: '品牌列表',
			    url: pageMapRoute.brands.url,
		    },
	    ]
	},{
		name: '社区运营',
	    url: '',
	    icon: ibusy,
	    submenus:[
		    {
				name: '用户列表',
			    url: pageMapRoute.users.url,
		    }
	    ]
	}
]
window.menusMapRoute=menusMapRoute
class AppPanel extends Component{
	render(){
		const minHeight=(window.screen.height-200)+'px'
		const { children } = this.props //调用children就是加载子路由里面的组件
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
					<Menus ds={menusMapRoute} />
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
class App extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){

	}
	componentDidUpdate(){
		
	}
	render(){
		return ( 
			<Router history={browserHistory}>
			    <Route path="/" component={AppPanel} >
	            	<IndexRoute component={Pages.Dashboard} />
	            	{ Object.keys(pageMapRoute).map(d=><Route key={d} path={pageMapRoute[d]["url"]} component={pageMapRoute[d]["page"]} />) }
	          	</Route>
			</Router>
		)
	}
}
export default App
