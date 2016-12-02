import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './src/components/App'
import configureStore from './src/store/configureStore'

window.store=configureStore()
console.log(store.getState())
const subscribe = store.subscribe(() =>
  console.log(store.getState())
)
subscribe();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)