import React, { Component } from 'react'
import Mobile from './Mobile'
import '../styles/normalize.css'
import '../styles/share.css'
import '../styles/basic.scss'

import initReactFastclick from 'react-fastclick'
initReactFastclick() // 手机端使用

import misc from '../vendors/misc'

class Index extends Component {
	constructor(props){
		super(props)
		this.state={
			requestStatus:1
		}
		window.misc=misc
	}
	// remLayOut(){ 
	//     const rootV=20
	//     const normalV=375
	//     const maxV=500;
	//     const docEl=document.documentElement
	//     const fontSizeSet=()=>{
	//         window.clientWidth=docEl.clientWidth
	//         clientWidth=(clientWidth>maxV)?maxV:clientWidth
	//         window.fontSize=rootV*(clientWidth/normalV)
	//         docEl.style.fontSize = fontSize+'px'
	//     }
	//     fontSizeSet()
	//     window.onload=window.onresize=fontSizeSet
	// }
	checkLogin(){
		misc.currentUser=JSON.parse(misc.getCookie('tk'))||{id:1}
		return misc.currentUser
	}
  	componentWillMount() {
  		// this.remLayOut() // 手机端使用
  		this.checkLogin()
  	}
	render(){
		const showLogin=()=>location.replace('http://www.weichongming.com/quanbao/mobile/signin/')
		const element=this.checkLogin().id?<Mobile key="app"/>:showLogin()
		return (<div>{element}</div>)
	}
}
export default Index