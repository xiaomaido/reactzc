import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store'
import { ReduxRouter } from 'redux-router'
import DevTool from './DevTool'

const store=configureStore()

export default class Index extends Component{
	render(){
		return (
			<Provider store={store} >
				<div>
					<ReduxRouter />
					<DevTool/>
				</div>
			</Provider>
		)
	}
}