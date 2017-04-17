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
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      authed: props.authed
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
  this.setState({authed: props.authed});
  }
  render(){
    var oNewChat;
    if (this.state.authed) {
        oNewChat = <NewChat authed={this.state.authed} chats={ this.state.messages } />
    } 


    return (
      <div style={ { paddingTop: '30px' } }>
      { oNewChat }
      <Container authed={this.state.authed} />
      </div>
      )
    }
}