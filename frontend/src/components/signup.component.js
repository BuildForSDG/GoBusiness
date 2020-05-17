/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';

export default class SignUp extends Component {
  render() {
      return (
              <div className="col-sm-12 mb-3" style={{marginTop: 10}}>
                  <h3 className="text-center mb-4">Create an Account</h3>
                  <form className="mt-2 form p-4">
                    <div className="form-group">
                        <label>First Name</label>
                        <input className="form-control" 
                        type="text" placeholder="First Name"/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input className="form-control" 
                        type="text"  placeholder="Last Name"/>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input className="form-control" 
                        type="email"  placeholder="joe@example.com"/>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input className="form-control" 
                      type="password"  placeholder="Password"/>
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input className="form-control" 
                      type="password"  placeholder="Confirm Password"/>
                    </div>
                    <div className="form-group mt-4 text-center">
                      <input type="submit"value="Business" className="btn btn-primary m-2 px-5 user"/>
                      <input type="submit"value="Investor" className="btn btn-primary m-2 px-5 user"/>
                    </div>
                    <p className="text-center mt-5">Already have an Account? <a href="/signin">Sign in</a></p>
                  </form>
              </div>
            );
        };
};
