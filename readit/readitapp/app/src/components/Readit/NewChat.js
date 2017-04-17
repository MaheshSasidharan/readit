import React from 'react';
import Rebase from 're-base';
import ReactDOM from 'react-dom';

import { base } from '../../config/constants'

class NewChat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authed: props.authed,
      user: props.user
    };
  }

componentWillReceiveProps(props) {
    this.setState({authed: props.authed, user: props.user});
  }

  _newChat(e){
    e.preventDefault();
     base.post('chats', {
      data: this.props.chats.concat([{
        addedByName: this.state.user.displayName,
        uid: this.state.user.uid,
        addedWhen: new Date().toString(),
        message: ReactDOM.findDOMNode(this.refs.message).value
      }]),
      context: this,
       then: () => {
        console.log('POSTED');
      }
    });

     ReactDOM.findDOMNode(this.refs.message).value = '';

   }
   render(){
    return (
      <div className='col-md-12 row'>
      <form onSubmit={ this._newChat.bind(this) } className='form-group col-md-8'>
      <textarea ref='message'  placeholder='Enter your post here' className='form-control' />
      <input type='submit' className='btn btn-success' style={{marginTop: '10px'}}/>
      </form>
      </div>
      )
  }
}

export default NewChat;
