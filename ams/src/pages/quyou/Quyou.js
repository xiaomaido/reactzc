import fetch from 'isomorphic-fetch'
import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import Mask from '../../components/Mask/'
import TouchSlideBox from '../../components/TouchSlideBox/'
import CreateComment from '../../components/CreateComment/'
import NoMoreData from '../../components/NoMoreData/'
import Sign from '../../components/Sign/'
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
    user_id=2
    limit=3
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
    requestAPI(url,data,succ=(res)=>{console.log(res)},fail=(err)=>{console.log(err)},method='GET'){
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
                {/* <SelectBox /> */}
                {/* <FilterBox /> */}
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
        const { state, page, limit } = me
        if(page === 0) {
            me.setState({
                [FETCH_PAGE]: {
                    ...state[FETCH_PAGE],
                    fetching: 1,
                }
            })
        }
        me.requestAPI(API_PAGE,{
            limit,
            offset: limit * page
        },(response)=>{
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
					console.log('error')
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
window.Sign=Sign
window.Spin=Spin
window.SelectBox=SelectBox
window.FilterBox=FilterBox
window.fetch=fetch
window.TYPES={
    FETCH_MY_PROFILE:`FETCH_MY_PROFILE`,
    FETCH_EAT_INDEX:`FETCH_EAT_INDEX`,
    FETCH_EAT_MEDIA_LIST:`FETCH_EAT_MEDIA_LIST`,
    FETCH_EAT_MEDIA_DETAIL:`FETCH_EAT_MEDIA_DETAIL`,
    FETCH_EAT_POST_LIST:`FETCH_EAT_POST_LIST`,
    FETCH_EAT_POST_DETAIL:`FETCH_EAT_POST_DETAIL`,
    FETCH_EAT_FOOD_LIST:`FETCH_EAT_FOOD_LIST`,
    FETCH_EAT_FOOD_DETAIL:`FETCH_EAT_FOOD_DETAIL`,
    FETCH_EAT_SHOP_LIST:`FETCH_EAT_SHOP_LIST`,
    FETCH_EAT_SHOP_DETAIL:`FETCH_EAT_SHOP_DETAIL`,
    FETCH_EAT_TIME_LIST:`FETCH_EAT_TIME_LIST`,
    FETCH_EAT_TIME_DETAIL:`FETCH_EAT_TIME_DETAIL`,
}
window.APIS={
    API_MY_PROFILE:`/users/xiaomaido`,
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
window.PostList = (props) => {
    const {
        isVideo = false, 
        list, 
        me,
    } = props
    const { pathname } = _location
    return (
        <div className="list">
            {
                list.map((d={ imgs:[] },i)=>(
                    <div key={i}>
                        <div className="item" onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}>
                            <div className="avatar-name">
                                <i className="icon" style={{backgroundImage:`url(${d.headimg})`}}></i>
                                <span>{d.nickname}</span>
                            </div>
                            <div className="content">{d.description}</div>
                            <div className="icon cover" style={{backgroundImage:`url(${isVideo?d.media:d.imgs[0]})`}}>
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
                isVideo ? (<video src="http://cdn.weichongming.com/空调/富士通将军空调/诺可力X-1级能效-挂壁式/诺可力X-2匹、3匹-1级能效-08.mp4" controls="controls" playsInline="true" poster="http://cdn.weichongming.com/%E7%A9%BA%E8%B0%83/%E5%AF%8C%E5%A3%AB%E9%80%9A%E5%B0%86%E5%86%9B%E7%A9%BA%E8%B0%83/%E8%AF%BA%E5%8F%AF%E5%8A%9BX-1%E7%BA%A7%E8%83%BD%E6%95%88-%E6%8C%82%E5%A3%81%E5%BC%8F/%E8%AF%BA%E5%8F%AF%E5%8A%9BX-2%E5%8C%B9%E3%80%813%E5%8C%B9-1%E7%BA%A7%E8%83%BD%E6%95%88-08.mp4?vframe/png/offset/8|imageView2/2/w/200">您的浏览器不支持 video 标签。</video>) : null
            }
            <div className="toper">
                <div className="title">{d.title}</div>
                <div className="heder">
                    <div className="follow" onClick={me.handleFollow.bind(me, d.user_id)}><span>+</span>关注</div>
                    <img src={d.headimg} />
                    <div className="nickname">{d.nickname}</div>
                    <div className="create">{d.create_dt||d.update_dt}</div>
                </div>
                {
                    !isVideo ? <img className="pic" src={d.imgs[0]} /> : null
                }
                <div className="text">{d.description}</div>
            </div>
        </div>
    )
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
                    list.map((d = {},i)=>(
                        <li key={i}>
                            <img src={"https://img.xiaohongshu.com/avatar/59cfbaecb46c5d515aa83eee.jpg@80w_80h_90q_1e_1c_1x.jpg"} />
                            <div className="create">{misc.formatTime(d.creat_dt*1000,2)}</div> 
                            <div className="nicktext">
                                <div className="nick">圣保罗爷爷</div>
                                <div className="text">{d.comment}</div>
                            </div>
                            <div className="clearboth thinner-border"></div>
                        </li>
                    ))
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
        needCover = false,
        data = {
            imgs: [],
        },
    } = props
    return (
        <div className="shop-header">
            <div className="header-box">
                <div className="thin-border-verical-box">
                    <div className="thin-border-verical"></div>
                </div>
                <a href={`tel:${data.phone}`} className="icon phone"></a>
                <div className="name"><i className="icon" />【{data.name}】</div>
                <div className="address"><i className="icon" />{data.addr1+data.addr2+data.addr3+data.detail}</div>
                {
                    needCover ? (<div className="icon cover" style={{backgroundImage:`url(${data.imgs[0]})`}}></div>) : null
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