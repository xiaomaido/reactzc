import { PLUS, MINUS } from '../actions/count'
export default function counter(state=10,action){
  switch(action.type){
    case PLUS:
      return ++state;
    case MINUS:
      return --state;
    default:
      return state
  }
}