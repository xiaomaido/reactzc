import * as T from '../types'

const task=(state={}, action) => {
    switch (action.type) {
        case T.CREATE_TASK:
            return action.data
        default:
            return state
    }
}

const tasks=(state=[
    {
        id:1,
        name:"吃饭",
        completed:true
    },
    {
        id:2,
        name:"睡觉",
        completed:false
    },
    {
        id:3,
        name:"打勇士",
        completed:true
    }],action) => {
    switch (action.type) {
        case T.CREATE_TASK:
            action.data.id=state.length+1;
            return [
                ...state,
                task({}, action)
            ]
        case T.COMPLETED_TASK:
            return state.map((d)=>{
                if(d.id===action.data.id){
                    d.completed=!d.completed;
                }
                return d;
            })
        case T.DELETE_TASK:
            return state.filter((d)=>{
                return d.id!==action.data.id;
            })
        default:
          return state
  }
}
export default tasks
