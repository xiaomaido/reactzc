import React, { Component } from 'react'
import { Link } from 'react-router'
class FilterLink extends Component {
  render() {
    let _props=this.props
    let className="btn "+_props.classExtra
    let filter=_props.filter
    return (
        <Link
		  	className={className}
		  	style={{marginRight:'5px'}} 
		    to={filter === 'ALL' ? '' : filter}
		    activeStyle={{
		      textDecoration: 'none',
		      color: 'white'
		    }}
		  >
		    {_props.btnText}
		  </Link>
    )
  }
}

export default FilterLink