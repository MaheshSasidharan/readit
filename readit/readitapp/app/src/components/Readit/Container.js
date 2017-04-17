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
    // Get all chats from firebase
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
  _likeMessage(index, e){
  // get curretn post

    e.stopPropagation();
    var arr = this.state.messages.concat([]);
    var x = arr[index];
    // If liked by exists, check if current user has liked it
    if(x.likedBy){
      var bFound = false;
      x.likedBy.map( (item, index) => {
        if(this.state.user && item.uid === this.state.user.uid){
          bFound = true;
          // If current user had previously liked it, then un-like it, else like it
          if(item.likeStatus === 1){
            item.likeStatus = 0;
          }else{
            item.likeStatus = 1;
          }
        }
      });

      //If current user has not liked yet, then like it
      if(!bFound){
        x.likedBy.push({
          likeStatus: 1,
          uid: this.state.user.uid
        });
      }else{
        // If no one has ever liked it, then create new 'like' object and add user
        x.likedBy = [];
        x.likedBy.push({
          likeStatus: 1,
          uid: this.state.user.uid
        });
      }

      this.setState({
        messages: arr
      });
    }
  }
  _dislikeMessage(index, e){
    e.stopPropagation();
    var arr = this.state.messages.concat([]);
    var x = arr[index];
    if(x.likedBy){
      var bFound = false;
      x.likedBy.map( (item, index) => {
        if(this.state.user && item.uid === this.state.user.uid){
          bFound = true;
          if(item.likeStatus === 2){
            item.likeStatus = 0;
          }else{
            item.likeStatus = 2;
          }
        }
      });

      if(!bFound){
        x.likedBy.push({
          likeStatus: 2,
          uid: this.state.user.uid
        });
      }
    }else{
      x.likedBy = [];
      x.likedBy.push({
        likeStatus: 2,
        uid: this.state.user.uid
      });
    }

    this.setState({
      messages: arr
    });

  }
  _removeMessage(index, e){
    // To delete, just create a copy of chats (to be efficient - update only required DOM)
    e.stopPropagation();
    var arr = this.state.messages.concat([]);
    // Remove the post to be deleted, and save to firebase using setState (because syncState is ON)
    arr.splice(index, 1);

     this.setState({
      messages: arr,
      show: null
    });
   }
   _toggleView(index){
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
        likeMessage={ this._likeMessage.bind(this, index) }
        dislikeMessage={ this._dislikeMessage.bind(this, index) }
        removeMessage={ this._removeMessage.bind(this, index) }
        handleClick={ this._toggleView.bind(this, index) }
        key={ index } />
        );
      });

      var sAuthed = this.state.authed ? 'TRUE' : 'FALSE';
      var userName = this.state.user ? this.state.user.displayName : "NONE";

      return (
      <div className='col-md-12'>
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
