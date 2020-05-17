import React, { Component } from 'react';


export default class Reset extends Component{
  constructor(props){
    super(props);
    this.state = {
      reset_Email: ""
    }
    this.onChangeResetEmail = this.onChangeResetEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeResetEmail(e){
    this.setState({
      reset_Email: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    console.log(`Email Reset Form Submitted`);
    console.log(`Reset Email: ${this.state.reset_Email}`);

    /**Api call should go here using axios */

    this.setState({
      reset_Email:""
    })
  }
    render() {
        return (
            <div className="col-sm-12 mb-3" style={{marginTop: 10}}>
            <h3 className="text-center mb-4">Reset Password</h3>
            <form className="mt-2 form p-4" onSubmit={this.onSubmit}>
              <p className="text-justify">Enter your email address below and we'll send you a link to reset your password</p>  
              <div className="form-group">
                  <label>Email address</label>
                  <input className="form-control" 
                  type="text" value={this.state.reset_Email} onChange={this.onChangeResetEmail} placeholder="joe@example.com"/>
              </div>
              <div className="form-group mt-4 text-center">
                <input type="submit"value="Reset Password" className="btn btn-primary  px-5"/>
              </div>
              
              <p className="text-center mt-5"><a href="/signin" className="mx-2">Sign In</a>  or  <a href="/signup" className="mx-2">Sign Up</a></p>
            </form>
        
        </div>
        )
    }
}