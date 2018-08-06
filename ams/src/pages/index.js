// import IntlDemo from './IntlDemo'
// import VideoHot from './quyou/VideoHot'
// import VideoDetail from './quyou/VideoDetail'
// import PostHot from './quyou/PostHot'
// import PostDetail from './quyou/PostDetail'
// import SeasonHot from './quyou/SeasonHot'
// import _FoodHot from './quyou/FoodHot'
// import FoodDetail from './quyou/FoodDetail'
// import ShopHot from './quyou/ShopHot'
// import ShopDetail from './quyou/ShopDetail'
// import XianShiFuLi from './quyou/XianShiFuLi'
// import XianShiFuLiDetail from './quyou/XianShiFuLiDetail'
// import Eat from './quyou/Eat'
// import Hotel from './quyou/Hotel'
// import HotelHot from './quyou/HotelHot'
// import My from './quyou/My'
// import MyProfile from './quyou/MyProfile'
// import MyCouponDetail from './quyou/MyCouponDetail'
// import MyCoupons from './quyou/MyCoupons'
// import MyMsg from './quyou/MyMsg'
// import MyFollows from './quyou/MyFollows'
// import Mall from './quyou/Mall'
// import MallFuli from './quyou/MallFuli'
// import Trip from './quyou/Trip'
// import TripHot from './quyou/TripHot'
// import BusLine from './quyou/BusLine'
// import Guidance from './quyou/Guidance'
// import Guidance2 from './quyou/guidance/Guidance2'
// import GuidanceDetail from './quyou/GuidanceDetail'
// import Signin from './quyou/Signin'
// import CurrentRoutes from './quyou/CurrentRoutes'
// import Query from './quyou/Query'
// import PagerHot from './quyou/PagerHot'
// import Agricultual from './quyou/agricultural';
// import TencentLocation from './quyou/TencentLocation'

import Quyou from './quyou/Quyou';
import React from 'react';
import Loadable from 'react-loadable';
// import Loading from './Loading';
class Loading extends React.Component {
	render () {
		return null;
	}
}

const FoodHot = Loadable({
    loader: () => import('./quyou/FoodHot'),
    loading: Loading,
})

const IntlDemo = Loadable({
    loader: () => import('./IntlDemo'),
    loading: Loading,
})

const VideoHot = Loadable({
    loader: () => import('./quyou/VideoHot'),
    loading: Loading,
})

const VideoDetail = Loadable({
    loader: () => import('./quyou/VideoDetail'),
    loading: Loading,
})

const PostHot = Loadable({
    loader: () => import('./quyou/PostHot'),
    loading: Loading,
})


const PostDetail = Loadable({
    loader: () => import('./quyou/PostDetail'),
    loading: Loading,
})

const SeasonHot = Loadable({
    loader: () => import('./quyou/SeasonHot'),
    loading: Loading,
})


const FoodDetail = Loadable({
    loader: () => import('./quyou/FoodDetail'),
    loading: Loading,
})


const ShopHot = Loadable({
    loader: () => import('./quyou/ShopHot'),
    loading: Loading,
})


const ShopDetail = Loadable({
    loader: () => import('./quyou/ShopDetail'),
    loading: Loading,
})

const BuildingDetail = Loadable({
    loader: () => import('./quyou/BuildingDetail'),
    loading: Loading,
})


const XianShiFuLi = Loadable({
    loader: () => import('./quyou/XianShiFuLi'),
    loading: Loading,
})

const XianShiFuLiDetail = Loadable({
    loader: () => import('./quyou/XianShiFuLiDetail'),
    loading: Loading,
})

const Eat = Loadable({
    loader: () => import('./quyou/Eat'),
    loading: Loading,
})

const Hotel = Loadable({
    loader: () => import('./quyou/Hotel'),
    loading: Loading,
})

const HotelHot = Loadable({
    loader: () => import('./quyou/HotelHot'),
    loading: Loading,
})

const My = Loadable({
    loader: () => import('./quyou/My'),
    loading: Loading,
})

const MyProfile = Loadable({
    loader: () => import('./quyou/MyProfile'),
    loading: Loading,
})

const MyCouponDetail = Loadable({
    loader: () => import('./quyou/MyCouponDetail'),
    loading: Loading,
})

const MyCoupons = Loadable({
    loader: () => import('./quyou/MyCoupons'),
    loading: Loading,
})

const MyMsg = Loadable({
    loader: () => import('./quyou/MyMsg'),
    loading: Loading,
})

const MyFollows = Loadable({
    loader: () => import('./quyou/MyFollows'),
    loading: Loading,
})

const Mall = Loadable({
    loader: () => import('./quyou/Mall'),
    loading: Loading,
})

const MallFuli = Loadable({
    loader: () => import('./quyou/MallFuli'),
    loading: Loading,
})

const Trip = Loadable({
    loader: () => import('./quyou/Trip'),
    loading: Loading,
})

const TripHot = Loadable({
    loader: () => import('./quyou/TripHot'),
    loading: Loading,
})

const BuildingHot = Loadable({
    loader: () => import('./quyou/BuildingHot'),
    loading: Loading,
})


const Guidance = Loadable({
    loader: () => import('./quyou/Guidance'),
    loading: Loading,
})

const Guidance2 = Loadable({
    loader: () => import('./quyou/guidance/Guidance2'),
    loading: Loading,
})

const GuidanceDetail = Loadable({
    loader: () => import('./quyou/GuidanceDetail'),
    loading: Loading,
})

const Signin = Loadable({
    loader: () => import('./quyou/Signin'),
    loading: Loading,
})

const CurrentRoutes = Loadable({
    loader: () => import('./quyou/CurrentRoutes'),
    loading: Loading,
})

const Query = Loadable({
    loader: () => import('./quyou/Query'),
    loading: Loading,
})

const PagerHot = Loadable({
    loader: () => import('./quyou/PagerHot'),
    loading: Loading,
})

const Agricultual = Loadable({
    loader: () => import('./quyou/agricultural'),
    loading: Loading,
})

export { 
	IntlDemo,
	VideoHot,
	VideoDetail,
	PostHot,
	PostDetail,
	SeasonHot,
	FoodHot,
	FoodDetail,
	ShopHot,
	ShopDetail,
	XianShiFuLi,
	XianShiFuLiDetail,
	Eat,
	Hotel,
	HotelHot,
	My,
	MyProfile,
	MyCouponDetail,
	MyCoupons,
	MyMsg,
	MyFollows,
	Trip,
    TripHot,
    BuildingHot,
    BuildingDetail,
	Guidance,
	Guidance2,
	GuidanceDetail,
	// BusLine,
	Mall,
	Signin,
	CurrentRoutes,
	MallFuli,
	Query,
    PagerHot,
    Agricultual,
	// TencentLocation,
}