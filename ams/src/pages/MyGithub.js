import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Base } from './Base'
import { requestUserIfNeed } from '../actions'
import Loading from '../components/Loading'

class MyGithub extends Base{
	constructor(props) {
	    super(props)
	}
	render(){
		const { user } = this.props
		return (
			<div style={{'padding':10}}>
				{
					user&&user.login?(
						<div>
							<img style={{'width':100,'height':100}} src={user.avatar_url} />
							<div>{user.login}</div>
							<div>{user.name} @{user.location}</div>
							<div>公开代码库：{user.public_repos}</div>
							<div>加入时间：{user.created_at}</div>
						</div>
					 ):<Loading key="loading" />
				}
			</div>
		)
	}
	componentWillMount(){
		const { requestUserIfNeed } = this.props
		requestUserIfNeed('users/xiaomaido')
	}
}
const mapStateToProps=(state)=>{
	const { user } = state
	
	return {
		user
	}	

}
const mapDispatchToProps={
	requestUserIfNeed,
}
export default connect(mapStateToProps,mapDispatchToProps)(MyGithub)
