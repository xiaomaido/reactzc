import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from '../middlewares/api'
import rootReducer from '../reducers'
import routes from '../routes'
import createHistory from 'history/lib/createBrowserHistory'

const route_ref={ 
  routes
  ,createHistory
}
const createStoreWithMiddleware = compose(
    applyMiddleware(
      thunkMiddleware
      ,apiMiddleware
    ),
    reduxReactRouter(route_ref)
)(createStore)

const configureStore=(preloadedState)=>{
  const store = createStoreWithMiddleware(rootReducer, preloadedState)
  //热替换选项
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}
export default configureStore 