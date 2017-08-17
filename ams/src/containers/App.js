import React, { Component } from 'react'
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../store'



import AppPanel from './AppPanel'
import * as Pages from '../pages';
import '../styles/containers/app.scss'

import idashboard from '../images/icon/idashboard.png'
import iuser from '../images/icon/iuser.png'
import ibusy from '../images/icon/ibusy.png'

window.store=configureStore()
window.unsubscribe=store.subscribe(() =>
  console.log(store.getState())
)
// 页面路由配置
window.pageMapRoute={
	users: {
		url:'/users',
		page:Pages.Users
	},
	products: {
		url:'/products',
		page:Pages.Products
	},
	product: {
		url:'/product',
		page:Pages.Product
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
// 左侧菜单栏配置
window.menusMapRoute=[
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

const history=syncHistoryWithStore(hashHistory, window.store);

const routes = (
	<Route path="/" component={AppPanel} >
		<IndexRoute component={Pages.Dashboard} />
		{ Object.keys(pageMapRoute).map(d=><Route key={d} path={pageMapRoute[d]["url"]} component={pageMapRoute[d]["page"]} />) }
	</Route>
)
class App extends Component{
	constructor(props){
		super(props)
	}
	render(){
		// <Router history={browserHistory}>
		// <Router history={hashHistory}>
		return <Router history={history} routes={routes} />
		
		// return ( 
		// 	<Router history={hashHistory}>
		// 	    <Route path="/" component={AppPanel} >
	 //            	<IndexRoute component={Pages.Dashboard} />
	 //            	{ Object.keys(pageMapRoute).map(d=><Route key={d} path={pageMapRoute[d]["url"]} component={pageMapRoute[d]["page"]} />) }
	 //          	</Route>
		// 	</Router>
		// )
	}
}
export default App
