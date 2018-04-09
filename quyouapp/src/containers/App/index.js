import React, { Component } from 'react'
import './index.css'
import Panel from '../Panel'
import misc from '../../utils/misc'

class Index extends Component {
    constructor(props){
        super(props)
        this.state={
            requestStatus:1
        }
        window.misc=misc
    }
    
    render(){
        const showLogin=()=>window.location.replace('http://www.weichongming.com/quanbao/mobile/signin/')
        const element=this.checkLogin().id?<Panel key="app"/>:showLogin()
        return (<div>{element}</div>)
    }
  	componentWillMount() {
  		this.remLayOut() // 手机端使用
  		this.checkLogin()
  	}
    remLayOut(){ 
	    const rootV=20
	    const normalV=375
	    const maxV=500;
	    const docEl=document.documentElement
	    const fontSizeSet=()=>{
	        let clientWidth=docEl.clientWidth
	        clientWidth=(clientWidth>maxV)?maxV:clientWidth
	        window.fontSize=rootV*(clientWidth/normalV)
	        docEl.style.fontSize=window.fontSize+'px'
	    }
        window.onload=window.onresize=fontSizeSet
	    fontSizeSet()
    }
    checkLogin(){
        misc.currentUser=JSON.parse(misc.getCookie('tk'))||{id:1}
        return misc.currentUser
    }
}

export default Index
