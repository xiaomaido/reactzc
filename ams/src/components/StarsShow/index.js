import React, { Component } from 'react'
import './index.css'
export default class StarsShow extends Component {
	render(){
		const { star, number = 5 } = this.props
		const length = Math.floor(number)
		const ds = Array.apply(null, { length })
		return (
			<div className="stars-show">
				{
					ds.map((d, i)=> <div key={i} ><img src={star} /></div>)
				}
				{
					(number - length) >= 0.5 ? <div className="half"><img src={star} /></div> : null
				}
	        </div>
		)
	}
}
