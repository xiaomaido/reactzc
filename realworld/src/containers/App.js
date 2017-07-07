import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import React, { Component } from 'react'
import ExploreArea from '../components/ExploreArea'
import TouchSlideBox from '../partials/TouchSlideBox'
import LazyLoad from 'react-lazyload';
import echo from '../vendors/echo'

import '../styles/share.scss'
import '../styles/app.scss'

import waitingImg from '../images/waiting.jpg'
import izhaocaiImg from '../images/izhaocai.png'
import icloseImg from '../images/iclose.png'

import initReactFastclick from 'react-fastclick'
initReactFastclick()

const izhaocaiStyle={
	marginLeft:'15px',
	marginRight:'15px',
 	backgroundImage: 'url(' + icloseImg + ')'
}
const imgSlideList=[
	'http://aff.shoplooks.com:8080/static/images/module/invitation/sample1_en.jpg'
	,'http://aff.shoplooks.com:8080/static/images/module/invitation/sample2_en.jpg'
	,'http://aff.shoplooks.com:8080/static/images/module/invitation/sample3_en.jpg'
]

class App extends Component{
	constructor(props){
		super(props)
		this.handleChange=this.handleChange.bind(this)
		this.handleClear=this.handleClear.bind(this)
	}
	render(){
		const { keyword,children } = this.props //调用children就是加载子路由里面的组件
		return (
			<div className="maxWidth marginAuto">
				<h1>Real World</h1>
				<div>
					<img className="fleft" src={izhaocaiImg} />
					<div className="fleft icon izhaocai" style={izhaocaiStyle}></div>
					<img className="fleft waiting" src={waitingImg} />
				</div>
				<br className="clearBoth"/>
				<hr className="clearBoth" />
				<TouchSlideBox imgSlideList={imgSlideList}/>
				<br className="clearBoth"/>
				<hr className="clearBoth" />
				<div>
					<img width="100%" src="http://st-prod.b0.upaiyun.com/zeus/2017/06/13/aa0f9e895d3931572c5db54c5dbbf2c9!/format/jpg" />
					<img width="100%" data-echo="http://st-prod.b0.upaiyun.com/zeus/2017/06/07/f79a51a49e85c0caeb5011e31ae9070a!/format/jpg" />
					<div style={{width:'100%',height:'230px'}} className="icon" data-echo-background="http://st-prod.b0.upaiyun.com/zeus/2017/06/13/a2751f74a31f0fc23793cfe146761458!/format/jpg"></div>
					<LazyLoad height={230} offset={100}>
				    	<img width="100%" src="https://st-prod.b0.upaiyun.com/prodimage/23dc14a654954e71.jpg!/fh/750" />
				    </LazyLoad>
				</div>
				<br className="clearBoth"/>
				<hr className="clearBoth" />
				<LazyLoad once>
			    	<ol>
			    		<li></li>
			    		<li></li>
			    		<li></li>
			    		<li></li>
			    		<li></li>
			    		<li></li>
			    		<li></li>
			    		<li></li>
			    		<li></li>
			    		<li></li>
			    		<li></li>
			    	</ol>
			    </LazyLoad>
				<ExploreArea keyword={keyword} handleChange={this.handleChange}/>
				{children}
			</div>
		)
	}
	componentDidMount(){
		const { echo } = this.props 
		echo.init({
		    offset: 0, 
		    throttle: 0 
		})
	}
	componentDidUpdate(){
		debugger
	}
	handleChange(nextKeyword){
		this.props.pushState(null,`/${nextKeyword}`)
	}
	handleClear(e){
    	e.preventDefault()
	}
}

const mapStateToProps=(state)=>{
	// 搜索keyword=p可以看到如需翻页（loadmore加载更多）的数据
	// /xiaomaido 搜索我给星Starred的项目
	// /xiaomaido/reactzc 搜索我创建Created的项目
	return {
	    keyword: state.router.location.pathname.substring(1)
		,echo:echo
	}
}
const mapDispatchToProps={
	pushState
}
// [mapDispatchToProps可以是(Object or Function)
// const mapDispatchToProps=(dispatch)=>{
//   	return bindActionCreators(Actions, dispatch)
// }
// export default connect(mapStateToProps)(App) // 不定义mapDispatchToProps，会自动注入dispatch函数，定义了的话就，this.props就不会有dispatch函数
export default connect(mapStateToProps,mapDispatchToProps)(App)

