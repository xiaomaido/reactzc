var TodoBox = React.createClass({
	getInitialState: function() {
		var state = {
			tasks: [
				{
					id:1,
					name:"起床",
					complete:true
				},
				{
					id:2,
					name:"刷牙",
					complete:false
				},
				{
					id:3,
					name:"洗脸",
					complete:false
				},
				{
					id:4,
					name:"穿衣",
					complete:false
				},
				{
					id:5,
					name:"吃饭",
					complete:false
				}
			]
		};
		return state;
	},
	render:function(){
		return (
			<div className="well">
				<h1 className="text-center">萌登的一天</h1>
				<TodoList completeTaskById={this.completeTaskById} deleteTaskById={this.deleteTaskById} tasks={this.state.tasks} />
				<TodoForm createTask={this.createTask} />
			</div>
		)
	},
	deleteTaskById:function(id){
		var tasks = this.state.tasks;
		tasks = tasks.filter(function(task) {
			return task.id!=id;
		});
		this.setState({tasks});
	},
	completeTaskById:function(id){
		var tasks = this.state.tasks;
		tasks = tasks.map(function(task) {
			if(task.id==id){
				task.complete = !task.complete;
			}
			return task;
		});
		this.setState({tasks});
	},
	createTask:function(name){
		var tasks = this.state.tasks;
		tasks.push({
			id:tasks.length+1,
			name:name,
			complete:false
		});
    	this.setState({tasks});
	}
});
var TodoList = React.createClass({
	render:function(){
		var ListArr = this.props.tasks.map(function(task, index) {
			return (
				<TodoItem 
					completeTaskById={this.props.completeTaskById}
					deleteTaskById={this.props.deleteTaskById}
					taskId={task.id}
					task={task}
					len={this.props.tasks.length}
					number={index+1}
					key={index} />
				
			);
		},this);
		return (
	        <ul className="list-group">
	        	{ListArr}
	        </ul>
	    );
	}
});
var TodoItem = React.createClass({
	render:function(){
    	var task = this.props.task,
    	taskName = this.props.number+"/"+this.props.len+" "+task.name;
    	var classSucc = "list-group-item ";
    	if(task.complete){
    		classSucc += "list-group-item-success"; 
    		taskName = <s>{taskName}</s>;
    	}
		return (
			<li className={classSucc} onMouseOver={this.mouseOverEvnet} onMouseOut={this.mouseOutEvent}>
				<input type="checkbox" className="pull-left" checked={task.complete} onChange={this.changeCompleteEvent}/>
				<span>{taskName}</span>
				<div className="pull-right">
					<button type="button" className="btn btn-xs close" ref="deleteBtn" onClick={this.clickDeleteTaskEvent}>删除</button>
				</div>
			</li>
		)
	},
	mouseOverEvnet: function(){
		ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "block";
	},
	mouseOutEvent: function(){
		ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = "none";
	},
	changeCompleteEvent: function(){
		this.props.completeTaskById(this.props.taskId);
	},
	clickDeleteTaskEvent: function(){
		this.props.deleteTaskById(this.props.taskId);
	}
});
var TodoForm = React.createClass({
	clickCreateTaskEvent: function(e){
    	e.preventDefault();
		var taskName = ReactDOM.findDOMNode(this.refs.taskName).value.trim();
	    if (taskName) {
    		this.props.createTask(taskName);
    		ReactDOM.findDOMNode(this.refs.taskName).value = "";
	    }
	},
	render:function(){
		return (
	      	<div>
		        <hr />
		        <form className="form-horizontal" onSubmit={this.clickCreateTaskEvent}>
		          <div className="form-group">
		            <div className="col-md-10">
		              <input type="text" id="taskName" ref="taskName" className="form-control col-md-6" placeholder="添加一件要做的事" />
		              <input type="submit" value="添加" id="addBtn" className="btn btn-primary" />
		            </div>
		          </div>
		        </form>
	      	</div>
	    )
	}
});
ReactDOM.render(
  <TodoBox />,
  document.getElementById('todoBox')
);