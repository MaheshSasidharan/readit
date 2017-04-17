import React from 'react';
import Rebase from 're-base';

import Message from './Message.js';
import { base } from '../../config/constants'

class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      show: null,
      authed: props.authed,
      user: props.user
    }
  }
  componentWillMount(){

    /*
     * We bind the 'chats' firebase endopint to our 'messages' state.
     * Anytime the firebase updates, it will call 'setState' on this component
     * with the new state.
     *
     * Any time we call 'setState' on our 'messages' state, it will
     * updated the Firebase '/chats' endpoint. Firebase will then emit the changes,
     * which causes our local instance (and any other instances) to update
     * state to reflect those changes.
     */

    this.ref = base.syncState('chats', {
      context: this,
      state: 'messages',
      asArray: true
    });
  }
  componentWillReceiveProps(props) {
    this.setState({authed: props.authed, user:props.user });
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  _removeMessage(index, e){
    e.stopPropagation();
    var arr = this.state.messages.concat([]);
    arr.splice(index, 1);

    /*
     * Calling setState here will update the '/chats' ref on our Firebase.
     * Notice that I'm also updating the 'show' state.  Because there is no
     * binding to our 'show' state, it will update the local 'show' state normally,
     * without going to Firebase.
     */

    this.setState({
      messages: arr,
      show: null
    });
  }
  _toggleView(index){

    /*
     * Because nothing is bound to our 'show' state, calling
     * setState on 'show' here will do nothing with Firebase,
     * but simply update our local state like normal.
     */
    this.setState({
      show: index
    });
  }
  render(){
    var messages = this.state.messages.map( (item, index) => {
      return (
        <Message
          authed={this.state.authed}
          user={this.state.user}
          post={ item }
          show={ this.state.show === index }
          removeMessage={ this._removeMessage.bind(this, index) }
          handleClick={ this._toggleView.bind(this, index) }
          key={ index } />
      );
    });

    var sAuthed = this.state.authed ? 'TRUE' : 'FALSE';
    var userName = this.state.user ? this.state.user.displayName : "NONE";

    return (
    <div>
      {/*<div>Authed {sAuthed}</div>*/}
      {/*<div>User {userName}</div>*/}
        <div className='col-md-12'>
          <div className='col-md-8'>
            <h1>{ (this.state.messages.length || 0) + ' messages' }</h1>
            <div className='row'>{ messages }</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Container
