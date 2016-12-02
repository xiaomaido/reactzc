import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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
                <input type="checkbox" className="pull-left" checked={_props.completed} onChange={completeTaskEvent}/>
                <span>{taskName}</span>
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

export default ListTaskItems