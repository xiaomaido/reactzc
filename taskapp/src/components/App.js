import React from 'react'
import AddTask from '../containers/AddTask'
import ListTask from '../containers/ListTask'
import FilterTask from '../containers/FilterTask'
import * as T from '../types'

// 展示组件
const App = () => (
	<div className="container">
		<div className="col-md-6 col-md-offset-3">
			<div className="well">
				<h1 className="text-center">登登的一天</h1>
		        <ListTask />
		        <div>
		        	<FilterTask classExtra="btn-warning" btnText="全部任务" filter={T.FILTERS.ALL} />
		        	<FilterTask classExtra="btn-success" btnText="已完成" filter={T.FILTERS.DONE} />
		        	<FilterTask classExtra="btn-danger" btnText="未完成" filter={T.FILTERS.TODO} />
				</div>
				<div>
        			<hr />
					<AddTask />
  				</div>
			</div>
		</div>
	</div>
)
export default App