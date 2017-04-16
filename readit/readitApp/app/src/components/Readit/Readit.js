import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Container from './Container';
import NewChat1 from './NewChat';
import { base } from '../../config/constants'

export class Readit extends React.Component {
  constructor(props){
    console.log("App");
    super(props);
    this.state = {
      messages: []
    };
  }
  componentWillMount(){
   base.bindToState('chats', {
    context: this,
    state: 'messages',
    asArray: true
  });
 }
 render(){
  return (
    <div style={ { paddingTop: '30px' } }>
    <NewChat1 chats={ this.state.messages } />
    <Container />
    </div>
    )
  }
}