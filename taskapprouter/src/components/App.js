import React from 'react'
import AddTask from '../containers/AddTask'
import ListTask from '../containers/ListTask'
import FilterLink from '../components/FilterLink'

// 展示组件
const App = ({ params }) => (
	<div className="container">
		<div className="col-md-6 col-md-offset-3">
			<div className="well">
				<h1 className="text-center">哈登的一天</h1>
		        <ListTask filters={params.filter||"ALL"}/>
		        <div>
		        	<FilterLink classExtra="btn-warning" btnText="全部任务" filter="ALL" />
		        	<FilterLink classExtra="btn-success" btnText="已完成" filter="DONE" />
		        	<FilterLink classExtra="btn-danger" btnText="未完成" filter="TODO" />
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