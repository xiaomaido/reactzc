import { connect } from 'react-redux'
import React, { Component } from 'react'
import { requestRepoIfNeed, requestStargazersIfNeed } from '../actions'
import Repo from '../components/Repo'
import UserList from '../components/UserList'

const requestData=(props)=>{
	const { fullName, requestRepoIfNeed, requestStargazersIfNeed } = props
	//根据全名查询用户，只需要请求name字段
	requestRepoIfNeed(fullName,['description'])
	requestStargazersIfNeed(fullName)
}
const mapStateToProps=(state)=>{
	const { login, repository } = state.router.params
	const fullName=`${login}/${repository}`
	const { 
		paginations: { stargazersByRepo }
		,entities:{ users, repos }
	} = state
    const repo=repos[fullName]
    const owner=users[login]
  	const stargazersPagination=stargazersByRepo[fullName]||{ids:[]}
    const stargazers=stargazersPagination.ids.map(id=>users[id])
	return {
		repository
		,fullName
		,repo
		,owner
		,stargazersPagination
		,stargazers
	}
}
const mapDispatchToProps={
	requestRepoIfNeed
	,requestStargazersIfNeed
}
class RepoInfo extends Component{
	constructor(props) {
    	super(props)
		this.handleLoadMore=this.handleLoadMore.bind(this)
	}
	componentWillMount(){
		requestData(this.props)
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.fullName!==this.props.fullName){
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
		const { repo } = this.props
		if(!repo){
			return (
				<div>
					<img src="http://www.weichongming.com/quanbao/static/assets/images/mobile/loading.jpg" style={style1} />
					<span style={style2}>仓库信息加载中...</span>
				</div>
			)
		}
		const { owner } = this.props
		const { stargazersPagination, stargazers } = this.props
		console.log(stargazersPagination)
		return (
			<div>
				<ul>
                	<Repo repo={repo} owner={owner} />
                </ul>
       			--------- 我是分割线 ----------
				<br/>
				<UserList handleLoadMore={this.handleLoadMore} items={stargazers} {...stargazersPagination} /> 
			</div>
		)
	}
	handleLoadMore(e){
    	e.preventDefault()
    	const { fullName, requestStargazersIfNeed } =this.props
		requestStargazersIfNeed(fullName,true)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(RepoInfo)
