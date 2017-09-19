import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
const initialState = Immutable.fromJS({
    locationBeforeTransitions: null
})
const routing=(state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.set('locationBeforeTransitions', action.payload);
    }
    return state
}
export default routing 