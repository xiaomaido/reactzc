import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TaskActions from '../actions/tasks'
import '../styles/pages/taskapp.scss'
import * as T from '../types'



// 容器组件
class ListTaskItem extends Component {
    render(){
        let _props=this.props
        let deleteBtn
        let deleteBtnRef=(node)=>{
            deleteBtn=node
        }
        let deleteTaskEvent=(e)=>{
            _props.deleteTask(_props.id);
        }
        let completeTaskEvent=(e)=>{
            _props.completeTask(_props.id);
        }
        let mouseOverEvnet=(e)=>{
            deleteBtn.style.display = "block";
        }
        let mouseOutEvent=(e)=>{
            deleteBtn.style.display = "none";
        }
        let taskName = _props.index+"/"+_props.len+" "+_props.name;
        let classSucc = "list-group-item ";
        if(_props.completed){
            classSucc += "list-group-item-success"; 
            taskName = <s>{taskName}</s>;
        }
        return (
            <li className={classSucc} onMouseOver={mouseOverEvnet} onMouseOut={mouseOutEvent}>
                <div style={{cursor:'pointer'}} className="pull-left" onClick={completeTaskEvent}>{_props.completed?"✅":"☑️"} </div>
                <span style={{paddingLeft:5}}>{taskName}</span>
                <div className="pull-right">
                    <button type="button" className="btn btn-xs close" ref={deleteBtnRef} onClick={deleteTaskEvent}>删除</button>
                </div>
            </li>
        )
    }
}

// 容器组件
class ListTaskItems extends Component {
    render() {
        let _props=this.props;
        return (
            <ul className="list-group">
            {
                _props.tasks.map((task,index)=>(
                    <ListTaskItem
                        key={index}
                        index={index}
                        completeTask={_props.completeTask} 
                        deleteTask={_props.deleteTask} 
                        len={_props.tasks.length}
                        {...task}
                    />
                    ))
            }
            </ul>
        )
    }
}


const mapStateToProps=(state)=>({
    tasks:state.tasks.filter((d)=>{
		return d.completed!==state.filters;
	})
})
const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(TaskActions, dispatch)
}

const ListTask=connect(mapStateToProps, mapDispatchToProps)(ListTaskItems)

// 容器组件
class FilterTaskButton extends Component {
  render() {
    let _props=this.props
    let className="btn "+_props.classExtra
    let clickEvent=(e)=>{
    	e.preventDefault();
    	_props.fliterTask(_props.filter);
    }
    return (
        <button className={className} style={{marginRight:'5px'}} onClick={clickEvent}>{_props.btnText}</button>
    )
  }
}

const FilterTask=connect(null, {
    fliterTask:TaskActions.fliterTask
})(FilterTaskButton)

// 容器组件
class AddTaskForm extends Component {
  render() {
    let _props=this.props
    let taskNameInput
    let nodeRef=(node)=>{
        taskNameInput=node
    }
    let formSubmitEvent=(e)=>{
        e.preventDefault()
        var taskName=taskNameInput.value.trim()
        if (taskName) {
            _props.createTask(taskName);
        }
        taskNameInput.focus()
        taskNameInput.value=''
    }
    return (
        <form className="form-horizontal" onSubmit={formSubmitEvent}>
            <div className="form-group">
                <div className="col-md-10">
                    <input ref={nodeRef} type="text" className="form-control col-md-6" placeholder="添加一件要做的事" />
                    <div>&nbsp;</div>
                    <input type="submit" value="添加" className="btn btn-primary" />
                </div>
            </div>
        </form>
    )
  }
}

const AddTask=connect(null, {
  createTask:TaskActions.createTask
})(AddTaskForm)

class TaskApp extends Component{
	render(){
		return (
			<div className="container">
				<div className="col-md-6 col-md-offset-3">
					<div className="well">
						<h1 className="text-center">待办事项</h1>
				        <div>
				        	<FilterTask classExtra="btn-warning" btnText="全部任务" filter={T.FILTERS.ALL} />
				        	<FilterTask classExtra="btn-success" btnText="已完成" filter={T.FILTERS.DONE} />
				        	<FilterTask classExtra="btn-danger" btnText="未完成" filter={T.FILTERS.TODO} />
						</div>
						<div>&nbsp;</div>
						<AddTask />
						<div>&nbsp;</div>
		       			<ListTask />
					</div>
				</div>
			</div>
		)
	}
    componentDidMount(){
        const linkStyle = document.createElement('link') //异步延迟加载样式  
        linkStyle.setAttribute('href','http://127.0.0.1:8020/reactzc/todos/css/bootstrap.min.css')
        linkStyle.setAttribute('rel', 'stylesheet')
        document.body.appendChild(linkStyle)
    }
}
export default TaskApp