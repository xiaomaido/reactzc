// import { createStore, applyMiddleware, compose } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// // import createLogger from 'redux-logger'
// import rootReducer from '../reducers'

// // const loggerMiddleware = createLogger()

// //applyMiddleware来自redux可以包装 store 的 dispatch
// //thunk作用是使action创建函数可以返回一个function代替一个action对象
// const createStoreWithMiddleware = compose(
//     applyMiddleware(
//         thunkMiddleware
//         // ,loggerMiddleware
//     ),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
// )(createStore)

// const configureStore=(preloadedState)=>{
//   const store = createStoreWithMiddleware(rootReducer, preloadedState)
//   //热替换选项
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextReducer = require('../reducers')
//       store.replaceReducer(nextReducer)
//     })
//   }
//   return store
// }
// export default configureStore 

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'


export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  )
}

// createStore(reducer, [preloadedState], [enhancer])
// createStore accepts 3 arguments: the root reducer, optionally the default preloaded state, and the enhancers.