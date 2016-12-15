import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AddTaskForm from '../components/AddTaskForm'
import * as TaskActions from '../actions'

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(TaskActions, dispatch)
}

const AddTask=connect(null, mapDispatchToProps)(AddTaskForm)

export default AddTask