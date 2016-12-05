import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ListTaskItems from '../components/ListTaskItems'
import * as TaskActions from '../actions'

const mapStateToProps=(state)=>({
    tasks:state.tasks.filter((d)=>{
		return d.completed!==state.filters;
	})
})
const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(TaskActions, dispatch)
}

const ListTask=connect(mapStateToProps, mapDispatchToProps)(ListTaskItems)

export default ListTask
