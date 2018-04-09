import React, { Component } from 'react'
import '../styles/quyou/mobilepanel.scss'
import TitleBar from '../components/TitleBar/'
import NavListBox from '../components/NavListBox/'
export default class MobilePanel extends Component{
	render(){
		const { children, location } = this.props //调用children就是加载子路由里面的组件
		const arr = ['/','/hotel','/trip','/mall','/my'] // 导航路由
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
		const objTitleNotNeed= { // 不需要标题条对应的路由
			'/signin': true,
		}
		const objTitleBack = { // 标题条返回对应的路由
			'/foodhot':arr[0],
			'/shophot':arr[0],
			'/seasonhot':arr[0],
			'/posthot':arr[0],
			'/videohot':arr[0],
			'/xianshifuli':arr[0],
			'/hotelhot':arr[1],
			'/triphot':arr[2],
			'/busline':arr[2],
			'/guidance':arr[2],
            '/guidance2':arr[2],
			'/query':arr[2],
			'/guidancedetail':arr[2],
			'/mallfuli':arr[3],
			'/myprofile':arr[4],
			'/mycoupons':arr[4],
			'/myfollows':arr[4],
			'/mymsg':arr[4],
            '/agricultural':arr[3],
		}
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
					activeUrl ? <NavListBox activeNav={arrNav.find(d=>d.url===activeUrl).nav} arrNav={arrNav} /> : null 
				}
				{/* <SelectBox /> */}
				{
					!activeUrl && !objTitleNotNeed[location.pathname] ? <TitleBar location={location} objTitleBack={objTitleBack}/> : null 
				}
				{
					children
				} 
			</div>
		)
	}
}