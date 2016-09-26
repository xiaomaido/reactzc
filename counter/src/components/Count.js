import React, { Component } from 'react'
class Count extends Component {
  render() {
    let _props=this.props;
    return (
      <div>
        <button onClick={()=>_props.plus_or_minus("MINUS")}>自减</button>
        <button onClick={()=>_props.plus_or_minus("PLUS")}>自增</button>
        <button onClick={_props.plus_when_odd}>逢奇自增</button>
        <button onClick={_props.plus_after_delay}>延迟1秒自增</button>
        <p>计数：<span>{_props.counter}</span></p>
      </div>
      
    )
  }
}
export default Count
