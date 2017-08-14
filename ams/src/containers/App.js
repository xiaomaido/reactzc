import React, { Component } from 'react'
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'
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
	},
	contextmenureact: {
		url:'/contextmenureact',
		page:Pages.ContextMenuReact
	},
	draggablereact: {
		url:'/draggablereact',
		page:Pages.DraggableReact
	},
	selectrc: {
		url:'/selectrc',
		page:Pages.SelectRC
	},
	taskapp: {
		url:'/taskapp',
		page:Pages.TaskApp
	},
	superagent:{
		url:'/superagent',
		page:Pages.SuperAgent
	},
	fetchapi:{
		url:'/fetchapi',
		page:Pages.FetchAPI
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
		    },{
				name: '用户列表',
			    url: pageMapRoute.users.url,
		    }
	    ]
	},{
		name: '其他插件',
	    url: '',
	    icon: ibusy,
	    submenus:[
		    {
				name: '右键菜单',
			    url: pageMapRoute.contextmenureact.url,
		    },{
				name: '拖拽示例',
			    url: pageMapRoute.draggablereact.url,
		    },{
				name: '下拉选择',
			    url: pageMapRoute.selectrc.url,
		    },{
				name: 'SuperAgent',
			    url: pageMapRoute.superagent.url,
		    },{
				name: 'FetchAPI',
			    url: pageMapRoute.fetchapi.url,
		    }
	    ]
	},{
		name: '项目示例',
	    url: '',
	    icon: ibusy,
	    submenus:[
		    {
				name: '待办事项',
			    url: pageMapRoute.taskapp.url,
		    }
	    ]
	}
]
window.menusMapRoute=menusMapRoute
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
class App extends Component{
	constructor(props){
		super(props)
	}
	render(){
			// <Router history={browserHistory}>
		return ( 
			<Router history={hashHistory}>
			    <Route path="/" component={AppPanel} >
	            	<IndexRoute component={Pages.Dashboard} />
	            	{ Object.keys(pageMapRoute).map(d=><Route key={d} path={pageMapRoute[d]["url"]} component={pageMapRoute[d]["page"]} />) }
	          	</Route>
			</Router>
		)
	}
}
export default App
