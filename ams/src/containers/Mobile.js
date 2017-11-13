
import React, { Component } from 'react'
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'

import MobilePanel from './MobilePanel'
import * as Pages from '../pages';

// 页面路由配置
window.pageMapRoute={
	// tencentlocation: {
	// 	url:'/tencentlocation',
	// 	page:Pages.TencentLocation
	// },
	currentroutes: {
		url:'/currentroutes',
		page:Pages.CurrentRoutes
	},
	intldemo: {
		url:'/intldemo',
		page:Pages.IntlDemo
	},
	my: {
		url:'/my',
		page:Pages.My
	},
	mall: {
		url:'/mall',
		page:Pages.Mall
	},
	eat: {
		url:'/eat',
		page:Pages.Eat
	},
	trip: {
		url:'/trip',
		page:Pages.Trip
	},
	hotel: {
		url:'/hotel',
		page:Pages.Hotel
	},
	xianshifulidetail: {
		url:'/xianshifuli/:id',
		page:Pages.XianShiFuLiDetail
	},
	xianshifuli: {
		url:'/xianshifuli',
		page:Pages.XianShiFuLi
	},
	shopdetail: {
		url:'/shophot/:id',
		page:Pages.ShopDetail
	},
	shophot: {
		url:'/shophot',
		page:Pages.ShopHot
	},
	fooddetail: {
		url:'/foodhot/:id',
		page:Pages.FoodDetail
	},
	foodhot: {
		url:'/foodhot',
		page:Pages.FoodHot
	},
	seasonhot: {
		url:'/seasonhot',
		page:Pages.SeasonHot
	},
	yummydetail: {
		url:'/yummyhot/:id',
		page:Pages.YummyDetail
	},
	yummyhot: {
		url:'/yummyhot',
		page:Pages.YummyHot
	},
	videodetail: {
		url:'/videohot/:id',
		page:Pages.VideoDetail
	},
	videohot: {
		url:'/videohot',
		page:Pages.VideoHot
	},
}

const history=hashHistory
// const history=syncHistoryWithStore(hashHistory, window.store)

const routes = (
	<Route path="/" component={MobilePanel} >
		<IndexRoute component={Pages.Eat} />
		{ Object.keys(pageMapRoute).map(d=><Route key={d} path={pageMapRoute[d]["url"]} component={pageMapRoute[d]["page"]} />) }
	</Route>
)
class Mobile extends Component{
	render(){
		return <Router history={history} routes={routes} />
	}
}
export default Mobile
