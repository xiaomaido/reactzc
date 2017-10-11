import React from 'react'
import { render } from 'react-dom'
// import Index from './containers/admincms'
import Index from './containers/quyou'
import { Provider } from 'react-redux'

// 先进入Index和App主组件，在渲染到页面，所以window.store在 
render(
  	<Provider store={window.store}>
		<Index />
	</Provider>
	,document.getElementById("index")
)
