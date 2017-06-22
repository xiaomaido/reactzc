import { combineReducers } from 'redux'
import pagination from './pagination'
import * as T from '../types'

// 为不同action执行返回的结果列表实现分页
const paginations=combineReducers({
    starredByUser:pagination({
        mapActionToKey:(action)=>(action.name)
        ,types:[
            T.STARRED_REQUEST,
            T.STARRED_SUCCESS,
            T.STARRED_FAILURE
        ]
    })
    ,stargazersByRepo:pagination({
        mapActionToKey:(action)=>(action.name)
        ,types:[
            T.STARGAZERS_REQUEST,
            T.STARGAZERS_SUCCESS,
            T.STARGAZERS_FAILURE
        ]
    })
})
export default paginations