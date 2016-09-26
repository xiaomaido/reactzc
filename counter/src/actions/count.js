export const PLUS = 'PLUS'
export const MINUS = 'MINUS'
export function plus_or_minus(type) {
  return {
    type: type
  }
}
export function plus_when_odd() {
  return (dispatch, getState) => {
    if (getState().counter%2==0) return
    dispatch(plus_or_minus(PLUS))
  }
}
export function plus_after_delay() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(plus_or_minus(PLUS))
    }, 1000)
  }
}