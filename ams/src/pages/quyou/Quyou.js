import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Mask from '../../components/Mask/'
import CreateComment from '../../components/CreateComment/'
import Sign from '../../components/Sign/'
import Spin from '../../components/Spin/'
window.Mask=Mask
window.CreateComment=CreateComment
window.Sign=Sign
window.Spin=Spin

export class Quyou extends Component{ // 公共模板
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
}
Quyou.contextTypes={
	router: PropTypes.object
}
window.Quyou=Quyou

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