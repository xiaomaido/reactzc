import React from 'react'
import { Base } from './Base'
import '../styles/weizhi/iconfont.css'

class Sellers extends Base{
	render(){
		return (
			<div style={{ padding:30 }}> 
				<div>Sellers</div>
				<i className="iconfont icon-weizhi" style={{ color:'#e37d3f',fontSize:'30px'}}></i>
				<i className="iconfont icon-weizhi1" style={{ color:'#e37d3f',fontSize:'30px'}}></i>
				<i className="iconfont icon-weizhi2" style={{ color:'#e37d3f',fontSize:'30px'}}></i>
			</div>
		)
	}
}
export default Sellers