import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './src/store/configureStore'
import App from './src/containers/App'

const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
