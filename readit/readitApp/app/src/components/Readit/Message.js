import React from 'react';

export default class Message extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authed: props.authed,
      user: props.user
    }
  }

componentWillReceiveProps(props) {
    this.setState({authed: props.authed, user: props.user});
  }

  render(){

    var eleDeleteButton;
    if (this.props.authed && this.state.user && this.props.post.uid === this.state.user.uid) {
        eleDeleteButton = <button
            onClick={ this.props.removeMessage.bind(null) }
            className='btn btn-danger'>X
          </button>;
    } 

    return (
      <div onClick={ this.props.handleClick.bind(null) }
        className={ this.props.show ? 'bg-warning' : 'bg-info'}>
            { eleDeleteButton }         
            <p> { this.props.post.message } </p>
            <p> { this.props.post.addedByName } </p> 
            <p> { this.props.post.addedWhen } </p>
      </div>
    );
  }
};
