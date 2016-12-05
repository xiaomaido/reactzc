import React, { Component } from 'react'

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
export default FilterTaskButton