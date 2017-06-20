import React, { Component } from 'react'
import { Link } from 'react-router'

const avatarImg = require('../images/logo.png')

export default class User extends Component{
	constructor(props){
		super(props)
		this.loadImageError=this.loadImageError.bind(this)
	}
	render(){
   	 	const { login, avatarUrl, name } = this.props.user
   	 	// 用Link组件新开一个tab页面
   	 	// 如果没有target="_blank"会报错，因为组建里面的路由必须是：A path must be pathname + search + hash only, not a fully qualified URL like "https://github.com/xiaomaido"
        		// <Link target="_blank" to={`https://github.com/${login}`}>
		return (
			<li className="User" key="{name}"> 
        		<Link target="_blank" to={`/${login}`}>
					<img src={avatarUrl} onError={this.loadImageError} width="50" height="50" />
          			<h3>{login} { name && <span>({name})</span> }</h3>
        		</Link>
			</li>
		)
	}
	loadImageError(e){
		e.target.src=avatarImg
	}
}