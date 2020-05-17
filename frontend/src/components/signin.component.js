/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

export default class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      signIn_email: "",
      signIn_password: ""
    }
    this.onChangeSignInEmail = this.onChangeSignInEmail.bind(this);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeSignInEmail(e){
    this.setState({
      signIn_email: e.target.value
    });
  }
  onChangeSignInPassword(e){
    this.setState({
      signIn_password: e.target.value
    });
  }
  onSubmit(e){
    e.preventDefault();
    console.log(`SignIn Form Submitted`);
    console.log(`SignIn Email: ${this.state.signIn_email}`);
    console.log(`SignIn Password ${this.state.signIn_password}`);

    /*Api call should go here using axios */
   
    this.setState({
      signIn_email: "",
      signIn_password: ""
    })

  };
  render() {
    return (
            
            <div className="col-sm-12 mb-3" style={{marginTop: 10}}>
                <h3 className="text-center mb-4">Sign into your Account</h3>
                <form className="mt-2 form p-4" onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Email address</label>
                      <input className="form-control" 
                      type="email" value={this.state.signIn_email} onChange={this.onChangeSignInEmail}  placeholder="joe@example.com"/>
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input className="form-control" 
                      type="password" value={this.state.signIn_password} onChange={this.onChangeSignInPassword}  placeholder="Password"/>
                  </div>
                  <div className="form-group mt-4 text-center">
                    <input type="submit"value="Sign In" className="btn btn-primary  px-5"/>
                  </div>
                  
                  <p className="text-center mt-5">Don't have an Account? <a href="/signup">Sign up</a></p>
                </form>
                <a href="/reset"><p className="text-center my-3">Forgot Your Password?</p></a>
            </div>
    );
  };
};
