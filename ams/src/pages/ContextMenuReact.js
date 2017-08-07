import React, { Component } from 'react'
import { Base } from './Base'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"



class ContextMenuReact extends Base{
	handleClick(e, data) {
		alert(JSON.stringify(data))
	}
	render(){
		const some_data="some_data"
		return (
		    <div>
				<ContextMenuTrigger id="some_unique_identifier">
					<div style={{padding:'10px'}} className="well">鼠标右击查看菜单</div>
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
				<a style={{padding:'10px',color:'#999'}} target="_blank" href="https://www.npmjs.com/package/react-contextmenu">了解更多react-contextmenu</a>
		    </div>
		)
	}
}
export default ContextMenuReact


// api用法
// https://github.com/vkbansal/react-contextmenu/blob/HEAD/docs/api.md
// https://www.npmjs.com/package/react-contextmenu


// Property	Type	Required?	Default	Description
// id	String	✓		The unique identifier of the menu to be called.
// attributes	Object			The attributes will be passed directly passed to the root element of component. Use this to customize it like adding custom classes, adding colspan etc.
// collect	Function			A simple function which takes props as input and returns the data to be passed to contextmenu.
// disable	Boolean		false	Prop to ignore right clicks and display the default browser context menu.
// holdToDisplay	Number		1000	This is applicable only for touch screens. The time (in ms) for which, user has to hold down his/her finger before the menu is shown. Note: To disable the long press trigger on left-click just set a negative holdToDisplay value such as -1
// renderTag	String or React Element			The element inside which the Component must be wrapped. By default div is used. But this prop can used to customize it.

 