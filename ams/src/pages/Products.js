import React, { Component } from 'react'
import { Base } from './Base'

class Products extends Base{
	constructor (props) {
		super(props);
		this.state = Object.assign({},props);
	}
	openProduct(e){
		// 点击跳转路由，打开商品详情页面
		this.context.router.push('/product')
	}
	render(){
		return (
			<div style={{'padding':20}} onClick={this.openProduct.bind(this)}> 点我进入Product页面 </div>
		)
	}
}
Products.contextTypes={
	router: React.PropTypes.object
}
export default Products


		
 

 