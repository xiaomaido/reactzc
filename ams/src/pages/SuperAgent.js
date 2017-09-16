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
	componentDidMount(){
		// ES6 promises are supported. Instead of .end() you can call .then():
		request
			.get('http://www.subreddit.com/r/rockets.json')
			.retry() // the default is 1 times.
			// .retry(2) // set the maximum number of times to retry when failed 
			.then((res)=>{
				if(res&&res.ok){
					const rockets=res.body
					console.log('rockets '+Object.keys(rockets).join(' '))
				}else{

				}
			},(err)=>{

			})
		request
			.get('http://www.subreddit.com/r/nba.json')
			.end((err,res)=>{
				if(err||!res||!res.ok){
					console.warn(err)
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
				if(err||!res||!res.ok){
					console.warn(err)
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
