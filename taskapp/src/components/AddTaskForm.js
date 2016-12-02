import React, { Component } from 'react'

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
                    <br />
                    <input type="submit" value="添加" className="btn btn-primary" />
                </div>
            </div>
        </form>
    )
  }
}
export default AddTaskForm