import React from 'react'
import { render } from 'react-dom'
import Index from './containers'
import { Provider } from 'react-redux'
import configureStore from './store'

window.store=configureStore()

render(
  	<Provider store={store}>
		<Index />
	</Provider>
	,document.getElementById("index")
)
