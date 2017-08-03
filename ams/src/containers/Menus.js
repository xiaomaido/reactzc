import React, { Component } from 'react'
import '../styles/containers/menus.scss'
import idashboard from '../images/icon/idashboard.png'
import iuser from '../images/icon/iuser.png'
// import {Link} from 'react-router'

const _rootNodeName="LI"
const _subshow="subshow"
const _javascript="javascript:;"

class Submenus extends Component{
	render(){
		const { ds } = this.props
		return ds.length?(
			<div className="submenus">
				{
					ds.map((d,i)=><a key={i} href={(('#'+d.url))} className={d.url==location.pathname?"active":null} onClick={e=>{e.stopPropagation()}} >{d.name}</a>)
					// ds.map((d,i)=><Link key={i} to={d.url} className={d.url==location.pathname?"active":null} onClick={e=>{e.stopPropagation()}} >{d.name}</Link>)
				}
			</div>
		):null
	}
}
class Menu extends Component{
	constructor(props){
		super(props)
		this.handleClickLi=this.handleClickLi.bind(this)
	}
	getRootNode(_node,_rootNodeName){
		let node=_node
	    while(node) {
	        if (node.nodeName===_rootNodeName) {
	            return node
	        }
	        node=node.parentNode;
	    }
	    return null
	}
	handleClickLi(e){
		const rootNode=(e.target.nodeName==_rootNodeName)?e.target:this.getRootNode(e.target,_rootNodeName)
		this.handleFoldMenu(rootNode,e)
	}
	handleFoldMenu(node,e){
		if(~node.className.indexOf(_subshow)) {
			if(node.firstElementChild.href==_javascript){
				node.className=""
			}
		}else{
			node.className=_subshow
		}
	}
	render(){
		const { d,i } = this.props
		const subshow=d.url==location.pathname?_subshow:(menusMapRoute[i].submenus.filter(d=>d.url==location.pathname).length?_subshow:null)
		return (
			<li className={subshow} onClick={this.handleClickLi} >
				<a href={('#'+d.url)||"javascript:;"} className={d.url==location.pathname?"menu active":"menu"}>
					<div className="icon" style={{ backgroundImage: 'url('+d.icon+')' }}></div>
					<div className="name">{d.name}</div>
					{
						d.submenus.length?<div className="arrow-up"></div>:null
					}
				</a>
				<Submenus ds={d.submenus} />
			</li>
		)
	}
}
class Menus extends Component{
	render(){
		const { ds } = this.props
		return (
			<ul className="menus">
				{
					ds.map((d,i)=><Menu key={i} d={d} i={i}/>)
				}
			</ul>
		)
		// return (
		// 	<ul className="menus">
		// 		<li className="">
		// 			<a href="/" className="menu active">
		// 				<div className="icon" style={{ backgroundImage: 'url('+idashboard+')' }}></div>
		// 				<div className="name">工作概览</div>
		// 			</a>
		// 		</li>
		// 		<li>
		// 			<div className="menu">
		// 				<div className="icon" style={{ backgroundImage: 'url('+iuser+')' }}></div>
		// 				<div className="name">活动管理</div>
		// 				<div className="arrow-up"></div>
		// 			</div>
		// 		</li>
		// 		<li className="subshow">
		// 			<div className="menu">
		// 				<div className="icon" style={{ backgroundImage: 'url('+iuser+')' }}></div>
		// 				<div className="name">用户管理</div>
		// 				<div className="arrow-up"></div>
		// 			</div>
		// 			<div className="submenus">
		// 				<a href="/users">用户列表</a>
		// 				<a href="/products" className="active">商品列表</a>
		// 				<a>用户积分</a>
		// 			</div>
		// 		</li>
		// 		<li>
		// 			<div className="menu">
		// 				<div className="icon" style={{ backgroundImage: 'url('+idashboard+')' }}></div>
		// 				<div className="name">笔记管理</div>
		// 				<div className="arrow-up"></div>
		// 			</div>
		// 		</li>
		// 	</ul>
		// )
	}
}
export default Menus