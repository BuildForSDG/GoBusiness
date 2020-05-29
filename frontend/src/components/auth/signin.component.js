/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component, Children } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator';

import AuthService from "../services/auth.service";
import swal from 'sweetalert';


const required = value => {
  if(!value) {
    return (
      <div className="alert alert-danger" role="alert">This field is required</div>
    );
  }
};


const email = value => {
  if(!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">This is not a valid email.</div>
    );
  }
};


export default class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      signIn_email: "",
      signIn_password: "",
      loading: false,
      message: ""
    };
    this.onChangeSignInEmail = this.onChangeSignInEmail.bind(this);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem("TOKEN_KEY") != null){
      return this.props.history.push('/dashboard');
    }
    let notify = this.props.match.params["notify"]
    if(notify !== undefined){
      if(notify === 'error'){
        swal("Activation Fail please try again !",'',"error")
      } else if(notify === 'success'){
        swal("Activation Success you can signin !", '', "success")
      }
    }
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
      return required;
    }
    console.log(`SignIn Successfully`);
    console.log(userData);
   
    /*Api call should go here using axios */
   
    this.setState({
      message: "",
      loading: true
    });

    //this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.signIn(this.state.signIn_email, this.state.signIn_password)
      .then(() => {
        this.props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
      );
    } else {
      this.setState({
        loading: false
      });
    }

  };

  render() {
    return (
            
            <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}}>
              
                <h3 className="text-center mb-4">Sign into your Account</h3>
                <Form className="mt-2 form p-4" onSubmit={this.onSubmit} validateAll>
                  <div className="text-center">
                    <img className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" />
                  </div>
                  <div className="form-group">
                      <label>Email address<span className="require mx-1">*</span></label>
                      <Input className="form-control" 
                      type="email" 
                      name="email"
                      id="email"
                      title="Please enter your Email address"  
                      value={this.state.signIn_email} 
                      onChange={this.onChangeSignInEmail} 
                      validations={[required, email]}
                      pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                      placeholder="joe@example.com" required/>
                  </div>
                  <div className="form-group">
                      <label>Password<span className="require mx-1">*</span></label>
                      <Input className="form-control" 
                      type="password"
                      name="password"
                      id="password" 
                      value={this.state.signIn_password} 
                      onChange={this.onChangeSignInPassword}
                      validations={[required]}
                      minLength="6"maxLength="12" size="12" 
                      placeholder="Password" required/>
                  </div>
                  <div className="form-group text-center my-4">
                    <button
                      className="btn btn-primary px-5"
                      disabled={this.state.loading}
                    >
                      {this.state.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Sign In</span>
                    </button>
                  </div>
                  {this.state.message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">{this.state.message}</div>
                    </div>
                  )}
                   <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
                 
                  <p className="text-center mt-5 acct">Don't have an Account? <Link to="/signup">Sign up</Link></p>
                </Form>
                <Link to="/forgotpassword"><p className="text-center my-3">Forgot Your Password?</p></Link>
            </div>
    );
  };
};

