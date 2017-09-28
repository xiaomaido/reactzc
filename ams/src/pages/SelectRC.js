import React, { Component } from 'react'
import Select, { Option } from 'rc-select'
import 'rc-select/assets/index.css'

class SelectRC extends Component{
	
	constructor(props){
		super(props)
		this.state = {
		    destroy: false,
		    value: '9',
		    array: ['1','2', '3', '4', '5', '6', '7', '8', '9']
		}
		this.onChange = (e) => {
			let value;
			if (e && e.target) {
				value = e.target.value;
			} else {
			  	value = e;
			}
			console.log('onChange', value);
			this.setState({
				value,
			})
		};

		this.onDestroy = () => {
			this.setState({
				destroy: 1,
			});
		};

		this.onBlur = (v) => {
			console.log('onBlur', v);
		};

		this.onFocus = () => {
			console.log('onFocus');
		};
	}

	render() {
		if (this.state.destroy) {
		  return null;
		}
		return (
			<div style={{ height: 150,padding:40 }} >
				<h2>插件下拉</h2>
				<div style={{ width: 300 }}>
					<Select
					    value={this.state.value}
					    placeholder="placeholder"
					    style={{ width: 500 }}
					    allowClear
					    dropdownMenuStyle={{ maxHeight: 200, overflow: 'auto' }}
					    optionLabelProp="children"
					    optionFilterProp="text"
					    onBlur={this.onBlur}
					    onFocus={this.onFocus}
					    onChange={this.onChange} >
					    <Option value="01" text="jack" title="jack">
					      	<b style={{ color: 'red' }}>jack</b>
					    </Option>
					    <Option value="11" text="lucy">lucy</Option>
					    <Option value="21" disabled text="disabled">disabled</Option>
					    <Option value="31" text="yiminghe">yiminghe</Option>
					    {
					    	this.state.array.map((i) => {
					    		return <Option key={i} text={i}>{i}</Option>
					    	})
					    }
					</Select>
				</div>

				<h2>普通下拉</h2>
				<select
				  value={this.state.value}
				  style={{ width: 500 }}
				  onChange={this.onChange} >
					<option value="01">jack</option>
					<option value="11">lucy</option>
					<option value="21" disabled>disabled</option>
					<option value="31">yiminghe</option>
					{
						this.state.array.map((i) => {
							return <option key={i} value={i}>{i}</option>
						})
					}
				</select>
				<p style={{ margin: '10px 0' }}>
				  	<button onClick={this.onDestroy}>移除</button>
				</p>
			</div>
		)
	}
}

export default SelectRC

