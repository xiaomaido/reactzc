import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/quyou/mobilepanel.scss'
import NavListBox from '../components/NavListBox/'
class MobilePanel extends Component{
	render(){
		const { children, location } = this.props //调用children就是加载子路由里面的组件
		const arr = ['/eat','/hotel','/trip','/mall','/my'] // 导航路由
		const arrNav = [ // 导航对路由配置数组
			{
			   url:arr[0],
			   nav:'chi',
			   name:'吃',
			},
			{
				url:arr[1],
				nav:'zhu',
				name:'住',
			 },
			 {
				url:arr[2],
				nav:'you',
				name:'游',
			 },
			 {
				url:arr[3],
				nav:'gou',
				name:'购',
			 },
			 {
				url:arr[4],
				nav:'wo',
				name:'我',
			 },
		]
		const objNav = { // 额外的导航需要显示对应的模块
			// '/foodhot':arr[0],
		}
		arr.map(d=>{
			objNav[d]=d
		})
		const activeUrl = objNav[location.pathname]
		return (
			<div className="mobile-panel">
				{ 
					activeUrl ? <NavListBox activeNav={arrNav.find(d=>d.url===activeUrl).nav} arrNav={arrNav}/> : null 
				}
				{
					children
				} 
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
	return {
	    keyword: state.routing.locationBeforeTransitions.pathname.substring(1) 
	}
}
export default connect(mapStateToProps)(MobilePanel)
