import React, { Component } from 'react'
import { base } from '../../config/constants'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  constructor(props){
    console.log("Login Index");
    super(props);
    this.state = {
     registerError: null
   }
 }

 handleSubmit(sType){
  base.authWithOAuthPopup(sType, (error, user) => {
    if(error) {
      console.log("Login error:" + error);
    }
    else{
      this.props.loginStatus_Child(true, user.user.providerData[0]);
    }
  });
}
render () {
  return (
    <div className="col-sm-6 col-sm-offset-3">
    <h1>Register</h1>
    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this, 'google') }>Login with Google</button>
    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit.bind(this, 'github')} disabled={true}>Github</button>
    </div>
    )
}
}
