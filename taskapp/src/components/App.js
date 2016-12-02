import React from 'react'
import AddTask from '../containers/AddTask'
import ListTask from '../containers/ListTask'

// 展示组件
const App = () => (
	<div className="container">
		<div className="col-md-6 col-md-offset-3">
			<div className="well">
				<h1 className="text-center">登登的一天</h1>
		        <ListTask />
				<div>
        			<hr />
					<AddTask />
  				</div>
			</div>
		</div>
	</div>
)
export default App