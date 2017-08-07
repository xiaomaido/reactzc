import React, { Component } from 'react'
import Draggable from 'react-draggable'

class DraggableReact extends Component{

	handleStart(e) {
		console.log('Start')
	}
	handleDrag(e) {
		console.log('Draging')
	}
	handleStop(e) {
		console.log('Stop')
	}
	handleEnter(e){
		console.log('Enter')
	}
	handleOver(e){
		console.log('Over')
	}
	handleLeave(e){
		console.log('Leave')
	}
	handleDrop(e){
		debugger
		console.log('Drop')
	}
	render(){

		// Determines which axis the draggable can move. This only affects 
		// flushing to the DOM. Callbacks will still include all values. 
		// Accepted values: 
		// - `both` allows movement horizontally and vertically (default). 
		// - `x` limits movement to horizontal axis. 
		// - `y` limits movement to vertical axis. 
		// - 'none' stops all movement. 
		// axis: string,
		// 坐标轴

		// Specifies movement boundaries. Accepted values: 
		// - `parent` restricts movement within the node's offsetParent 
		//    (nearest node with position relative or absolute), or 
		// - a selector, restricts movement within the targeted node 
		// - An object with `left, top, right, and bottom` properties. 
		//   These indicate how far in each direction the draggable 
		//   can be moved. 
		// bounds: {left: number, top: number, right: number, bottom: number} | string,
		// 边界
 
		// Specifies a selector to be used to prevent drag initialization. 
		// Example: '.desc' 
		// cancel: string,
		// 无拖拽效果

		// Specifies a selector to be used as the handle that initiates drag. 
		// Example: '.handle' 
		// handle: string,

		// Specifies the x and y that dragging should snap to. 
		// grid: [number, number], 拖动一次移动的距离x or y

		// Much like React form elements, if this property is present, the item 
		// becomes 'controlled' and is not responsive to user input. Use `position` 
		// if you need to have direct control of the element. 
		// position: {x: number, y: number}

		// Specifies the `x` and `y` that the dragged item should start at. 
		// This is generally not necessary to use (you can use absolute or relative 
		// positioning of the child directly), but can be helpful for uniformity in 
		// your callbacks and with css transforms. 
		// defaultPosition: {x: number, y: number},

		// If true, will not call any drag handlers. 
		// disabled: boolean,

		return (
			<div>
				<div>&nbsp;</div>
				<div className="desc" style={{margin:30,width:300,height:300,background:'#eee'}}
					onDragEnter={this.handleEnter}
					onDragOver={this.handleOver}
					onDrop={this.handleDrop}
					// onDrop={(e) => { e.preventDefault();alert(1) }}
					onDragLeave={this.handleLeave}
					></div>
				<Draggable
					// axis="x"
					// axis="y"
					// grid={[100, 50]}
					grid={[25, 25]}
					// bounds="parent"
					// bounds=".main"
					// disabled={true}
					cancel=".desc"
					handle=".car"
					defaultPosition={{x: 0, y: 0}}
					// position={{x: 100, y: 100}}
					// position={null}
					onStart={this.handleStart}
					onDrag={this.handleDrag}
					onStop={this.handleStop}>

					<div style={{padding:'10px',color:'red'}}>
						<div className="desc">请尝试拖走下面一排车</div>
						<div className="car">🚗🚗🚗🚗🚗🚗🚗🚗</div>
					</div>
				</Draggable>
			</div>
	    )
	}
}
export default DraggableReact

 