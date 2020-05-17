/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

export default class SignIn extends Component {
  render() {
    return (
            
            <div className="col-sm-12 mb-3" style={{marginTop: 10}}>
                <h3 className="text-center mb-4">Sign into your Account</h3>
                <form className="mt-2 form p-4">
                  <div className="form-group">
                      <label>Email address</label>
                      <input className="form-control" 
                      type="email" placeholder="joe@example.com"/>
                  </div>
                  <div className="form-group">
                      <label>Password</label>
                      <input className="form-control" 
                      type="password"  placeholder="Password"/>
                  </div>
                  <div className="form-group mt-4 text-center">
                    <input type="submit"value="Sign In" className="btn btn-primary  px-5"/>
                  </div>
                  
                  <p className="text-center mt-5">Don't have an Account? <a href="/signup">Sign up</a></p>
                </form>
                <a href="/reset"><p className="text-center my-3">Forgot Your Password?</p></a>
            </div>
    );
  }
}
