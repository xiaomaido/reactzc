import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Quyou extends Component{ // 公共模板
	componentWillMount(){
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