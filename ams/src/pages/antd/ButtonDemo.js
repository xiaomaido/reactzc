import React from 'react'
import { AntD } from './AntD'
import { Button } from 'antd'
class ButtonDemo extends AntD{
	render(){
		return (
			<div style={{padding:10,height:1900}}> 
                <div style={{paddingBottom:10}}>
                    <Button type="primary">初始</Button>
                </div>
                <div style={{paddingBottom:10}}>
                    <Button>默认</Button>
                </div>
                <div style={{paddingBottom:10}}>
                    <Button type="dashed">虚线</Button>
                </div>
                <div style={{paddingBottom:10}}>
                    <Button type="danger">警告</Button>
                </div>
            </div>
		)
	}
}
export default ButtonDemo