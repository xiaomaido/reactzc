import React from 'react'
import { Quyou } from './Quyou'
import '../../styles/quyou/yummydetail.scss'
export default class YummyDetail extends Quyou{
	render(){
        document.title='美食攻略'
		return (
			<div className="yummy-detail">
                详情
            </div>
		)
	}
}