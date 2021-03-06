import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import React, { Component } from 'react'
import ExploreArea from '../components/ExploreArea'
class App extends Component{
	constructor(props){
		super(props)
		this.handleChange=this.handleChange.bind(this)
		this.handleClear=this.handleClear.bind(this)
	}
	render(){
		const { keyword,children } = this.props //调用children就是加载子路由里面的组件  
		return (
			<div>
				<h1>Real World</h1>
				<hr />
				<ExploreArea keyword={keyword} handleChange={this.handleChange}/>
				{children}
			</div>
		)
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

