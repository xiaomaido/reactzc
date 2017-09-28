import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn') // 推荐在入口文件全局设置 locale

import { DatePicker, Radio } from 'antd'
const { MonthPicker, RangePicker } = DatePicker
const dateTimeFormat = 'YYYY/MM/DD HH:mm:SS'
const dateFormat = 'YYYY/MM/DD'
const monthFormat = 'YYYY/MM'
class DatePickerDemo extends Component{
	render(){
		const onChange=(moment, date)=>{
			console.log(moment, '\n', date)
		}
		return (
			<div style={{padding:10}}> 
                <div style={{paddingBottom:10}}><DatePicker onChange={onChange} size={"large"} /></div>
                <div style={{paddingBottom:10}}><DatePicker onChange={onChange} defaultValue={moment('2018-01-01', 'YYYY-MM-DD')} /></div>
                <div style={{paddingBottom:10}}><DatePicker onChange={onChange} defaultValue={moment('2018-01-01')} format={dateFormat} size={"small"} /></div>
                <div style={{paddingBottom:10}}><MonthPicker onChange={onChange} placeholder="请选择月份" /></div>
                <div style={{paddingBottom:10,width:280}}><RangePicker onChange={onChange}  /></div>
                <div style={{paddingBottom:10,width:280}}>
					<RangePicker
						defaultValue={[moment('2017/10/01', dateFormat), moment('2017/10/31', dateFormat)]}
						format={dateFormat}
					/>
				</div>
				<div style={{paddingBottom:10}}>
					<Radio.Group value={"large"} onChange={this.handleSizeChange}>
						<Radio.Button value="large">Large</Radio.Button>
						<Radio.Button value="default">Default</Radio.Button>
						<Radio.Button value="small">Small</Radio.Button>
					</Radio.Group>
				</div>
            </div>
		)
	}
	handleSizeChange(e) {
		alert(JSON.stringify({ size: e.target.value }))
	}
	
}
export default DatePickerDemo

