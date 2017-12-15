import fetch from 'isomorphic-fetch'
import React from 'react'
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
import play from '../../images/quyou/icon/play.png'
window.avatar_url=avatar_url
window.play=play
export class Quyou extends React.Component{ // 公共模板
    initTextOkay='发布'
    user_id=0
    _tk=misc.getCookie('_tk')
    limit=8
    page=0
    api={
        host:`http://qyadmin.weichongming.com/peanut`
    }
    centToYuan(cent){
        return cent/100
    }
	componentWillMount(){
        window.onscroll=null
        window.ontouchstart=null
        window.ontouchend=null
        delete window['touchstartY']
        delete window['touchendY']
        window._location=this.props.location
		window.scrollTo(0, 0)
    }
	openPage(url,e){ // 打开页面
		this.context.router.push(url)
    }
    requestAPI=(url,data,succ=(res)=>{console.log(res)},fail=(err)=>{console.log(err)},method='GET')=>{
        const me = this
        if(!me._tk){
            if(~url.indexOf('Like') || ~url.indexOf('Comment')){
                this.openPage('/signin')
                return
            }
        }      
        url = ~url.indexOf(this.api.host) ? url : this.api.host + url
        url = data && method==='GET' ? url + Object.keys(data).reduce((arr,k)=>{
            arr.push(`&${k}=${data[k]}`)
            return arr
        },[]).join('').replace('&','?') : url
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
        return fetch(url,options)
        .then(response=>response.json().then(json => ({ json, response })))
        .then(({ json, response }) => {
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
    scrollLoadMore(me,FETCH_PAGE,API_PAGE){
        window.onscroll = () => {
            if (getScrollTop() + getClientHeight() == getScrollHeight()) { 
                const { count = 0 } = me.state[FETCH_PAGE].response.data
                if(me.page >= Math.ceil(count/me.limit)-1){
                    window.onscroll=null
                    return
                }
                ++me.page
                me.requestList(me,FETCH_PAGE,API_PAGE)
            }
        }
    }
    requestList(me,FETCH_PAGE,API_PAGE){
        me.scrollLoadMore(me,FETCH_PAGE,API_PAGE)
        const { state, page, limit, user_id } = me
        if(page === 0) {
            me.setState({
                [FETCH_PAGE]: {
                    ...state[FETCH_PAGE],
                    fetching: 1,
                }
            })
        }
        let req={
			user_id,
            limit,
            offset: limit * page
        }
        if(API_PAGE===`/tourIndex/postList`){
            req[`project`]=``
            req[`eara`]=``
            req[`cate`]=``
        }
        me.requestAPI(API_PAGE,req,(response)=>{
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
        const { state, props, user_id } = me
		const { params } = props
        me.setState({
            [FETCH_PAGE]: {
                ...state[FETCH_PAGE],
                fetching: 1,
            }
		})
        me.requestAPI(API_PAGE,{
			...params,
			user_id,
		},(response)=>{
            me.setState({
                [FETCH_PAGE]: {
                    response,
                    fetching: 0
                }
            })
        })
    }
	handleShowCreateComment(e){
		const me = this
        if(!me._tk){
            this.openPage('/signin')
            return
        }
		const { showCreateComment } = me.state
		me.setState({
			showCreateComment: !showCreateComment
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
        const { state, initTextOkay, user_id } = me
		const { valueCreateComment, textOkay } = state
		const { params } = me.props
		if(textOkay === initTextOkay && valueCreateComment) {
			me.setState({
				textOkay: `${initTextOkay}中...`,
			})
			me.requestAPI(API_PAGE_COMMENT,{
				content: valueCreateComment,
				[ID]: params.id,
				user_id,
			},(response)=>{
				const { code = 0, data } = response
				if(code || !data.id) {
					me.setState({
						textOkay: initTextOkay,
					})
					return
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
        const { state, props, user_id } = me
		const { isDoLike } = state
		const { params } = props
		if(!isDoLike){
			me.setState({
				isDoLike: true,
			})
			me.requestAPI(API_PAGE_LIKE,{
				[ID]: params.id,
				user_id,
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
	handleFollow(id,e){
		alert('follow ' + id)
	}
}
Quyou.contextTypes={
	router: PropTypes.object
}
window.React=React
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
    FETCH_MY_PROFILE:`FETCH_MY_PROFILE`,
    FETCH_MY_GET_LOGIN_CODE:`FETCH_MY_GET_LOGIN_CODE`,
    FETCH_MY_CHECK_LOGIN_CODE:`FETCH_MY_CHECK_LOGIN_CODE`,
    FETCH_TOUR_INDEX:`FETCH_TOUR_INDEX`,
    FETCH_TOUR_PIC_LIST:`FETCH_TOUR_PIC_LIST`,
    FETCH_EAT_INDEX:`FETCH_EAT_INDEX`,
    FETCH_MEDIA_LIST:`FETCH_MEDIA_LIST`,
    FETCH_MEDIA_DETAIL:`FETCH_MEDIA_DETAIL`,
    FETCH_POST_LIST:`FETCH_POST_LIST`,
    FETCH_POST_DETAIL:`FETCH_POST_DETAIL`,
    FETCH_EAT_FOOD_LIST:`FETCH_EAT_FOOD_LIST`,
    FETCH_EAT_FOOD_DETAIL:`FETCH_EAT_FOOD_DETAIL`,
    FETCH_EAT_SHOP_LIST:`FETCH_EAT_SHOP_LIST`,
    FETCH_SLEEP_SHOP_LIST:`FETCH_SLEEP_SHOP_LIST`,
    FETCH_SHOP_DETAIL:`FETCH_SHOP_DETAIL`,
    FETCH_EAT_TIME_LIST:`FETCH_EAT_TIME_LIST`,
    FETCH_EAT_TIME_DETAIL:`FETCH_EAT_TIME_DETAIL`,
}
window.APIS={
    API_MY_PROFILE:`/users/xiaomaido`,
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
}
window.ResponseState={
    FETCH_MY_PROFILE:{
        fetching: 0,
        response: {"login":"xiaomaido","id":11659631,"avatar_url":"https://avatars0.githubusercontent.com/u/11659631?v=4","gravatar_id":"","url":"https://api.github.com/users/xiaomaido","html_url":"https://github.com/xiaomaido","followers_url":"https://api.github.com/users/xiaomaido/followers","following_url":"https://api.github.com/users/xiaomaido/following{/other_user}","gists_url":"https://api.github.com/users/xiaomaido/gists{/gist_id}","starred_url":"https://api.github.com/users/xiaomaido/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/xiaomaido/subscriptions","organizations_url":"https://api.github.com/users/xiaomaido/orgs","repos_url":"https://api.github.com/users/xiaomaido/repos","events_url":"https://api.github.com/users/xiaomaido/events{/privacy}","received_events_url":"https://api.github.com/users/xiaomaido/received_events","type":"User","site_admin":false,"name":"Martin Zeng","company":null,"blog":"","location":"Shanghai","email":null,"hireable":null,"bio":null,"public_repos":16,"public_gists":0,"followers":0,"following":1,"created_at":"2015-03-26T05:59:40Z","updated_at":"2017-11-26T03:40:32Z"}
    },
}
window.VideoList = (props) => {
    const { list, me, title = '视频推荐', type = 'EAT' } = props
    return (
        <div className="video clearboth">
            <div className="title-box">
                <div className="line thinner-border clearboth"></div>
                <div className="title" onClick={me.openPage.bind(me, `/videohot?_t=${type}`)}>{title}</div>
            </div>
            <div className="vlist">
                <div className="ul-box">
                    <ul style={{width:((list.length+1)*fontSize*(240+30)/40)}}>
                        {
                            list.map((d,i)=>(
                                <li key={i} onClick={me.openPage.bind(me, `/videohot/${d.id}?_t=${type}`)}>
                                    <div className="icon poster other" style={{backgroundImage:`url(${d.indexPic})`}}>
                                        <img src={play} />
                                    </div>
                                    <div className="text text-elip">{d.title}</div>
                                </li>
                            ))
                        }
                        <li onClick={me.openPage.bind(me, `/videohot`)}>
                            <div className="icon poster">
                                <div className="more">更多视频 &gt;</div>
                            </div>
                            <div className="text"></div>
                        </li>
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
    } = props
    const { pathname } = _location
    return (
        <div className="list">
            {
                list.map((d={ imgs:[] },i)=>(
                    <div key={i}>
                        <div className="item" onClick={me.openPage.bind(me,`${pathname}/${d.id}?_t=${type}`)}>
                            <div className="avatar-name">
                                <i className="icon" style={{backgroundImage:`url(${d.headimg})`}}></i>
                                <span>{d.nickname}</span>
                                <a className="icon"></a>
                            </div>
                            <div className="content">
                                <div>{d.title}</div>
                                {d.description.split('<br>')[0]}
                            </div>
                            <div className="icon cover" style={{backgroundImage:`url(${isVideo?d.indexPic:d.imgs[0]})`}}>
                                {
                                    ~pathname.indexOf('video') ? <i className="icon play" style={{backgroundImage:`url(${play})`}} /> : null
                                }
                            </div>
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
                ))
            }
        </div>
    )
}
window.PostDetail  = (props) => {
    const {
        isVideo = false, 
        d = {
            imgs:[]
        },
        me,
    } = props
    return (
        <div>
            {
                isVideo ? (<video src={d.media} poster={d.indexPic} controls="controls" playsInline="true">您的浏览器不支持 video 标签。</video>) : null
            }
            <div className="toper">
                <div className="title">{d.title}</div>
                <div className="heder">
                    {/* <div className="follow" onClick={me.handleFollow.bind(me, d.user_id)}><span>+</span>关注</div> */}
                    <img src={d.headimg} />
                    <div className="nickname">{d.nickname}</div>
                    <div className="create">{d.create_dt||d.update_dt}</div>
                </div>
                {
                    isVideo ? null : <div>
                        {
                            d.imgs.map((da,i)=> <img key={i} className="pic" src={da} /> )
                        }
                    </div>
                }
                {
                    d.description.split('<br>').map((da,i)=><div key={i} className="text">{da}</div>)
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
                            nickname: `游客`,
                        }
                        return (
                            <li key={i}>
                                <img src={d.user_info.headimg} />
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
    } = props
    data.tag_name = Array.isArray(data.tag_name) ? data.tag_name : []
    return (
        <div className="shop-header">
            <div className="header-box">
                <div className="thin-border-verical-box">
                    <div className="thin-border-verical"></div>
                </div>
                <a href={`tel:${data.phone}`} className="icon phone"></a>
                <div className="name" onClick={handleJump}><i className="icon" />【{data.name}】{ data.tag_name.length ? <span className="tag">{data.tag_name[0].tagname}</span> : null}</div>
                <div className="address"><i className="icon" />{data.addr1+data.addr2+data.addr3+data.detail}</div>
                {
                    needCover ? data.imgs.map((img,i)=><div key={i} className="icon cover" style={{backgroundImage:`url(${img})`}}></div>) : null
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