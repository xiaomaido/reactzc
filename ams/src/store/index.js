
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import {ApiMiddleware} from './middleware/ApiMiddleware'
import reducers from 'reducer'

export default (initialState) => {
  const store = createStore(reducers, initialState,
                            applyMiddleware(ApiMiddleware, routerMiddleware(browserHistory)));
  return store
}

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from '../middlewares/api'
import rootReducer from '../reducers'
import routes from '../routes'
import createHistory from 'history/lib/createBrowserHistory'

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunkMiddleware
        ,apiMiddleware
    ),
    reduxReactRouter({ routes, createHistory })
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
