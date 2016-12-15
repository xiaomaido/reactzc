import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './src/components/App'
import configureStore from './src/store/configureStore'
import { Router, Route, browserHistory } from 'react-router'

window.store=configureStore()

// 也许你想将 '#' 从 URL 中移除（例如：http://localhost:3108/#/?_k=4sbb0i）。 你需要从 React Router 导入 browserHistory 来实现

const Root = () => (
  <Provider store={store}>
  	<Router history={browserHistory}>
      <Route path="/(:filter)" component={App} />
    </Router>
  </Provider>
);
render(
  <Root />,
  document.getElementById('root')
)