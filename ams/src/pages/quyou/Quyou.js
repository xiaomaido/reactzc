import fetch from 'isomorphic-fetch'
import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import Mask from '../../components/Mask/'
import TouchSlideBox from '../../components/TouchSlideBox/'
import CreateComment from '../../components/CreateComment/'
import Sign from '../../components/Sign/'
import Spin from '../../components/Spin/'
import SelectBox from '../../components/SelectBox/'
import FilterBox from '../../components/FilterBox/'
import avatar_url from '../../images/quyou/icon/avatar.png'
window.avatar_url=avatar_url
window.TYPES={
    FETCH_MY_PROFILE:`FETCH_MY_PROFILE`
}
window.APIS={
    API_MY_PROFILE:`/users/xiaomaido`
}
export class Quyou extends React.Component{ // 公共模板
    api={
        host:`https://api.github.com`
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
}
Quyou.contextTypes={
	router: PropTypes.object
}
window.React=React
window.Quyou=Quyou
window.TouchSlideBox=TouchSlideBox
window.LazyLoad=LazyLoad
window.Mask=Mask
window.CreateComment=CreateComment
window.Sign=Sign
window.Spin=Spin
window.SelectBox=SelectBox
window.FilterBox=FilterBox
window.fetch=fetch
window.ResponseState={
    FETCH_MY_PROFILE:{"login":"xiaomaido","id":11659631,"avatar_url":"https://avatars0.githubusercontent.com/u/11659631?v=4","gravatar_id":"","url":"https://api.github.com/users/xiaomaido","html_url":"https://github.com/xiaomaido","followers_url":"https://api.github.com/users/xiaomaido/followers","following_url":"https://api.github.com/users/xiaomaido/following{/other_user}","gists_url":"https://api.github.com/users/xiaomaido/gists{/gist_id}","starred_url":"https://api.github.com/users/xiaomaido/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/xiaomaido/subscriptions","organizations_url":"https://api.github.com/users/xiaomaido/orgs","repos_url":"https://api.github.com/users/xiaomaido/repos","events_url":"https://api.github.com/users/xiaomaido/events{/privacy}","received_events_url":"https://api.github.com/users/xiaomaido/received_events","type":"User","site_admin":false,"name":"Martin Zeng","company":null,"blog":"","location":"Shanghai","email":null,"hireable":null,"bio":null,"public_repos":16,"public_gists":0,"followers":0,"following":1,"created_at":"2015-03-26T05:59:40Z","updated_at":"2017-11-26T03:40:32Z"}
}
export const PostList = (props) => {
    const { list, me, pathname } = props
    return (
        <div className="list">
            {
                list.map((d,i)=>(
                    <div key={i}>
                        <div className="item">
                            <div className="avatar-name">
                                <i className="icon"></i>
                                <span>吃货小分队</span>
                            </div>
                            <div className="content" onClick={me.openPage.bind(me,`${pathname}/${i+1}`)}>驴肉火烧简直是人间美味~~~</div>
                            <div className="icon cover" onClick={me.openPage.bind(me,`${pathname}/${i+1}`)}>
                                {
                                    ~pathname.indexOf('video') ? <i className="icon play" /> : null
                                }
                                
                            </div>
                            <div className="dos">
                                <div className={classnames({do:true,active:i%2})} onClick={me.doGood.bind(this)}>
                                    <i className="icon good"></i>
                                    <span>1088</span>
                                </div>
                                <div className="thin-border-verical"></div>
                                <div className="do" onClick={me.openPage.bind(me,`${pathname}/${i+1}`)}>
                                    <i className="icon comment"></i>
                                    <span>2058</span>
                                </div>
                            </div>
                        </div>
                        <div className="clearboth thinner-border"></div>
                    </div>
                ))
            }
        </div>
    )
}
export const PostDetail  = (props) => {
    const { isVideoPost = false, isImagePost = false } = props
    return (
        <div>
            {
                isVideoPost ? (<video src="//v.xiaohongshu.com/ljeahFnueWK2AxUEWbYskA94oKzW" controls="controls" playsInline="true" poster="http://ci.xiaohongshu.com/3156aeaf-745a-4770-942a-e660431dc5d5@r_640w_640h.jpg">您的浏览器不支持 video 标签。</video>) : null
            }
            <div className="toper">
                <div className="title">强烈推荐徐家汇的这家日料</div>
                <div className="heder">
                    <div className="follow"><span>+</span>关注</div>
                    <img src={"https://img.xiaohongshu.com/avatar/59cfbaecb46c5d515aa83eee.jpg@80w_80h_90q_1e_1c_1x.jpg"} />
                    <div className="nickname">人气小登登</div>
                    <div className="create">2017-09-29</div>
                </div>
                {
                    isImagePost ? (<div className="icon cover" style={{backgroundImage:'url(http://ac-tulkzvki.clouddn.com/5m7AK2sp4XT0ygsw0a3vgzWvVgdD5FDTgD4gKM2l.jpg)'}}></div>) : null
                }
                <div className="text">我也想有一个酱紫比男朋友还暖心的大金毛🌀感动到最后一个竟然笑了 太可爱🌀别人家的狗😂 我们家的四只泰迪我撞死了都跟他们没关系，有人喂饭就好了</div>
            </div>
        </div>
        
    )
}
export const CommentList = (props) => {
    const {
        total = 0,
        list = [],
    } = props
    return (
        <div className="comment-necker">
            <div className="comment-title">用户评论 ({total})</div>
            <div className="clearboth thinner-border"></div>
            <ul className="comment-list">
                {
                    list.map((d,i)=>(
                        <li key={i}>
                            <img src={"https://img.xiaohongshu.com/avatar/59cfbaecb46c5d515aa83eee.jpg@80w_80h_90q_1e_1c_1x.jpg"} />
                            <div className="create">3分钟前</div> 
                            <div className="nicktext">
                                <div className="nick">圣保罗爷爷</div>
                                <div className="text">火箭上升至西部第一</div>
                            </div>
                            <div className="clearboth thinner-border"></div>
                        </li>
                    ))
                }
            </ul>
            <div className="view-more">查看更多评论</div>
        </div>
    )
}
export const CommentFixed = (props) => {
    const { handleShowCreateComment, handleLike } = props
    return (
        <div className="fixed-footer">
            <div className="clearboth thinner-border"></div>
            <div className="text" onClick={handleShowCreateComment}>想搭讪，先评论</div>
            <div className="good-box" onClick={handleLike}>
                <i className="icon"></i>
                <span>261</span>
            </div>
        </div>
    )
}
export const Intro = (props) => {
    const { needCover = false } = props
    return (
        <div className="shop-header">
            <div className="header-box">
                <div className="thin-border-verical-box">
                    <div className="thin-border-verical"></div>
                </div>
                <a href="tel:15601963619" className="icon phone"></a>
                <div className="name"><i className="icon" />【乐凯普面包烘焙】</div>
                <div className="address"><i className="icon" />城桥镇南门路37弄18号</div>
                {
                    needCover ? (<div className="icon cover"></div>) : null
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