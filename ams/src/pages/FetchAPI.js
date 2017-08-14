import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

class FetchAPI extends Component{
	constructor(props){
		super(props)
		this.state={
			reddit:{},
			userinfo:{},
		}
	}
	componentWillMount(){
		const subreddit='rockets'
		this.requestAPI(`http://www.subreddit.com/r/${subreddit}.json`)
			.then((reddit)=>{
				this.setState({
					reddit
				})
			})
		// this.requestAPI(`http://api.shoufumai.net:3200/api/user/get_user_info`,{})
		// 	.then((userinfo)=>{
		// 		debugger
		// 		// this.setState({
		// 		// 	reddit
		// 		// })
		// 	})
	}
	render(){
		const { reddit,userinfo } = this.state
		return (
			<div style={{ padding: 10 }}>
				<div> FetchAPI</div>
				<div> {Object.keys(reddit).join(' ')} </div>
				<div> {Object.keys(userinfo).join(' ')} </div>
			</div>
		)
	}
	requestAPI(url,data){
		// https://github.com/github/fetch 官方文档
		return fetch(url)
				.then(response=>response.json().then(json => ({ json, response })))
				.then(({ json, response }) => {
			    	if (!response.ok) {
			        	return Promise.reject(json)
			      	}
			    	return Object.assign({},json)
			    })
			    .catch(function(ex) {
					console.warn(ex)
				})
		// return fetch(url)
		// 		.then(response=>response.json())
		// 		.then((json) => {
		// 	    	debugger
		// 	    	return Object.assign({},json)
		// 	    })
		// return fetch(url,{
		// 			method: 'POST',
		// 			headers: {            
		// 	            "Content-Type": "application/json",
		// 	            "credentials": 'include'
		// 	        },     
  //       			body: JSON.stringify(data) 
		// 		})
		// 		.then(response=>response.json().then(json => ({ json, response })))
		// 		.then(({ json, response }) => {
		// 	    	if (!response.ok) {
		// 	        	return Promise.reject(json)
		// 	      	}
		// 	    	return Object.assign({},json)
		// 	    })
		// 		.catch(function(ex) {
		// 			console.warn(ex)
		// 		})
	}
}
export default FetchAPI
