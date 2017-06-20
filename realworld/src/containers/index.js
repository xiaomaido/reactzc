import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'
import App from '../containers/App'
import configureStore from '../store'

const store=configureStore()

export default class Index extends Component{
	render(){
		return (
			<Provider store={store} >
				<div>
					<ReduxRouter />
				</div>
			</Provider>
		)
	}
}