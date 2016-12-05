import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FilterTaskButton from '../components/FilterTaskButton'
import * as TaskActions from '../actions'

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(TaskActions, dispatch)
}

const FilterTask=connect(null, mapDispatchToProps)(FilterTaskButton)

export default FilterTask