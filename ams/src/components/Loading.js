import React, { Component } from 'react'
import loading from '../images/share/loading.gif'
class Loading extends Component {
	render(){
		let { text }=this.props
		text=text||'加载中...'
		return (
			<div className="loading">
				<img src={loading} />
				<div>{ text }</div>
			</div>
		)
	}
}
export default Loading
