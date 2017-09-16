import React, { Component } from 'react'
import axios from 'axios'

class Axios extends Component{
	constructor(props){
		super(props)
		this.state={
			reddit:{},
			userinfo:{},
		}
	}
	componentDidMount(){
		axios
		.get('/http://www.subreddit.com/r/rockets.json')
		.then(function (res) {
			if(res&&res.ok){
				const rockets=res.body
				console.log('rockets '+Object.keys(rockets).join(' '))
			}else{

			}
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	render(){
		const { reddit,userinfo } = this.state
		return (
			<div style={{ padding: 10 }}>
				<div> Axios</div>
				<div> {Object.keys(reddit).join(' ')} </div>
				<div> {Object.keys(userinfo).join(' ')} </div>
			</div>
		)
	}
}
export default Axios