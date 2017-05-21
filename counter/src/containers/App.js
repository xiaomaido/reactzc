import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CountActions from '../actions/count'
import Count from '../components/Count'

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CountActions, dispatch)
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Count)
