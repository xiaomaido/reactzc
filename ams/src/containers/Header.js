import React, { Component } from 'react'
import '../styles/containers/header.scss'
class Header extends Component{
	render(){
		return (
			<div className="header">
				<div className="fright account">
					<span>管理员：</span>
					toury
					<span className="arrow-up"></span>
				</div>
				<div className="icon logo fleft"></div>
				<div className="name fleft">运营后台管理系统</div>
				<div className="version fleft">V1.0</div>
			</div>
		)
	}
}
export default Header