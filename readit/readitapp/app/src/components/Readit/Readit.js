import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Container from './Container';
import NewChat from './NewChat';
import { base } from '../../config/constants'

export class Readit extends React.Component {
  // Get logged in user's information
  constructor(props){
    super(props);
    this.authDataCallback = this.authDataCallback.bind(this);
    this.state = {
      messages: [],
      authed: props.authed,
      user: props.user
    };
  }
  componentWillMount(){
   base.bindToState('chats', {
    context: this,
    state: 'messages',
    asArray: true
  });
 }

 componentWillReceiveProps(props) {
  this.setState({authed: props.authed, user:props.user});
  }

  componentDidMount () {
    this.unsubscribe = base.onAuth(this.authDataCallback);
  }
  componentWillUnmount () {
    this.unsubscribe();
  }

  authDataCallback(user) {
    if (user) {
      this.loginStatus_Child(true, user.providerData[0]);
    } else {
      this.loginStatus_Child(false, null);
    }
  }

  loginStatus_Child(authVal, userInfo){
    this.setState({authed: authVal, user: userInfo});
    //this.forceUpdate();
  }

  render(){
    var oNewChat;
    /*Show only if user is logged in*/
    if (this.state.authed) {
        oNewChat = <NewChat authed={this.state.authed} user={this.state.user} chats={ this.state.messages } />
    } 


    return (
      <div style={ { paddingTop: '30px' } }>
      { oNewChat }
      <Container authed={this.state.authed} user={this.state.user}/>
      </div>
      )
    }
}