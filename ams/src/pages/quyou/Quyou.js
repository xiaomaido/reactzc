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
import play from '../../images/quyou/icon/play.png'
window.avatar_url=avatar_url
window.play=play
export class Quyou extends React.Component{ // 公共模板
    api={
        // host:`https://api.github.com`
        host:`http://qyadmin.weichongming.com/peanut`
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
window.TYPES={
    FETCH_MY_PROFILE:`FETCH_MY_PROFILE`,
    FETCH_EAT_INDEX:`FETCH_EAT_INDEX`,
    FETCH_EAT_POST_LIST:`FETCH_EAT_POST_LIST`,
    FETCH_EAT_POST_DETAIL:`FETCH_EAT_POST_DETAIL`,
}
window.APIS={
    API_MY_PROFILE:`/users/xiaomaido`,
    API_EAT_INDEX:`/eatIndex/index`,
    API_EAT_POST_LIST:`/eatIndex/postList`,
    API_EAT_POST_DETAIL:`/eatIndex/postDetail`,
}
window.ResponseState={
    FETCH_MY_PROFILE:{
        fetching: 0,
        response: {"login":"xiaomaido","id":11659631,"avatar_url":"https://avatars0.githubusercontent.com/u/11659631?v=4","gravatar_id":"","url":"https://api.github.com/users/xiaomaido","html_url":"https://github.com/xiaomaido","followers_url":"https://api.github.com/users/xiaomaido/followers","following_url":"https://api.github.com/users/xiaomaido/following{/other_user}","gists_url":"https://api.github.com/users/xiaomaido/gists{/gist_id}","starred_url":"https://api.github.com/users/xiaomaido/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/xiaomaido/subscriptions","organizations_url":"https://api.github.com/users/xiaomaido/orgs","repos_url":"https://api.github.com/users/xiaomaido/repos","events_url":"https://api.github.com/users/xiaomaido/events{/privacy}","received_events_url":"https://api.github.com/users/xiaomaido/received_events","type":"User","site_admin":false,"name":"Martin Zeng","company":null,"blog":"","location":"Shanghai","email":null,"hireable":null,"bio":null,"public_repos":16,"public_gists":0,"followers":0,"following":1,"created_at":"2015-03-26T05:59:40Z","updated_at":"2017-11-26T03:40:32Z"}
    },
    // FETCH_EAT_INDEX:{
    //     fetching: 0,
    //     response: {"msg":"","data":{"timeBenefits":"http:\/\/pic4.nipic.com\/20091217\/3885730_124701000519_2.jpg","banner":[{"priority":0,"title":"测试一个","id":6,"url":"http:\/\/mall.55haitao.com\/","img":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg","status":"0000","rtype":"0000"},{"priority":0,"title":"趣游专区","id":7,"url":"http:\/\/sports.sina.com.cn\/nba\/","img":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/e24a7aa1da26b911.png","status":"0000","rtype":"0000"},{"priority":0,"title":"酒店banner1","id":8,"url":"http:\/\/sports.sina.com.cn\/nba\/","img":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg","status":"0000","rtype":"0001"},{"priority":0,"title":"酒店banner3","id":9,"url":"http:\/\/www.baidu.com","img":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/4cdbdb7209e2a99e.png","status":"0000","rtype":"0001"},{"priority":0,"title":"吃吃吃","id":10,"url":"http:\/\/map.baidu.com\/","img":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/4cdbdb7209e2a99e.png","status":"0000","rtype":"0001"},{"priority":1,"title":"测试哈","id":1,"url":"http:\/\/www.baidu.com","img":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg","status":"0000","rtype":"0000"}],"post_index":{"imgs":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg","id":8,"description":"大是大非多少发多少分"},"recomm_medias":[{"title":"买实惠","media":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/5e3b2e69a33def3e.pdf","id":21},{"title":"写两个","media":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/c3ed43537dd0e166.pdf","id":20},{"title":"测试一个","media":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/6b59b37d4908b061.pdf","id":19},{"title":"而特我","media":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/5e3b2e69a33def3e.pdf","id":17},{"title":"不那么","media":"http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/202e96c99c90788a.pdf","id":16}]},"code":0}
    // }
    // FETCH_EAT_POST_LIST:{
    //     fetching: 0,
    //     response: {"msg":"","data":{"count":9,"data":[{"headimg":"https:\/\/img.webmd.com\/dtmcms\/live\/webmd\/consumer_assets\/site_images\/articles\/health_tools\/lice_slideshow\/photolibrary_rm_photo_of_boy_scratching_head.jpg","imgs":["http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg"],"id":8,"status":"0001","update_dt":1510383278,"description":"大是大非多少发多少分","tour_area":"","rtype":"0000","nickname":"牧马人","create_dt":1510383278,"tour_project":"","comment_count":0,"is_like":0,"title":"","tour_cate":"","user_id":1,"share_count":0,"like_count":0},{"headimg":"https:\/\/img.webmd.com\/dtmcms\/live\/webmd\/consumer_assets\/site_images\/articles\/health_tools\/lice_slideshow\/photolibrary_rm_photo_of_boy_scratching_head.jpg","imgs":["'http:\/\/img.taopic.com\/uploads\/allimg\/120901\/219077-120Z121055762.jpg'","'http:\/\/img.taopic.com\/uploads\/allimg\/120901\/219077-120Z121055762.jpg'"],"id":3,"status":"0001","update_dt":0,"description":"写写写3","tour_area":"","rtype":"0000","nickname":"牧马人","create_dt":0,"tour_project":"","comment_count":0,"is_like":0,"title":"","tour_cate":"","user_id":1,"share_count":0,"like_count":0},{"headimg":"https:\/\/img.webmd.com\/dtmcms\/live\/webmd\/consumer_assets\/site_images\/articles\/health_tools\/lice_slideshow\/photolibrary_rm_photo_of_boy_scratching_head.jpg","imgs":["'http:\/\/img.taopic.com\/uploads\/allimg\/120901\/219077-120Z121055762.jpg'","'http:\/\/img.taopic.com\/uploads\/allimg\/120901\/219077-120Z121055762.jpg'"],"id":4,"status":"0001","update_dt":0,"description":"写写写4","tour_area":"","rtype":"0000","nickname":"牧马人","create_dt":0,"tour_project":"","comment_count":0,"is_like":0,"title":"","tour_cate":"","user_id":1,"share_count":0,"like_count":0},{"headimg":"https:\/\/img.webmd.com\/dtmcms\/live\/webmd\/consumer_assets\/site_images\/articles\/health_tools\/lice_slideshow\/photolibrary_rm_photo_of_boy_scratching_head.jpg","imgs":["http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/4cdbdb7209e2a99e.png"],"id":9,"status":"0000","update_dt":1510477738,"description":"三十","tour_area":"","rtype":"0000","nickname":"牧马人","create_dt":1510477738,"tour_project":"","comment_count":0,"is_like":0,"title":"的人","tour_cate":"","user_id":1,"share_count":0,"like_count":0},{"headimg":"https:\/\/img.webmd.com\/dtmcms\/live\/webmd\/consumer_assets\/site_images\/articles\/health_tools\/lice_slideshow\/photolibrary_rm_photo_of_boy_scratching_head.jpg","imgs":["http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg","http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/4cdbdb7209e2a99e.png"],"id":5,"status":"0000","update_dt":1510477716,"description":"写写写5","tour_area":"","rtype":"0000","nickname":"牧马人","create_dt":0,"tour_project":"","comment_count":0,"is_like":0,"title":"呃呃","tour_cate":"","user_id":1,"share_count":0,"like_count":0},{"headimg":"https:\/\/img.webmd.com\/dtmcms\/live\/webmd\/consumer_assets\/site_images\/articles\/health_tools\/lice_slideshow\/photolibrary_rm_photo_of_boy_scratching_head.jpg","imgs":["http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg"],"id":6,"status":"0000","update_dt":1510477710,"description":"写写写6","tour_area":"","rtype":"0000","nickname":"牧马人","create_dt":0,"tour_project":"","comment_count":0,"is_like":0,"title":"222 ","tour_cate":"","user_id":1,"share_count":0,"like_count":0},{"headimg":"https:\/\/img.webmd.com\/dtmcms\/live\/webmd\/consumer_assets\/site_images\/articles\/health_tools\/lice_slideshow\/photolibrary_rm_photo_of_boy_scratching_head.jpg","imgs":["http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg"],"id":2,"status":"0000","update_dt":1510477706,"description":"写写写1","tour_area":"","rtype":"0000","nickname":"牧马人","create_dt":0,"tour_project":"","comment_count":4,"is_like":0,"title":"纯纯粹粹","tour_cate":"","user_id":1,"share_count":0,"like_count":2},{"headimg":"https:\/\/img.webmd.com\/dtmcms\/live\/webmd\/consumer_assets\/site_images\/articles\/health_tools\/lice_slideshow\/photolibrary_rm_photo_of_boy_scratching_head.jpg","imgs":["http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg"],"id":1,"status":"0000","update_dt":1510477700,"description":"写写写2","tour_area":"","rtype":"0000","nickname":"牧马人","create_dt":0,"tour_project":"","comment_count":1,"is_like":1,"title":"吃吃吃","tour_cate":"","user_id":1,"share_count":0,"like_count":1},{"headimg":"https:\/\/img.webmd.com\/dtmcms\/live\/webmd\/consumer_assets\/site_images\/articles\/health_tools\/lice_slideshow\/photolibrary_rm_photo_of_boy_scratching_head.jpg","imgs":["http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/b1e1a745820f31be.jpg","http:\/\/sfmimg.b0.upaiyun.com\/prod_00\/ee88704eae9a12e4.jpg"],"id":7,"status":"0000","update_dt":1510477695,"description":"OK的","tour_area":"","rtype":"0000","nickname":"牧马人","create_dt":1510383260,"tour_project":"","comment_count":0,"is_like":0,"title":"得到的","tour_cate":"","user_id":1,"share_count":0,"like_count":0}]},"code":0}
    // }
}
export const PostList = (props) => {
    const { list, me } = props
    const { pathname } = _location
    return (
        <div className="list">
            {
                list.map((d={imgs:[]},i)=>(
                    <div key={i}>
                        <div className="item">
                            <div className="avatar-name">
                                <i className="icon" style={{backgroundImage:`url(${d.headimg})`}}></i>
                                <span>{d.nickname}</span>
                            </div>
                            <div className="content" onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}>{d.description}</div>
                            <div className="icon cover" onClick={me.openPage.bind(me,`${pathname}/${d.id}`)} style={{backgroundImage:`url(${d.imgs[0]})`}}>
                                {
                                    ~pathname.indexOf('video') ? <i className="icon play" style={{backgroundImage:`url(${play})`}} /> : null
                                }
                            </div>
                            <div className="dos">
                                <div className={classnames({do:true,active:d.is_like})} onClick={me.doGood.bind(this)}>
                                    <i className="icon good"></i>
                                    <span>{d.like_count}</span>
                                </div>
                                <div className="thin-border-verical"></div>
                                <div className="do" onClick={me.openPage.bind(me,`${pathname}/${d.id}`)}>
                                    <i className="icon comment"></i>
                                    <span>{d.comment_count}</span>
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