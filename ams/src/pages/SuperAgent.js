import React, { Component } from 'react'
import request from 'superagent'

class SuperAgent extends Component{
	constructor(props){
		super(props)
		this.state={
			reddit:{},
			userinfo:{},
		}
	}
	componentWillMount(){
		request
			.get('http://www.subreddit.com/r/nba.json')
			.end((err,res)=>{
				if(err||!res){

				}else{
					const reddit=res.body
					this.setState({
						reddit
					})
				}
			})
		
		request
			.post('http://api.shoufumai.net:3200/api/user/get_user_info')
			.send({ })
   			.withCredentials() // 这个可以运行该http请求跨子域名设置cookie
    		.set('Content-Type', 'application/json')
			.end((err,res)=>{
				if(err||!res){

				}else{
					const userinfo=res.body
					this.setState({
						userinfo
					})
				}
			})
	}
	render(){
		const { reddit,userinfo } = this.state
		return (
			<div style={{ padding: 10 }}>
				<div> SuperAgent</div>
				<div> {Object.keys(reddit).join(' ')} </div>
				<div> {Object.keys(userinfo).join(' ')} </div>
			</div>
		)
	}
}
export default SuperAgent
