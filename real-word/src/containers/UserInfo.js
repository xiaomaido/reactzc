import { connect } from 'react-redux'
import React, { Component } from 'react'
import User from '../components/User'
import RepoList from '../components/RepoList'
import { requestUserIfNeed,requestStarredIfNeed } from '../actions'
import zip from 'lodash/array/zip'

const requestData=(props)=>{
	const { login, requestUserIfNeed, requestStarredIfNeed } = props
	//根据登录名查询用户，只需要请求name字段
	requestUserIfNeed(login,['name'])
	requestStarredIfNeed(login)
}
const mapStateToProps=(state)=>{
	// 因为返回的结果范式化过，可以理解为的table in database或者class in leancloud
	// users 是查询到的所有用户
	// repos 是查询到的所有项目 （
	// 比如：登录名login为xiaomaido
	// starredByUser[login] 是查询xiaomaido打星过的
	// starredRepos 是该用户打星过的repo
	// starredRepoOwners 是该用户打星过的repo的owner用户
	
	const { login } = state.router.params
	const { 
		paginations: { starredByUser }
		,entities:{ users, repos }
	} = state
	const user=users[login]
  	const starredPagination=starredByUser[login]||{ids:[]}
    const starredRepos=starredPagination.ids.map(id=>repos[id])
    const starredRepoOwners=starredRepos.map(repo=>users[repo.owner])
	return {
		login
		,user
		,starredRepos
    	,starredRepoOwners
    	,starredPagination
	}	

}
const mapDispatchToProps={
	requestUserIfNeed
	,requestStarredIfNeed
}
class UserInfo extends Component{
	handleLoadMore(e){
    	e.preventDefault()
    	const { login, requestStarredIfNeed } =this.props
		requestStarredIfNeed(login,true)
	}
	constructor(props){
    	super(props)
		this.handleLoadMore=this.handleLoadMore.bind(this)
	}
	// React组件生命周期的10个API
	// getDefaultProps
	// getInitialState
	// componentWillMount
	// render
	// componentDidMount
	// componentWillReceiveProps
	// shouldComponentUpdate
	// componentWillUpdate
	// render
	// componentDidUpdate
	// componentUnmount

	componentWillMount(){
		requestData(this.props)
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.login!==this.props.login){
			requestData(nextProps)
		}
	}
	render(){
		let style1={
			float:'left'
		}
		let style2={
			float:'left',
			lineHeight:'66px'
		}
		const { user } = this.props
		if(!user){
			return (
				<div>
					<img src="http://www.weichongming.com/quanbao/static/assets/images/mobile/loading.jpg" style={style1} />
					<span style={style2}>用户信息加载中...</span>
				</div>
			)
		}
		const { starredPagination, starredRepos, starredRepoOwners } = this.props
		console.log(starredPagination)
		return (
			<div>
				<ul>
					<User user={user}></User>
				</ul>
       			--------- 我是分割线 ----------
				<br/>
				<RepoList handleLoadMore={this.handleLoadMore} items={zip(starredRepos,starredRepoOwners)} {...starredPagination} /> 
			</div>
		)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)
