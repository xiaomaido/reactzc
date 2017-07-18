import React, { Component } from 'react'
import '../styles/components/app.scss'

class App extends Component{
	constructor(props){
		super(props)
		this.handleChange=this.handleChange.bind(this)
		this.handleClear=this.handleClear.bind(this)
	}
	componentDidMount(){

	}
	componentDidUpdate(){
		
	}
	handleChange(nextKeyword){
		// this.props.pushState(null,`/${nextKeyword}`)
	}
	handleClear(e){
    	e.preventDefault()
	}
	render(){
		return (
			<div className="app">
				<div className="title">App</div>
			</div>
		)
	}
}
export default App
