import React, { Component } from 'react'
import misc from '../vendors/misc'
import App from './App'
import Loading from '../components/Loading'
import '../styles/normalize.css'
import '../styles/share.css'
import '../styles/basic.scss'

import initReactFastclick from 'react-fastclick'
initReactFastclick()


class Index extends Component {
	constructor(props){
		super(props)
		window.misc=misc
		this.state={
			requestStatus:0
		}
		this.requestStatus=0 // 0:请求中，1:成功，2:失败
  		this.requestStatus=1
	}
	remLayOut(){
	    const rootV=20
	    const normalV=375
	    const maxV=500;
	    const docEl=document.documentElement
	    const fontSizeSet=()=>{
	        window.clientWidth=docEl.clientWidth
	        clientWidth=(clientWidth>maxV)?maxV:clientWidth
	        window.fontSize=rootV*(clientWidth/normalV)
	        docEl.style.fontSize = fontSize+'px'
	    }
	    fontSizeSet()
	    window.onload=window.onresize=fontSizeSet
	}
	checkLogin(){
		misc.currentUser=JSON.parse(misc.getCookie('payload'))
		return misc.currentUser
	}
  	componentWillMount() {
  		this.remLayOut()
  		this.checkLogin()
  	}
	render(){
  		const showApp=()=><App key="app"/>
		const showLoading=()=><Loading key="loading" />
		const showLogin=()=>location.replace('http://aff.shoplooks.com:8080/templates/signin/')
		const element=this.checkLogin()?(this.requestStatus?showApp():showLoading()):showLogin()
		return (<div>{element}</div>)
	}
}
export default Index