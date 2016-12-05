import * as T from '../types'
const filters=(state=T.FILTERS.ALL, action) => {
	switch (action.type) {
		case T.FILTER_TASK:
			return action.data
		default:
			return state
	}
}

export default filters