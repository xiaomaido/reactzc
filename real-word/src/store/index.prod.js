import { createStore, applyMiddleware, compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
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
  return createStoreWithMiddleware(rootReducer, preloadedState)
}
export default configureStore 