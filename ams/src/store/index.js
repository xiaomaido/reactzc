import { createStore, applyMiddleware, compose } from 'redux'
import { hashHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from '../middlewares/api'
import rootReducer from '../reducers'

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
          store.replaceReducer(nextReducer) // redux改变状态state的原理就是通过replaceReduce去改变
        })
    }
    return store
}

export default configureStore 
