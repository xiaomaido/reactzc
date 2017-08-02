import React, { Component } from 'react'
import { Base } from './Base'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"

class ContextMenuReact extends Base{
	handleClick(e, data) {
		console.log(JSON.stringify(data))
	}
	render(){
		const some_data="some_data"
		return (
		    <div>
				<ContextMenuTrigger id="some_unique_identifier">
					<div className="well">鼠标右击查看菜单选项</div>
				</ContextMenuTrigger>

				<ContextMenu id="some_unique_identifier">
					<MenuItem data={{some_data}} onClick={this.handleClick}>
						选项 1
					</MenuItem>
					<MenuItem data={{some_data}} onClick={this.handleClick}>
						选项 2
					</MenuItem>
					<MenuItem divider />
					<MenuItem data={{some_data}} onClick={this.handleClick}>
					    选项 3
					</MenuItem>
				</ContextMenu>
		    </div>
		)
	}
}
export default ContextMenuReact


		
 

 