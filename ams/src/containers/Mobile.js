
import React, { Component } from 'react'
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../store'

import MobilePanel from './MobilePanel'
import * as Pages from '../pages';

window.store=configureStore()
window.unsubscribe=store.subscribe(() =>
  console.log(store.getState())
)
// 页面路由配置
window.pageMapRoute={
	seasonhot: {
		url:'/seasonhot',
		page:Pages.SeasonHot
	},
	products: {
		url:'/products',
		page:Pages.Products
	},
	product: {
		url:'/product',
		page:Pages.Product
	},
}

const history=syncHistoryWithStore(hashHistory, window.store)

const routes = (
	<Route path="/" component={MobilePanel} >
		<IndexRoute component={Pages.Dashboard} />
		{ Object.keys(pageMapRoute).map(d=><Route key={d} path={pageMapRoute[d]["url"]} component={pageMapRoute[d]["page"]} />) }
	</Route>
)
class Mobile extends Component{
	render(){
		return <Router history={history} routes={routes} />
	}
}
export default Mobile
