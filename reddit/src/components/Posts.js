import React, { Component } from 'react'

// 展示型组件
export default class Posts extends Component{
	render(){
		let _props=this.props
		return (
			<ol>
			{
				_props.items.map((d,i) => (<li key={i}><a href={d.url} target="_blank">{d.title}</a></li>))
			}
		    </ol>
		)
	}
}