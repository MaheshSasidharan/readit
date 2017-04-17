import React from 'react';

export default class Message extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      authed: props.authed
    }
  }

componentWillReceiveProps(props) {
    this.setState({authed: props.authed});
  }

  render(){

    var eleDeleteButton;
    if (this.props.authed) {
        eleDeleteButton = <button
            onClick={ this.props.removeMessage.bind(null) }
            className='btn btn-danger'>X
          </button>;
    } 

    return (
      <li
        onClick={ this.props.handleClick.bind(null) }
        className={ this.props.show ? 'bg-warning' : 'bg-info'}>
            { eleDeleteButton }          
            { this.props.thread.title }
            { this.props.show && <p> { this.props.thread.message } </p> }
      </li>
    );
  }
};
