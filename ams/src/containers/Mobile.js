
import React, { Component } from 'react'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
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
	signin: {
		url:'/signin',
		page:Pages.Signin
	},
	intldemo: {
		url:'/intldemo',
		page:Pages.IntlDemo
	},
	my: {
		url:'/my',
		page:Pages.My
	},
	myprofile: {
		url:'/myprofile',
		page:Pages.MyProfile
	},
	mall: {
		url:'/mall',
		page:Pages.Mall
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
		// url:'/fooddetail',
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
// window.isHashHistory=''
window.isHashHistory='#'
const history= window.isHashHistory ?  hashHistory : browserHistory
// let prevLocation = {};
// // history.listen(location => {
// history.listenBefore(location => {
//   const pathChanged = prevLocation.pathname !== location.pathname;
//   const hashChanged = prevLocation.hash !== location.hash;
//   debugger
//   if (pathChanged || hashChanged) window.scrollTo(0, 0);
//   prevLocation = location;
// });
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
