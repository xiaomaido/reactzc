import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../styles/quyou/quyou.scss'
export class Quyou extends Component{ // 公共模板
	openPage(url,e){ // 打开页面
		this.context.router.push(url)
	}
}
Quyou.contextTypes={
	router: PropTypes.object
}