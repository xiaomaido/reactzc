
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

