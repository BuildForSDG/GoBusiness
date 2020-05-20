/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';




export default class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      signUp_firstName: "",
      signUp_lastName: "",
      signUp_email: "",
      signUp_phoneNumber: "",
      signUp_password: "",
      signUp_confirmPassword: ""
    };
    this.onChangeSignUpFirstName = this.onChangeSignUpFirstName.bind(this);
    this.onChangeSignUpLastName = this.onChangeSignUpLastName.bind(this);
    this.onChangeSignUpEmail = this.onChangeSignUpEmail.bind(this);
    this.onChangeSignUpPhoneNumber = this.onChangeSignUpPhoneNumber.bind(this);
    this.onChangeSignUpPassword = this.onChangeSignUpPassword.bind(this);
    this.onChangeSignUpPasswordConfirm = this.onChangeSignUpPasswordConfirm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
 
  onChangeSignUpFirstName(e){
    this.setState({
      signUp_firstName: e.target.value
    })
  }
  onChangeSignUpLastName(e){
    this.setState({
      signUp_lastName: e.target.value
    })
  }
  onChangeSignUpPhoneNumber(e){
    this.setState({
      signUp_phoneNumber: e.target.value
    })
  }
  onChangeSignUpEmail(e){
      this.setState({
        signUp_email: e.target.value
      })
   
  }
  onChangeSignUpPassword(e){
    this.setState({
      signUp_password: e.target.value
    })
  }
  onChangeSignUpPasswordConfirm(e){
    this.setState({
      signUp_confirmPassword: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    console.log(`SignUp Form submitted`);
    console.log(`SignUp FirstName: ${this.state.signUp_firstName}`);
    console.log(`SignUp LastName: ${this.state.signUp_lastName}`);
    console.log(`SignUp PhoneNumber: ${this.state.signUp_phoneNumber}`);
    console.log(`SignUp Email: ${this.state.signUp_email}`);
    console.log(`SignUp Password: ${this.state.signUp_password}`);
    console.log(`SignUp ConfirmPassword: ${this.state.signUp_confirmPassword}`);

    const data = this.state;
   
    /**Api Call should come here using axios*/

    this.setState({
      signUp_firstName: "",
      signUp_lastName: "",
      signUp_phoneNumber: "",
      signUp_email: "",
      signUp_password: "",
      signUp_confirmPassword: ""
    })
  }
  render() {
      return (
              <div className="col-sm-12 mb-3" style={{marginTop: 10}}>
                  <h3 className="text-center mb-4">Create an Account</h3>
                  <form className="mt-2 form p-4"onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name<span className="require mx-1">*</span></label>
                        <input className="form-control" 
                        type="text" value={this.state.signUp_firstName} onChange={this.onChangeSignUpFirstName}  pattern="[A-Za-z]+$"
                        placeholder="First Name" required  autoFocus/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name<span className="require mx-1">*</span></label>
                        <input className="form-control" 
                        type="text" value={this.state.signUp_lastName} onChange={this.onChangeSignUpLastName}  pattern="[A-Za-z]+$"
                         placeholder="Last Name" required />
                       
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number<span className="require mx-1">*</span></label>
                        <input className="form-control"
                        type="tel"  value={this.state.signUp_phoneNumber} onChange={this.onChangeSignUpPhoneNumber} pattern="[0]\d{10}$"
                        placeholder="080xxxxxxxx" required />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address<span className="require mx-1">*</span></label>
                        <input className="form-control" 
                        type="email"  value={this.state.signUp_email} onChange={this.onChangeSignUpEmail} pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                        placeholder="joe@example.com" required 
                         />
                         
                    </div>
                    <div className="form-group">
                      <label className="password">Password ( 6 min and 12 max)<span className="require mx-1">*</span></label>
                      <input className="form-control" 
                      type="password" value={this.state.signUp_password} onChange={this.onChangeSignUpPassword}  minLength="6"maxLength="12" size="12"
                      placeholder="Password" required />
                     
                    </div>
                    <div className="form-group">
                      <label className="confirmPassword">Confirm Password<span className="require mx-1">*</span></label>
                      <input className="form-control" 
                      type="password" value={this.state.signUp_confirmPassword} onChange={this.onChangeSignUpPasswordConfirm} minLength="8" maxLength="12" size="12"
                      placeholder="Confirm Password"  required/>
                     
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                        <label className="form-check-label" htmlFor="invalidCheck">Agree to terms and conditions</label>
                      </div>
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
