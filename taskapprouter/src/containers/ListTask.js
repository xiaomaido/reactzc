import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ListTaskItems from '../components/ListTaskItems'
import * as TaskActions from '../actions'
import * as TaskTypes from '../types'

const mapStateToProps=(state,props)=>({
    tasks:state.tasks.filter((d)=>{
		return d.completed!==TaskTypes.FILTERS[props.filters];
	})
})
const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(TaskActions, dispatch)
}

const ListTask=connect(mapStateToProps, mapDispatchToProps)(ListTaskItems)

export default ListTask
