import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from '../middlewares/FetchAPI'
// import { apiMiddleware } from 'redux-api-middleware'
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import rootReducer from '../reducers'

const createStoreWithMiddleware = compose(     
    applyMiddleware(
        thunkMiddleware,
        apiMiddleware,
        routerMiddleware(hashHistory),
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
