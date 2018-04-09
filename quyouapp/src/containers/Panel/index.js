import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom'

const Profile = () => <div style={{padding: 10}}>Profile</div>

const LoginStatus = {
    isLogin: false,
    signInOrOut(cb) {
      this.isLogin = !this.isLogin
      setTimeout(cb, 100) // fake async
    }
}

class Login extends Component {
    state = {
        redirectToReferrer: false
    }
    login = () => {
        LoginStatus.signInOrOut(() => {
          this.setState({ redirectToReferrer: true })
        })
    }
    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state
        return redirectToReferrer ?  <Redirect to={from} /> : (
          <div style={ { padding: 10 } }>
            {
                from.pathname!=='/'?<p>请您先登录，才能访问 { from.pathname } 页面</p>:null
            }
            <p><input type="text" placeholder="手机" /></p>
            <p><input type="password" placeholder="密码" /></p>
            <p><button onClick={this.login}>登录</button></p>
          </div>
        )
    }
}

// 函数式组件 第一个参数是props
// 类组件 this.props
// props = {
//     history,
//     location,
//     match,
//     staticContext
// }
const NeedLoginRoute = ({ component: Component, ...rest }) =>(
    <Route 
        {...rest} 
        render={
            props => (
                LoginStatus.isLogin ? 
                <Component {...props} /> : (
                    <Redirect to={ 
                            {
                                pathname: '/login',
                                state: { from: props.location }
                            }
                        } 
                    />
                )
            ) 
        }
    />
)

const Index = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route exact path="/list" component={List} />
      <Route path="/list/:id" component={App} />
      <Route path="/topics" component={Topics} />
      <NeedLoginRoute path="/profile" component={Profile} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
)
export default Index

const NoMatch = ({ location }) => (
    <div>
      <h3> {location.pathname} 404 Error</h3>
    </div>
)
const Home = () => (
  <div style={{padding: 10}}>
    <h2>首页</h2>
    <LoginArea />
  </div>
)

const LoginArea = withRouter(({ history }) => (
    LoginStatus.isLogin ? (
        <p>
            <Link to="/profile" style={{marginRight:10}}>个人中心</Link>
            <button onClick={ () => LoginStatus.signInOrOut(() => history.push('/')) }>退出</button>
        </p>
    ) : <Link to="/login">登录</Link>
))

const List = () => (
  <div style={{padding: 10}}>
    <h2>App <Link to="/list/1">1</Link></h2>
    <h2>App <Link to="/list/2">2</Link></h2>
  </div>
)

class App extends Component {
    render() {
        const { match } = this.props
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">HuaYun { match.params.id }</h1>
                </header>
            </div>
        )
    }
}

const Topics = ({ match }) => (
  <div style={{padding: 10}}>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div style={{padding: 10}}>
    <h3>{match.params.topicId}</h3>
  </div>
)
