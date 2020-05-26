/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';




class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      signUp_firstName: "",
      signUp_lastName: "",
      signUp_phoneNumber: "",
      signUp_email: "",
      signUp_password: "",
      signUp_confirmPassword: "",
  
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
    const newUser = {
      signUp_firstName: this.state.signUp_firstName,
      signUp_lastName: this.state.signUp_lastName,
      signUp_phoneNumber: this.state.signUp_phoneNumber,
      signUp_email: this.state.signUp_email,
      signUp_password: this.state.signUp_password,
      signUp_confirmPassword: this.state.signUp_confirmPassword
    }
    if(this.state.signUp_password !== this.state.signUp_confirmPassword){
      alert("Password donot match!");
    } else {
      console.log(`SignUp Successful`);
      console.log(newUser);
      alert("Signup successful");
      
      this.setState({
        signUp_firstName: "",
        signUp_lastName: "",
        signUp_phoneNumber: "",
        signUp_email: "",
        signUp_password: "",
        signUp_confirmPassword: ""
      });
    };
   
    
   
    /**Api Call should come here using axios*/

   
  }
  render() {
      return (
              <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}}>
                  <h3 className="text-center mb-4">Create an Account</h3>
                  <form className="mt-2 form p-4"  onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name<span className="require mx-1">*</span></label>
                        <input className="form-control" 
                        type="text" 
                        name="firstName"
                        id="firstName"
                        title="Please enter your First name"
                        value={this.state.signUp_firstName}                       
                        onChange={this.onChangeSignUpFirstName}  
                        pattern="[A-Za-z]+$"
                        placeholder="First Name" required  autoFocus />                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name<span className="require mx-1">*</span></label>                      
                        <input className="form-control" 
                        type="text" 
                        name="lastName"
                        id="lastName"
                        title="Please enter your Last name"
                        value={this.state.signUp_lastName}                      
                        onChange={this.onChangeSignUpLastName}  
                        pattern="[A-Za-z]+$"
                        placeholder="Last Name" required />                      
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number<span className="require mx-1">*</span></label>                    
                        <input className="form-control"
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        title="Please enter your Phone number"  
                        value={this.state.signUp_phoneNumber}                     
                        onChange={this.onChangeSignUpPhoneNumber} 
                        pattern="[0]\d{10}$"
                        placeholder="080xxxxxxxx" required />                       
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address<span className="require mx-1">*</span></label>                       
                        <input className="form-control" 
                        type="email"
                        name="email"
                        id="email"
                        title="Please enter your Email address"  
                        value={this.state.signUp_email}                    
                        onChange={this.onChangeSignUpEmail} 
                        pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                        placeholder="joe@example.com" required />                         
                    </div>
                    <div className="form-group">
                      <label className="password">Password ( 6 min and 12 max)<span className="require mx-1">*</span></label>                    
                      <input className="form-control" 
                      type="password" 
                      name="password"
                      id="password"
                      title="Please enter your Password"
                      value={this.state.signUp_password}                   
                      onChange={this.onChangeSignUpPassword}  
                      minLength="6"maxLength="12" size="12"
                      placeholder="Password" required />                     
                    </div>
                    <div className="form-group">
                      <label className="confirmPassword">Confirm Password<span className="require mx-1">*</span></label>                   
                      <input className="form-control" 
                      type="password" 
                      name="confirmPassword"
                      id="confirmPassword"
                      title="Please confirm your Password"
                      value={this.state.signUp_confirmPassword}                 
                      onChange={this.onChangeSignUpPasswordConfirm} 
                      minLength="8" maxLength="12" size="12"
                      placeholder="Confirm Password"  required />                     
                    </div>
                    <div className="form-group">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck"title="Please Check to Agree to the Terms and Conditions" required/>
                        <label className="form-check-label" htmlFor="invalidCheck">Agree to Terms and Conditions</label>
                      </div>
                    </div>
                    <div className="form-group mt-4 text-center">
                      <input type="submit"value="Business" title="Sign up as a Business/SME " className="btn btn-primary m-2 px-5 user"/>
                      <input type="submit"value="Investor" title="Sign up as an Investor" className="btn btn-primary m-2 px-5 user"/>
                    </div>
                    <p className="text-center mt-5 acct">Already have an Account? <Link to="/signin">Sign in</Link></p>
                  </form>
              </div>
            );
        };
};

export default SignUp;
