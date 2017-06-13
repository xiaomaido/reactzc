import React from 'react'
import { Route } from 'react-router'
import App from '../containers/App'
import UserInfo from '../containers/UserInfo'
import RepoInfo from '../containers/RepoInfo'

export default (
	<Route path="/" component={App}>
		<Route path="/:login/:repository" component={RepoInfo} />
		<Route path="/:login" component={UserInfo} />
	</Route>
)
