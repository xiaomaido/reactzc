import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from '../middlewares/api_superagent'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import rootReducer from '../reducers'

// applyMiddleware是redux里面的，可以封装store里面的dispatch
// thunkMiddleware作用是使action创建函数可以返回一个function代替一个action对象
const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunkMiddleware
        ,routerMiddleware(hashHistory)
    )
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
