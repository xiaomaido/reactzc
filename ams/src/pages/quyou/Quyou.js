import fetch from 'isomorphic-fetch'
import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import Mask from '../../components/Mask/'
import TouchSlideBox from '../../components/TouchSlideBox/'
import CreateComment from '../../components/CreateComment/'
import NoMoreData from '../../components/NoMoreData/'
// import Sign from '../../components/Sign/'
import Spin from '../../components/Spin/'
import SelectBox from '../../components/SelectBox/'
import FilterBox from '../../components/FilterBox/'
import StarsShow from '../../components/StarsShow/'
import avatar_url from '../../images/quyou/icon/avatar.png'
import go from '../../images/quyou/go.png'
import play from '../../images/quyou/icon/play.png'
import { setTimeout } from 'timers';
window.go=go
window.avatar_url=avatar_url
window.play=play
window.server=`http://quyou.weichongming.com`
window.wxconfig={}
window.jsApiList=['onMenuShareAppMessage','onMenuShareTimeline','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
window.buildingIds = {
    202: true,
    203: true,
    204: true,
    205: true,
    206: true,
    207: true,
    208: true,
    209: true,
    210: true,
    211: true,
    212: true,
    213: true,
    214: true,
}
export class Quyou extends React.Component{ // 公共模板
    initTextOkay='发布'
    user=JSON.parse(misc.getCookie('user'))||{ token: ''}
    limit=10
    page=0
    api={
        host:`${server}/peanut`,
        // host:`http://quyou.weichongming.com/peanut`,
    }
    hotelTags = [
        {
            title:'精品酒店',
            name: 'jingpinjiudian',
            id:12,
        },
        {
            title:'特色民宿',
            name: 'teseminsu',
            id:4,
        },
        {
            title:'生态农庄',
            name: 'shengtainongzhuang',
            id:3,
        },
        {
            title:'经济适用',
            name: 'jingjishiyong',
            id:9,
        },
        {
            title:'人气推荐',
            name: 'renqituijian',
            id:10,
        },
        {
            title:'特惠折扣',
            name: 'tehuizhekou',
            id:11,
        },
    ]
    filterids=[
        {
            title:'全部区域',
            id:0, 
        },
        {
            title:'城桥镇',
            id:1, 
        }, 
        {
            title:'陈家镇',
            id:2, 
        }, 
        {
            title:'建设镇',
            id:3, 
        }, 
        {
            title:'绿华镇',
            id:4, 
        }, 
        {
            title:'三星镇',
            id:5, 
        },
        {
            title:'庙镇',
            id:6, 
        }, 
        {
            title:'港西镇',
            id:7, 
        }, 
        {
            title:'竖新镇',
            id:8, 
        }, 
        {
            title:'港沿镇',
            id:9, 
        }, 
        {
            title:'中兴镇',
            id:10, 
        }, 
        {
            title:'向化镇',
            id:11, 
        }, 
        {
            title:'东平镇',
            id:12, 
        }, 
        {
            title:'堡镇',
            id:13, 
        }, 
        {
            title:'新海镇',
            id:14, 
        }, 
        {
            title:'新河镇',
            id:15, 
        }, 
        {
            title:'长兴镇',
            id:16, 
        }, 
        {
            title:'新村乡',
            id:17, 
        }, 
        {
            title:'横沙乡',
            id:18, 
        }, 
    ]
    centToYuan(cent){
        return cent/100
    }
    shareTextObj={}
    shareTextObjSetting({title,imgUrl,desc}){
        const me=this
        const { pathname, search, key } = me.props.location
        me.shareTextObj={
            link: window.location.href, // 分享URL
            // link: (server + '/#' + pathname + (search ? `${search}&_k=${key}` : `?_k=${key}`)), // 分享URL
            title, // 分享标题
            imgUrl, // 分享图标
            desc, // 分享描述
        }
        // console.log('shareTextObj',me.shareTextObj)
        me.weixinSDK()
    }
    requestListOrCacheData({FETCH_PAGE,API_PAGE}){
        const me = this 
        const CACHE_DATA = sessionStorage ? JSON.parse(sessionStorage.getItem(FETCH_PAGE)) : null
        if (CACHE_DATA) {
            me.setState({
                [FETCH_PAGE]: CACHE_DATA.response
            }, () => {
                sessionStorage.removeItem(FETCH_PAGE)
                window.scrollTo(0, CACHE_DATA.scrollTop) // 回到之前离开的位置
                me.page = CACHE_DATA.page
                me.scrollLoadMore(me,FETCH_PAGE,API_PAGE,false)
            })
        } else {
            me.requestList(me,FETCH_PAGE,API_PAGE,true)
        }
    }
    weixinSDK(){
        const me=this
		// console.log('wx',wx)
		wx.ready(function(){
			wx.checkJsApi({
				jsApiList,
				success: function(res) {
                    console.log(res)
					if(res&&res.checkResult){
						for(var i in res.checkResult){
							if(res.checkResult[i]){
								wx[i](me.shareTextObj)
							}
						}
					}
				}
			})
		}) 
		wx.error(function(err){
			console.log('err',err)
		})
	}
	componentWillMount(){
        const { API_MY_GET_JSSIGN } = APIS
        const me=this
        const { pathname, search, key } = me.props.location
        me.requestAPI(API_MY_GET_JSSIGN,{
            // url: encodeURIComponent(server + '/#' + pathname + (search ? `${search}&_k=${key}` : `?_k=${key}`)), // 分享URL
            url: encodeURIComponent(window.location.href), // 分享URL
        },(res)=>{
            wxconfig={
                jsApiList,
                appId:'wxee431201802aecab',
                debug:false,
                timestamp:res.data["timestamp"],
                signature:res.data["signature"],
                nonceStr:res.data["noncestr"],
            }
			wx.config(wxconfig)
            // console.log('wxconfig',wxconfig)
        })
        me.shareTextObjSetting=me.shareTextObjSetting.bind(this)
        me.weixinSDK=me.weixinSDK.bind(this)
        me.user.token=encodeURIComponent(me.user.token)
        window.onscroll=null
        window.ontouchstart=null
        window.ontouchend=null
        delete window['touchstartY']
        delete window['touchendY']
        window._location=me.props.location
		// window.scrollTo(0, 0)
    }
	openPage(url,e){ // 打开页面
		this.context.router.push(url)
    }
    getRequestParam(data){
        return Object.keys(data).reduce((arr,k)=>{
            arr.push(`&${k}=${data[k]}`)
            return arr
        },[]).join('').replace('&','?') 
    }
    requestAPI=(url,data,succ=(res)=>{console.log(res)},fail=(err)=>{console.log(err)},method='GET')=>{
        const me = this
        if(!me.user.token){
            if(~url.indexOf('Like') || ~url.indexOf('Comment') || ~url.indexOf('follow') || (~url.indexOf('coupon') && url !== '/user/coupon_detail')){
                me.openPage('/signin')
                return
            }
        }      
        url = ~url.indexOf(this.api.host) ? url : this.api.host + url
        // console.log('fetch data', data)
        url = data && method==='GET' ? url + me.getRequestParam(data) : url
        const options= method==='POST' ? {
            method, 
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(data),
        } : {  
            method, 
        }
        // console.log('fetch url', url)
        return fetch(url,options)
        .then(response=>response.json().then(json => ({ json, response })))
        .then(({ json, response }) => {
            // {"msg":"token过期","data":"","code":20010}
            if(json && json.code === 20010){
                me.openPage('/signin')
                return fail(json)
            }
            if (!response.ok) {
                // return Promise.reject(json)
                return fail(json)
            }
            return succ(json)
            // return Object.assign({},json)
        })
        .catch(function(ex) {
            return fail(ex)
            // console.warn(ex)
        })
    }
    renderContent(){ // 子类覆盖该方法
        return null 
    }
    render(){
        const me = this
        return (
            <div className="quyou-base">
                {
                    me.renderContent()
                }
            </div>
        )
    }
    scrollLoadMore(me,FETCH_PAGE,API_PAGE,randomSort){
        window.onscroll = () => {
            if (getScrollTop() + getClientHeight() == getScrollHeight()) { 
                const { count = 0 } = me.state[FETCH_PAGE].response.data
                if(me.page >= Math.ceil(count/me.limit)-1){
                    window.onscroll=null
                    return
                }
                ++me.page
                me.requestList(me,FETCH_PAGE,API_PAGE,randomSort)
            }
        }
    }
    requestList(me,FETCH_PAGE,API_PAGE,randomSort = false){
        me.scrollLoadMore(me,FETCH_PAGE,API_PAGE,randomSort)
        const { state, page, limit } = me
        if(page === 0) {
            me.setState({
                [FETCH_PAGE]: {
                    ...state[FETCH_PAGE],
                    fetching: 1,
                }
            })
        }
        let req={
            token: me.user.token,
            limit,
            offset: limit * page
        }
        if(API_PAGE===`/tourIndex/postList`){
            req[`project`]=``
            req[`eara`]=``
            req[`cate`]=``
        // }else if(API_PAGE===`/sleepIndex/sellerSearch`){
        }else if(~API_PAGE.indexOf(`/sellerSearch`)||~API_PAGE.indexOf(`/foodSearch`)||~API_PAGE.indexOf(`/seasonRecSearch`)){
            req={
                ...req,
                ..._location.query
            }
            delete req['filterid']
        }else if(API_PAGE===`/user/coupon_my`){
            req={
                ...req,
                ..._location.query
            }
        }
        me.requestAPI(API_PAGE,req,(response)=>{
            console.log('response',response)
            response.data = response.data || {}
            response.data.data = Array.isArray(response.data.data)?response.data.data:[]
            // if(randomSort){
            //     response.data.data = response.data.data.sort(()=>Math.random()-0.5)
            // }
            if(page === 0) {
                me.setState({
                    [FETCH_PAGE]: {
                        response,
                        fetching: 0
                    }
                })
                return
            }
            const FETCH_TEMP = me.state[FETCH_PAGE]
            FETCH_TEMP.response.data.data = [
                ...FETCH_TEMP.response.data.data,
                ...response.data.data,
            ]
            me.setState({
                [FETCH_PAGE]: FETCH_TEMP
            })
        })
    }
    requestDetail(me,FETCH_PAGE,API_PAGE){
        const { state, props } = me
		const { params } = props
        me.setState({
            [FETCH_PAGE]: {
                ...state[FETCH_PAGE],
                fetching: 1,
            }
		})
        me.requestAPI(API_PAGE,{
			...params,
            token: me.user.token,
		},(response)=>{
            me.setState({
                [FETCH_PAGE]: {
                    response,
                    fetching: 0
                }
            })
            const { data = {}} = response
            if(data.id){
                data.imgs = Array.isArray(data.imgs) ? data.imgs : []
                data.images = Array.isArray(data.images) ? data.images : []
                me.shareTextObjSetting({
                    title:data.title||data.name,
                    imgUrl:data.imgs[0]||data.images[0]||data.indexPic||data.img||`http://www.weichongming.com/quyou/logo.png`,
                    desc:data.description?data.description.split('<br>')[0]:'',
                })
            }
        })
    }
	handleShowCreateComment(params = {}){
        const me = this
        if(!me.user.token){
            this.openPage('/signin')
            return
        }
        const { showCreateComment } = me.state
		me.setState({
            showCreateComment: !showCreateComment,
            ...params
		})
	}
	handleChangeCreateComment(e){
		const me = this
		me.setState({
			valueCreateComment: e.target.value
		})
	}
	handleSaveCreateComment({ API_PAGE_COMMENT, FETCH_PAGE, ID }, e){
        const me = this
        const { state, initTextOkay } = me
		const { valueCreateComment, textOkay } = state
		const { params } = me.props
		if(textOkay === initTextOkay && valueCreateComment) {
			me.setState({
				textOkay: `${initTextOkay}中...`,
			})
			me.requestAPI(API_PAGE_COMMENT,{
				content: valueCreateComment,
				[ID]: params.id,
                token: me.user.token,
			},(response)=>{
				const { code = 0, data } = response
				if(code || !data.id) {
					me.setState({
						textOkay: initTextOkay,
					})
					return
                }
                data.user_info = {
                    id: me.user.uid,
                    headimg: me.user.headimg,
                    is_v: me.user.is_v,
                    nickname: me.user.nickname
                }
				const FETCH_TEMP = me.state[FETCH_PAGE]
                FETCH_TEMP.response.data.comment_count += 1
                FETCH_TEMP.response.data.comments = Array.isArray(FETCH_TEMP.response.data.comments) ? FETCH_TEMP.response.data.comments : [] 
				FETCH_TEMP.response.data.comments.unshift(data)
				me.setState({
					[FETCH_PAGE]: FETCH_TEMP,
					textOkay: initTextOkay,
					isDoLike: false,
					showCreateComment: false,
					valueCreateComment: '',
				})
				window.scrollTo(0, document.getElementsByClassName('comment-title')[0].offsetTop-fontSize*2.2) // 回到第一个评论
				// document.getElementsByClassName('comment-title')[0].scrollIntoView() // 回到第一个评论
			})
		}
	}
	handleLike({ API_PAGE_LIKE, FETCH_PAGE, ID }, e){
        const me = this
        const { state, props } = me
		const { isDoLike } = state
		const { params } = props
		if(!isDoLike){
			me.setState({
				isDoLike: true,
			})
			me.requestAPI(API_PAGE_LIKE,{
				[ID]: params.id,
                token: me.user.token,
			},(response)=>{
				const { code = 0, data } = response
				if(code) {
					me.setState({
						isDoLike: false,
					})
					return
				}
				const FETCH_TEMP = me.state[FETCH_PAGE]
				FETCH_TEMP.response.data.is_like = !FETCH_TEMP.response.data.is_like
				FETCH_TEMP.response.data.like_count = FETCH_TEMP.response.data.like_count + (FETCH_TEMP.response.data.is_like ? 1 : -1)
				me.setState({
					[FETCH_PAGE]: FETCH_TEMP,
					isDoLike: false,
				})
			})
		}
	}
	handleFollow({ user_id, isFollowed, API_MY_DO_FOLLOW, FETCH_PAGE },e){
        const me = this
        const { state, props } = me
		const { isDoFollow, textFollow } = state
        const { params } = props
		if(!isDoFollow){
			me.setState({
                isDoFollow: true,
            })
            // setTimeout(()=>{
            //     const FETCH_TEMP = me.state[FETCH_PAGE]
			// 	FETCH_TEMP.response.data.is_follow = !FETCH_TEMP.response.data.is_follow
			// 	me.setState({
			// 		[FETCH_PAGE]: FETCH_TEMP,
			// 		isDoFollow: false,
			// 	})
            // },600)
			me.requestAPI(API_MY_DO_FOLLOW,{
				follow_id:user_id,
                token: me.user.token,
			},(response)=>{
				const { code = 0, data } = response
				if(code) {
					me.setState({
						isDoFollow: false,
					})
					return
				}
				const FETCH_TEMP = me.state[FETCH_PAGE]
				FETCH_TEMP.response.data.is_follow = !FETCH_TEMP.response.data.is_follow
				me.setState({
					[FETCH_PAGE]: FETCH_TEMP,
					isDoFollow: false,
				})
            })
        }
    }
    handleSearch(like){
        const me = this
        let { query } = me.props.location
        query = {
            ...query,
            like
        }
        console.log('query', query)
        me.openPage(`${_location.pathname}${me.getRequestParam(query)}`)
    }
}
Quyou.contextTypes={
	router: PropTypes.object
}
window.doImg={
    fw: width => `!/fw/${width||300}`,
    fh: height => `!/fh/${height||200}`
}
window.React=React
window.Link=Link
window.Quyou=Quyou
window.NoMoreData=NoMoreData
window.StarsShow=StarsShow
window.TouchSlideBox=TouchSlideBox
window.LazyLoad=LazyLoad
window.Mask=Mask
window.CreateComment=CreateComment
// window.Sign=Sign
window.Spin=Spin
window.SelectBox=SelectBox
window.FilterBox=FilterBox
window.fetch=fetch
window.TYPES={
    FETCH_MY_COUPON_LIST:`FETCH_MY_COUPON_LIST`,
    FETCH_MY_FOLLOW_LIST:`FETCH_MY_FOLLOW_LIST`,
    FETCH_MY_GET_LOGIN_CODE:`FETCH_MY_GET_LOGIN_CODE`,
    FETCH_MY_CHECK_LOGIN_CODE:`FETCH_MY_CHECK_LOGIN_CODE`,
    FETCH_TOUR_INDEX:`FETCH_TOUR_INDEX`,
    FETCH_TOUR_PIC_LIST:`FETCH_TOUR_PIC_LIST`,
    FETCH_TOUR_PIC_DETAIL:`FETCH_TOUR_PIC_DETAIL`,
    FETCH_EAT_INDEX:`FETCH_EAT_INDEX`,
    FETCH_EAT_FOOD_LIST:`FETCH_EAT_FOOD_LIST`,
    FETCH_EAT_FOOD_DETAIL:`FETCH_EAT_FOOD_DETAIL`,
    FETCH_EAT_SHOP_LIST:`FETCH_EAT_SHOP_LIST`,
    FETCH_EAT_TIME_LIST:`FETCH_EAT_TIME_LIST`,
    FETCH_EAT_TIME_DETAIL:`FETCH_EAT_TIME_DETAIL`,
    FETCH_EAT_SEASON_LIST:`FETCH_EAT_SEASON_LIST`,
    FETCH_SLEEP_INDEX:`FETCH_SLEEP_INDEX`,
    FETCH_SLEEP_SHOP_LIST:`FETCH_SLEEP_SHOP_LIST`,
    FETCH_TOUR_SHOP_LIST:`FETCH_TOUR_SHOP_LIST`,
    FETCH_SHOP_DETAIL:`FETCH_SHOP_DETAIL`,
    FETCH_MEDIA_LIST:`FETCH_MEDIA_LIST`,
    FETCH_MEDIA_DETAIL:`FETCH_MEDIA_DETAIL`,
    FETCH_POST_LIST:`FETCH_POST_LIST`,
    FETCH_POST_DETAIL:`FETCH_POST_DETAIL`,
    FETCH_PLUS_POST_LIST:`FETCH_PLUS_POST_LIST`,
    FETCH_PLUS_DETAIL:`FETCH_PLUS_DETAIL`,
}
window.APIS={
    API_MY_COUPON_RECEIVE:`/user/recive_coupon`,
    API_MY_COUPON_LIST:`/user/coupon_my`,
    API_MY_COUPON_USE:`/user/coupon_use`,
    API_MY_COUPON_DETAIL: '/user/coupon_detail',
    API_MY_FOLLOW_LIST:`/user/followList`,
    API_MY_DO_FOLLOW:`/user/follow`,
    API_MY_GET_JSSIGN:`/user/get_jssign`,
    API_MY_UPDATE_PROFILE:`/user/updateInfo`,
    API_MY_GET_LOGIN_CODE:`/user/getloginCode`,
    API_MY_CHECK_LOGIN_CODE:`/user/mcheck`,
    API_TOUR_INDEX:`/tourIndex/index`,
    API_TOUR_PIC_LIST:`/tourIndex/tourPicList`,
    API_TOUR_PIC_DETAIL:`/tourIndex/tourPicDetail`,
    API_TOUR_ROUTE_LIST:`/tourIndex/tourRouteList`,
    API_TOUR_ROUTE_DETAIL:`/tourIndex/tourRouteDetail`,
    API_TOUR_POST_LIST:`/tourIndex/postList`,
    API_TOUR_POST_DETAIL:`/tourIndex/postDetail`,
    API_TOUR_POST_COMMENT:`/tourIndex/postComment`,
    API_TOUR_POST_LIKE:`/tourIndex/postLike`,
    API_TOUR_SHOP_LIST:`/tourIndex/sellerSearch`,
    API_TOUR_SHOP_DETAIL:`/tourIndex/sellerDetail`,
    API_TOUR_SHOP_COMMENT:`/tourIndex/sellerComment`,
    API_TOUR_SHOP_LIKE:`/tourIndex/sellerLike`,
    API_SLEEP_INDEX:`/sleepIndex/index`,
    API_SLEEP_MEDIA_LIST:`/sleepIndex/recMediaList`,
    API_SLEEP_MEDIA_DETAIL:`/sleepIndex/recMediaDetail`,
    API_SLEEP_MEDIA_LIKE:`/sleepIndex/recMediaLike`,
    API_SLEEP_MEDIA_COMMENT:`/sleepIndex/mediaComment`,
    API_SLEEP_POST_LIST:`/sleepIndex/postList`,
    API_SLEEP_POST_DETAIL:`/sleepIndex/postDetail`,
    API_SLEEP_POST_COMMENT:`/sleepIndex/postComment`,
    API_SLEEP_POST_LIKE:`/sleepIndex/postLike`,
    API_SLEEP_SHOP_LIST:`/sleepIndex/sellerSearch`,
    API_SLEEP_SHOP_DETAIL:`/sleepIndex/sellerDetail`,
    API_SLEEP_SHOP_COMMENT:`/sleepIndex/sellerComment`,
    API_SLEEP_SHOP_LIKE:`/sleepIndex/sellerLike`,
    API_EAT_INDEX:`/eatIndex/index`,
    API_EAT_MEDIA_LIST:`/eatIndex/recMediaList`,
    API_EAT_MEDIA_DETAIL:`/eatIndex/recMediaDetail`,
    API_EAT_MEDIA_COMMENT:`/eatIndex/mediaComment`,
    API_EAT_MEDIA_LIKE:`/eatIndex/recMediaLike`,
    API_EAT_POST_LIST:`/eatIndex/postList`,
    API_EAT_POST_DETAIL:`/eatIndex/postDetail`,
    API_EAT_POST_COMMENT:`/eatIndex/postComment`,
    API_EAT_POST_LIKE:`/eatIndex/postLike`,
    API_EAT_FOOD_LIST:`/eatIndex/foodSearch`,
    API_EAT_FOOD_DETAIL:`/eatIndex/foodDetail`,
    API_EAT_FOOD_COMMENT:`/eatIndex/foodComment`,
    API_EAT_FOOD_LIKE:`/eatIndex/foodLike`,
    API_EAT_SHOP_LIST:`/eatIndex/sellerSearch`,
    API_EAT_SHOP_DETAIL:`/eatIndex/sellerDetail`,
    API_EAT_SHOP_COMMENT:`/eatIndex/sellerComment`,
    API_EAT_SHOP_LIKE:`/eatIndex/sellerLike`,
    API_EAT_TIME_LIST:`/eatIndex/timeBenefitsList`,
    API_EAT_TIME_DETAIL:`/eatIndex/timeBenefitsDetail`,
    API_EAT_SEASON_LIST:`/eatIndex/seasonRecSearch`,
    API_PLUS_POST_LIST:`/eatIndex/postPlusList`,
    API_PLUS_POST_DETAIL:`/eatIndex/postPlusDetail`,
    API_PLUS_POST_COMMENT:`/eatIndex/postPlusComment`,
    API_PLUS_POST_LIKE:`/eatIndex/postPlusLike`,

    API_FAVORD_POST_DETAIL: `/shopIndex/favordiscountDetail`,
}
window.STATE={
    coupons: [{
        "desc_title": "周末不可用周末不可用周末不可用",
        "imgs": ["http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/4cdbdb7209e2a99e.png"],
        "id": 3,
        "coupon_code": "123",
        "stock": 19,
        "status": "0000",
        "reciev_count": 4,
        "use_count": 1,
        "title": "大优惠门票代金券5元",
        "update_dt": 1515731748,
        "start_dt": 1512274528,
        "create_dt": 1512274530,
        "rtype": "0010",
        "seller_id": 42,
        "end_dt": 1516767328
    }]
}
window.initState=()=>{
    return {
        data: {
            "count": 0,
            "data": [],
        }
    }
}
window.VideoList = (props) => {
    const { list, me, title = '视频推荐', type = 'EAT', cover = '' } = props
    return (
        <div className="video clearboth">
            <div className="title-box">
                <div className="line thinner-border clearboth"></div>
                <div className="title" onClick={me.openPage.bind(me, `/videohot?_t=${type}`)}>{title}</div>
            </div>
            <div className="vlist">
                <div className="ul-box">
                    <ul style={{width:((list.length+1)*fontSize*(240+30)/40)}}>
                        <li onClick={me.openPage.bind(me, `/videohot`)}>
                            <div className="icon poster" style={{backgroundImage:`url(${cover})`}}>
                                {/* <div className="more"></div> */}
                                {/* <div className="more">更多 &gt;</div> */}
                            </div>
                            <div className="text">查看更多视频<img className="cover-go" src={go} /></div>
                            {/* <div className="text">更多推荐视频</div> */}
                        </li>
                        {
                            list.map((d,i)=>(
                                <li key={i} onClick={me.openPage.bind(me, `/videohot/${d.id}?_t=${type}`)}>
                                    <div className="icon poster other" style={{backgroundImage:`url(${d.indexPic}${doImg.fw()})`}}>
                                        <img src={play} />
                                    </div>
                                    <div className="text text-elip">{d.title}</div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="gap"></div>
        </div>
    )
}
window.PostList = (props) => {
    const {
        isVideo = false, 
        list, 
        me,
        type = 'EAT',
        FETCH_PAGE
    } = props
    const { pathname } = _location
    // <LazyLoad key={i} height={200} offset={100}>
    return (
        <div className="list">
            {
                list.map((d={ imgs:[] },i)=>{
                    d.imgs = Array.isArray(d.imgs) ? d.imgs : []
                    d.imgs = d.imgs.length ? d.imgs : (d.cover_img?[d.cover_img]:[])
                    return (
                        <div key={i}>
                            {/* <div className="item" onClick={me.openPage.bind(me,`${pathname}/${d.id}?_t=${type}`)}> */}
                            <div 
                                className="item"
                                onClick={()=>{
                                    if(sessionStorage) {
                                        sessionStorage.setItem(FETCH_PAGE, JSON.stringify({
                                            response: me.state[FETCH_PAGE],
                                            scrollTop: getScrollTop(),
                                            page: me.page
                                        }))
                                    }
                                    me.openPage(`${pathname}/${d.id}?_t=${type}`)
                                }}
                            >
                                <div className="avatar-name">
                                    <i className="icon" style={{backgroundImage:`url(${d.headimg})`}}></i>
                                    <span>{d.nickname}</span>
                                    <a className="icon"></a>
                                </div>
                                <div className="content">
                                    <div>{d.title}</div>
                                    {d.description?d.description.split('<br>')[0]:''}
                                </div>
                                <LazyLoad height={200} offset={100}>
                                    <div className="icon cover" style={{backgroundImage:`url(${isVideo?d.indexPic:d.imgs[0]}${doImg.fw(400)})`}}>
                                        {
                                            ~pathname.indexOf('video') ? <i className="icon play" style={{backgroundImage:`url(${play})`}} /> : null
                                        }
                                    </div>
                                </LazyLoad>
                                <div className="dos">
                                    <div className={classnames({do:true,active:d.is_like})} >
                                        <i className="icon good"></i>
                                        <span>{d.like_count}</span>
                                    </div>
                                    <div className="thin-border-verical"></div>
                                    <div className="do">
                                        <i className="icon comment"></i>
                                        <span>{d.comment_count}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="clearboth"></div>
                        </div>
                    )
                })
            }
        </div>
    )
}
window.PaperDetail  = (props) => {
    const {
        isVideo = false, 
        d = {
            imgs:[],
            is_follow: 0
        },
        me,
        params = { },
        noShowHeder,
    } = props
    let { isDoFollow = false } =  me.state
    const isFollowed = d.is_follow
    // const isFollowed = 'isFollowed' in me.state ? me.state.isFollowed : d.is_follow
    // d.imgs.map((da,i) => <img key={i} className="pic" src={da} />)
    const { API_MY_DO_FOLLOW, FETCH_PAGE } = params
    d.imgs = Array.isArray(d.imgs) ? d.imgs : []
    // d.imgs = d.imgs.length ? d.imgs : (d.cover_img?[d.cover_img]:[])
    return (
        <div>
            {/* <div className="toper"> */}
            <div className="">
                {/* <div className="title">{d.title}</div> */}
                {
                    noShowHeder
                        ?
                        null
                        :
                        (
                            <div className="heder">
                                <div className={classnames({ follow:true, active: isFollowed })} onClick={me.handleFollow.bind(me, { user_id: d.user_id, isFollowed, API_MY_DO_FOLLOW, FETCH_PAGE })}>
                                    {
                                        isDoFollow ? (
                                            isFollowed ? '取消关注...' : (
                                                <div>
                                                    <span>+</span>关注中...
                                                </div>
                                            )
                                        ) : (
                                            isFollowed ? '已关注' : (
                                                <div>
                                                    <span>+</span>关注
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                                <img src={d.headimg} />
                                <div className="nickname">{d.nickname}<a className="icon"></a></div>
                                <div className="create">{misc.formatTime(d.create_dt*1000,2)}</div>
                            </div>
                        )
                }

                {
                    isVideo ? null : (
                        d.is_rich==="0" ? (
                            <div>
                                {
                                    d.imgs.map((da,i) => <LazyLoad key={i} height={200} offset={100}><img className="pic" src={`${da}${doImg.fw(800)}`} /></LazyLoad> )
                                }
                            </div>
                        ) : null
                    )
                }
                {
                    isVideo && d.description ? d.description.split('<br>').map((da,i)=><div key={i} className="text">{da}</div>) : null
                }
                {
                    d.is_rich==="0"&&d.description?d.description.split('<br>').map((da,i)=><div key={i} className="text">{da}</div>):''
                }
                {
                    d.is_rich==="1"&&d.content?<div className="text" dangerouslySetInnerHTML={{
                        __html: d.content
                    }}/>:null
                }
            </div>
        </div>
    )
}
window.PostDetail  = (props) => {
    const {
        isVideo = false, 
        d = {
            imgs:[],
            is_follow: 0
        },
        me,
        params = { },
        noShowHeder,
    } = props
    let { isDoFollow = false } =  me.state
    const isFollowed = d.is_follow
    // const isFollowed = 'isFollowed' in me.state ? me.state.isFollowed : d.is_follow
    // d.imgs.map((da,i) => <img key={i} className="pic" src={da} />)
    const { API_MY_DO_FOLLOW, FETCH_PAGE } = params
    d.imgs = Array.isArray(d.imgs) ? d.imgs : []
    // d.imgs = d.imgs.length ? d.imgs : (d.cover_img?[d.cover_img]:[])
    return (
        <div>
            {
                isVideo ? (<video src={d.media} poster={d.indexPic} controls="controls" playsInline="true">您的浏览器不支持 video 标签。</video>) : null
            }
            <div className="toper">
                <div className="title">{d.title}</div>
                {
                    noShowHeder
                        ?
                        null
                        :
                        (
                            <div className="heder">
                                <div className={classnames({ follow:true, active: isFollowed })} onClick={me.handleFollow.bind(me, { user_id: d.user_id, isFollowed, API_MY_DO_FOLLOW, FETCH_PAGE })}>
                                    {
                                        isDoFollow ? (
                                            isFollowed ? '取消关注...' : (
                                                <div>
                                                    <span>+</span>关注中...
                                                </div>
                                            )
                                        ) : (
                                            isFollowed ? '已关注' : (
                                                <div>
                                                    <span>+</span>关注
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                                <img src={d.headimg} />
                                <div className="nickname">{d.nickname}<a className="icon"></a></div>
                                <div className="create">{misc.formatTime(d.create_dt*1000,2)}</div>
                            </div>
                        )
                }

                {
                    isVideo ? null : (
                        d.is_rich==="0" ? (
                            <div>
                                {
                                    d.imgs.map((da,i) => <LazyLoad key={i} height={200} offset={100}><img className="pic" src={`${da}${doImg.fw(800)}`} /></LazyLoad> )
                                }
                            </div>
                        ) : null
                    )
                }
                {
                    isVideo && d.description ? d.description.split('<br>').map((da,i)=><div key={i} className="text">{da}</div>) : null
                }
                {
                    d.is_rich==="0"&&d.description?d.description.split('<br>').map((da,i)=><div key={i} className="text">{da}</div>):''
                }
                {
                    d.is_rich==="1"&&d.content?<div className="text" dangerouslySetInnerHTML={{
                        __html: d.content
                    }}/>:null
                }
            </div>
        </div>
    )
    // {
    //     isVideo ? null : <img className="pic" src={d.imgs[0]} />
    // }
    // {
    //     isVideo ? null : <div>
    //         {
    //             d.imgs.map((da,i)=> i>0 ? <img key={i} className="pic" src={da} /> : null)
    //         }
    //     </div>
    // }
    // {
    //     !isVideo ? (<div className="icon cover" style={{backgroundImage:`url(${d.imgs[0]})`}}></div>) : null
    // }
}
window.CommentList = (props) => {
    let {
        me,
        total = 0,
        list = [],
    } = props
    list = Array.isArray(list) ? list : []
    return (
        <div className="comment-necker" id="comment-necker">
            <div className="comment-title">用户评论 ({total})</div>
            <div className="clearboth thinner-border"></div>
            <ul className="comment-list">
                {
                    list.map((d = {},i)=>{
                        d.user_info = d.user_info || {
                            headimg: avatar_url,
                            nickname: me.user.nickname,
                        }
                        return (
                            <li key={i}>
                                <LazyLoad height={50} offset={100}>
                                    <img src={d.user_info.headimg||avatar_url} />
                                </LazyLoad>
                                <div className="create">{misc.formatTime(d.creat_dt*1000,2)}</div> 
                                <div className="nicktext">
                                    <div className="nick" >{d.user_info.nickname}</div>
                                    <div className="text">{d.comment}</div>
                                </div>
                                <div className="clearboth thinner-border"></div>
                            </li>
                        )
                    })
                }
            </ul>
            {
                total > 100  ? <div className="view-more">查看更多评论</div> : null
            }
        </div>
    )
}
window.CommentFixed = (props) => {
    const { 
        textPlaceholder = '想搭讪，先评论',
        handleShowCreateComment,
        handleLike,
        d = {}, 
    } = props
    return (
        <div className="fixed-footer">
            <div className="clearboth thinner-border"></div>
            <div className="text" onClick={handleShowCreateComment}>{textPlaceholder}</div>
            <div className={classnames({'good-box':true, active:d.is_like})} onClick={handleLike}>
                <i className="icon"></i>
                <span>{d.like_count}</span>
            </div>
        </div>
    )
}
window.Intro = (props) => {
    const { 
        handleJump = () => { },
        needCover = false,
        data = {
            imgs: [],
            tag_name: [],
            activities: [],
        },
        Composed,
    } = props
    data.tag_name = Array.isArray(data.tag_name) ? data.tag_name : []
    const addr = data.addr1+data.addr2+data.addr3+data.detail
    const handleJumpMap = () => {
        window.location.href=`https://m.amap.com/search/mapview/keywords=崇明${data.name}`
    }
    // {
    //     needCover ? data.imgs.map((img,i)=><div key={i} className="icon cover" style={{backgroundImage:`url(${img})`}}></div>) : null
    // }
    return (
        <div className="shop-header">
            <div className="header-box">
                {
                    data.phone === '13248238215' ? null : (
                        <div className="thin-border-verical-box">
                            <div className="thin-border-verical"></div>
                        </div>
                    )
                }
                {
                    data.phone === '13248238215' ? null : (
                        <a href={`tel:${data.phone}`} className="icon phone"></a>
                    )
                }
                
                <div className="name" onClick={handleJump}><i className="icon" />【{data.name}】{ data.tag_name.length ? <span className="tag">{data.tag_name[0].tagname}</span> : null}</div>
                <div className="address" onClick={handleJumpMap}><i className="icon" />{addr}</div>
                {
                    Composed
                }
                {
                    needCover ? data.imgs.map((img,i)=><img key={i} className="icover" src={`${img}${doImg.fw(800)}`}/>) : null
                }
            </div>
        </div>
    ) 
}
window.getScrollTop = () => { //获取滚动条当前的位置
	var scrollTop = 0; 
    if (document.documentElement && document.documentElement.scrollTop) { 
    	scrollTop = document.documentElement.scrollTop; 
    } 
    else if (document.body) { 
    	scrollTop = document.body.scrollTop; 
    } 
    return scrollTop; 
} 

window.getClientHeight = () => { //获取当前可是范围的高度
	var clientHeight = 0; 
    if (document.body.clientHeight && document.documentElement.clientHeight) { 
   		clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
    } 
    else { 
    	clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
    } 
    return clientHeight; 
}

window.getScrollHeight = () => { //获取文档完整的高度
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
}
// function getViewportSize () {
//     return {
//         width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
//         height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
//     };
// }
window.SearchInput = (props) => {
    const {handleSearch = () => {}, me, placeholder = '搜索商家名称'} = props
    return (
        <div className="search-input">
            <form
                noValidate={true}
                autoComplete="off"
                className="area"
                action={''}
                onSubmit={
                    (form)=>{
                        document.activeElement && document.activeElement.blur() // 收起输入键盘
                        handleSearch(me.searchInput.value)
                        return false
                    }
                }
            >
                    <div
                        className="iconbox"
                        onClick={
                            ()=>{
                                me.searchInput && me.searchInput.focus()
                                me.searchInput && me.searchInput.focus()
                            }
                        }
                    >
                        <i className="icon" />
                    </div>
                    <input
                        type="search"
                        defaultValue={me.props.location.query.like}
                        ref={(node)=>{
                            me.searchInput = node
                        }}
                        placeholder={placeholder}
                        // onBlur={
                        //     (e)=>{
                        //         handleSearch(e.target.value)
                        //     }
                        // }
                        // onKeyUp={
                        //     (e)=>{
                        //         if (e.keyCode === 13) {
                        //             document.activeElement && document.activeElement.blur() // 收起输入键盘
                        //             handleSearch(e.target.value)
                        //         }
                        //     }
                        // }
                    />
            </form>
            <div className="clearboth thinner-border"></div>
        </div>
    )
}