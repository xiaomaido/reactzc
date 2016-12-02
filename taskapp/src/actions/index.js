import * as T from '../types'
export const createTask=(name)=>({
	type: T.CREATE_TASK,
	data: {
		completed: false,
		name
	}
})
export const deleteTask=(id)=>({
	type: T.DELETE_TASK,
	data: {
		id
	}
})
export const completeTask=(id)=>({
	type: T.COMPLETED_TASK,
	data: {
		id
	}
})
export const fliterTask=(fliter)=>({
	type: T.FILTER_TASK,
	data: {
		fliter
	}
})