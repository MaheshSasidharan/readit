import React, { Component } from 'react'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login/Login'
import Home from './Login/Home'
import { Readit } from './Readit/Readit'
import { base } from '../config/constants'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
    {...rest}
    render={(props) => authed === true
      ? <Component authed={authed} {...props} />
      : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
      )
}

function PublicRoute ({component: Component, loginStatus_Parent2, authed, ...rest}) {
  return (
    <Route
    {...rest}
    render={(props) => authed === false
      ? <Component loginStatus_Child={loginStatus_Parent2} {...props}/>
      : <Redirect to='/dashboard' />}
      />
      )
}

function ReadItPassProp ({component: Component, authed, user, ...rest}) {
  return (
    <Route
    {...rest}
    render={(props) => <Component authed={authed} user={user} {...props}/>}
      />
  )
}

export default class LoginApp extends Component {
  constructor(props){
    super(props);
    this.loginStatus_Parent1 = this.loginStatus_Parent1.bind(this);
    this.authDataCallback = this.authDataCallback.bind(this);
    
    this.state = {
      authed: false,
      loading: false,
      user: null
    };
  }
  componentDidMount () {
    this.unsubscribe = base.onAuth(this.authDataCallback);
  }
  componentWillUnmount () {
    this.unsubscribe();
  }

  authDataCallback(user) {
    if (user) {
      this.loginStatus_Parent1(true, user.providerData[0]);
    } else {
      this.loginStatus_Parent1(false, null);
    }
  }

  loginStatus_Parent1(authVal, userInfo){
    this.setState({authed: authVal, user: userInfo});
    //this.forceUpdate();
  }

  logout(){
    base.unauth();
  }

  render() {

    var sUserName = this.state.authed ? this.state.user.displayName : "User";

    return (
      <BrowserRouter>
      <div>
      <nav className="navbar navbar-default navbar-static-top">
      <div className="container">
      <div className="navbar-header">
      <Link to="/" className="navbar-brand">Readit</Link>
      </div>
      <ul className="nav navbar-nav pull-right">
      <li>
      <div className="navbar-brand">
        Welcome {sUserName}
      </div>
      </li>
      <li>
      <Link to="/" className="navbar-brand">Home</Link>
      </li>
      {/* <li>
       <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
       </li>
      */}
      <li>
      {this.state.authed
        ? <button
        style={{border: 'none', background: 'transparent'}}
        onClick={() => {
          this.logout()
        }}
        className="navbar-brand">Logout</button>
        : <span>
        <Link to="/login" className="navbar-brand">Login</Link>
        </span>}
        </li>
        </ul>
        </div>
        </nav>
        <div className="container">
          <div className="row">
            <Switch>
              <ReadItPassProp path='/' authed={this.state.authed} user={this.state.user} exact component={Readit} />
              <PublicRoute loginStatus_Parent2={this.loginStatus_Parent1} authed={this.state.authed} path='/login' component={Login} />
              <PrivateRoute authed={this.state.authed} path='/dashboard' component={Readit} />
              <Route render={() => 
                <div>
                    <h3>Welcome to Readit. Totally original app. Nothing to do with reddit. </h3>
                    Click on <i><b>Home</b></i> to started. <br/>
                    You will only be able to view the posts. Please <i><b>Login</b></i> to add posts.
                </div>
             } />
            </Switch>
           </div>
          </div>
        </div>
     </BrowserRouter>
        );
  }
}
