import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from "sweetalert";


export default class ResetPassword extends Component{
  constructor(props){
    super(props);
    this.state = {
     password: "",
     confirmPassword: ""
    }
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangePassword(e){
      this.setState({
          password: e.target.value
      })
  }
  onChangeConfirmPassword(e){
      this.setState({
          confirmPassword: e.target.value
      })
  }
  
  onSubmit(e){
    e.preventDefault();
    console.log(`Password Reset Successful`);
    if(this.state.password !== this.state.confirmPassword){
      swal("Aw!","Your passwords donot match","error")
    } else {
      this.setState({
        password:"",
        confirmPassword: ""
      });
      swal("Great!","Password Reset was Successful","success");
    }

    /**Api call should go here using axios */

   
  }
    render() {
        return (
            <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}}>
            <h3 className="text-center mb-4">Reset Password</h3>
            <form className="mt-2 form p-4" onSubmit={this.onSubmit}>
              <p className="text-justify acct">You are only one step a way from your new password, recover your password now.</p>  
              <div className="form-group">
                  <label>Password:</label>
                  <input className="form-control" 
                  type="password"
                  name="password"
                  id="password" 
                  title="Please enter your new Password"  
                  value={this.state.password} 
                  onChange={this.onChangePassword}
                  minLength="6"maxLength="12" size="12" 
                  placeholder="Enter new Password" required/>
              </div>
              <div className="form-group">
                  <label>Confirm Password:</label>
                  <input className="form-control" 
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm" 
                  title="Please enter your new Password Again"  
                  value={this.state.confirmPassword} 
                  onChange={this.onChangeConfirmPassword}
                  minLength="6"maxLength="12" size="12" 
                  placeholder="Enter new Password Again" required/>
              </div>
              <div className="form-group mt-4 text-center">
                <input type="submit"value="Save new Password" className="btn btn-primary  px-5"/>
              </div>
              
              <p className="text-center mt-5 acct"><Link to="/signin" className="mx-2">Sign In</Link>  or  <Link to="/signup" className="mx-2">Sign Up</Link></p>
            </form>
        
        </div>
        );
    };
};