import React, { Component } from 'react'

// 展示型组件
export default class Picker extends Component{
	render(){
		let _props=this.props
		let style={
			padding: '20px 0'
		}
		return (
			<div style={style}>
		        <span>请选择新闻版块：</span>
		        <select onChange={_props.selectChange} value={_props.selectValue}>
					{
						_props.selectOptions.map((d)=>(<option value={d.id} key={d.id}>{d.name}</option>))
					}
		        </select>
		    </div>
		)
	}
}