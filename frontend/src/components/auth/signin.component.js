/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    const userData = {
      signIn_email: this.state.signIn_email,
      signIn_password: this.state.signIn_password
    };
    if(!this.state.signIn_email || !this.state.signIn_password){
      return alert("All Fields are required!")
    }
    console.log(`SignIn Successfully`);
    console.log(userData);
   
    /*Api call should go here using axios */
   
    this.setState({
      signIn_email: "",
      signIn_password: ""
    })

  };
  render() {
    return (
            
            <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}}>
                <h3 className="text-center mb-4">Sign into your Account</h3>
                <form className="mt-2 form p-4" onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Email address<span className="require mx-1">*</span></label>
                      <input className="form-control" 
                      type="email" 
                      name="email"
                      id="email"
                      title="Please enter your Email address"  
                      value={this.state.signIn_email} 
                      onChange={this.onChangeSignInEmail} 
                      pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                      placeholder="joe@example.com" required/>
                  </div>
                  <div className="form-group">
                      <label>Password<span className="require mx-1">*</span></label>
                      <input className="form-control" 
                      type="password"
                      name="password"
                      id="password" 
                      value={this.state.signIn_password} 
                      onChange={this.onChangeSignInPassword}
                      minLength="6"maxLength="12" size="12" 
                      placeholder="Password" required/>
                  </div>
                  <div className="form-group mt-4 text-center">
                    <input type="submit"value="Sign In" className="btn btn-primary  px-5"/>
                  </div>
                  
                  <p className="text-center mt-5 acct">Don't have an Account? <Link to="/signup">Sign up</Link></p>
                </form>
                <Link to="/reset"><p className="text-center my-3">Forgot Your Password?</p></Link>
            </div>
    );
  };
};