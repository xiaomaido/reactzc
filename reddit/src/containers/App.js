import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import MapApp from './MapApp'

const mapStateToProps=(state)=>{
	const { selectedSubreddit, postsBySubreddit } = state
	const { 
		isFetching, 
		items, 
		receivedAt
	} = postsBySubreddit[selectedSubreddit] || {
	    isFetching: true,
		items:[]
	}
	return {
	    selectedSubreddit,
	    isFetching,
	    items,
	    receivedAt
	}
}
const mapDispatchToProps=(dispatch)=>{
  	return bindActionCreators(Actions, dispatch)
}
const App=connect(mapStateToProps,mapDispatchToProps)(MapApp)
export default App


