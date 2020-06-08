import React , { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import TextArea from 'react-validation/build/textarea';
import { isEmail } from 'validator';
import swal from 'sweetalert';

import AuthService from '../services/auth.service';


const required = value => {
    if(!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const email = value => {
    if(!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      )
    }
  } 


export default class BizDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            biz_name: "",
            biz_description: "",
            biz_address: "",
            biz_cacNumber: "",
            biz_website: "",
            biz_email: "",
            biz_phoneNumber: ""
        };
        this.onChangeBizName = this.onChangeBizName.bind(this);
        this.onChangeBizDescription = this.onChangeBizDescription.bind(this);
        this.onChangeBizAddress = this.onChangeBizAddress.bind(this);
        this.onChangeBizCacNumber = this.onChangeBizCacNumber.bind(this);
        this.onChangeBizWebsite = this.onChangeBizWebsite.bind(this);
        this.onChangeBizEmail = this.onChangeBizEmail.bind(this);
        this.onChangeBizPhoneNumber = this.onChangeBizPhoneNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    
    onChangeBizName(e){
        this.setState({
            biz_name: e.target.value
        })
    }

    onChangeBizDescription(e){
        this.setState({
            biz_description: e.target.value
        })
    }

    onChangeBizAddress(e){
        this.setState({
            biz_address: e.target.value
        })
    }

    onChangeBizCacNumber(e){
        this.setState({
            biz_cacNumber: e.target.value
        })
    }

    onChangeBizWebsite(e){
        this.setState({
            biz_website: e.target.value
        })
    }

    onChangeBizEmail(e){
        this.setState({
            biz_email: e.target.value
        })
    }

    onChangeBizPhoneNumber(e){
        this.setState({
            biz_phoneNumber: e.target.value
        })
    }

    onSubmit(e){
       e.preventDefault(e);
       const bizDetails = {
           biz_name: this.state.biz_name,
           biz_description: this.state.biz_description,
           biz_address: this.state.biz_address,
           biz_cacNumber: this.state.biz_cacNumber,
           biz_website: this.state.biz_website,
           biz_email: this.state.biz_email,
           biz_phoneNumber: this.state.biz_phoneNumber          
       };
       if(!this.state.biz_name || !this.state.biz_description || !this.state.biz_address || !this.state.biz_cacNumber
        || !this.state.biz_email || !this.state.biz_phoneNumber ) {
            swal("Aw!","All fields are Required","error");
       } else {
        console.log(bizDetails);
        /**Api Call here */
        this.setState({
          message: "",
          successful: false
        });

        if(this.checkBtn.context._errors.length === 0) {
          AuthService.bizDetails(
            this.state.biz_name,
            this.state.biz_description,
            this.state.biz_address,
            this.state.biz_cacNumber,
            this.state.biz_email,
            this.state.biz_phoneNumber
          ).then(
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              });
            },
            error => {
              const resMessage = 
              (
                error.response && error.response.data && 
                error.response.data.message
              ) || error.message || error.toString();
              this.setState({
                successful: false,
                message: resMessage
              });
            }
          );
        }


       }
    };
    render(){
        return (
            <div className="col-sm-12 col-md-6 col-lg-5 mb-3 " style={{marginTop: 10}}>
            <h3 className="text-center mb-4">Tell us About your Business</h3>
            <Form className="mt-2 form p-4"  onSubmit={this.onSubmit} ref={c => {this.form = c;}}>
              {!this.state.successful && (
              <div>
                <div className="text-center">
                  <p className="required ">All fields marked <span className="require"> * </span> are required</p>
                </div>
                <div className="form-group">
                  <label htmlFor="bizName">Business Name<span className="require mx-1">*</span></label>
                  <Input className="form-control" 
                  type="text" 
                  name="bizName"
                  id="bizName"
                  title="Please enter your Business name"
                  value={this.state.biz_name}                       
                  onChange={this.onChangeBizName}  
                  pattern="[A-Za-z]+$"
                  placeholder="Business Name" required  autoFocus />                        
              </div>
              <div className="form-group">
                  <label htmlFor="bizDescription">Description<span className="require mx-1">*</span></label>                      
                  <TextArea className="form-control" 
                  type="text" 
                  name="bizDescription"
                  id="bizDescription"
                  title="Please enter Business Description"
                  value={this.state.biz_description}                      
                  onChange={this.onChangeBizName}  
                  pattern="[A-Za-z]+$"
                  placeholder="Describe Your Business" required />                      
              </div>
              <div className="form-group">
                  <label htmlFor="bizAddress">Address<span className="require mx-1">*</span></label>
                  <Input className="form-control"
                  type="text"
                  name="bizAddress"
                  id="bizAddress"
                  title="Please enter Business Address"
                  value={this.state.biz_address}
                  onChange={this.onChangeBizAddress}
                  placeholder="Business Address"
                  required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="cacNumber">CAC Registration Number<span className="require mx-1">*</span></label>
                  <Input className="form-control"
                  type="text"
                  name="cacNumber"
                  id="cacNumber"
                  title="Please enter your CAC Registration No"
                  value={this.state.biz_cacNumber}
                  onChange={this.onChangeBizCacNumber}
                  pattern="[A-za-z0–9_]"
                  placeholder="CAC Registration Number"
                  required
                  />
              </div>
              <div>
                  <label htmlFor="website">Website(Optional)</label>
                  <Input className="form-control"
                  type="text"
                  name="website"
                  id="website"
                  title="Please enter your Business Website"  
                  value={this.state.biz_website}                     
                  onChange={this.onChangeBizWebsite} 
                  pattern="@^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$@i"
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number<span className="require mx-1">*</span></label>                    
                  <Input className="form-control"
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  title="Please enter your Phone number"  
                  value={this.state.biz_phoneNumber}                     
                  onChange={this.onChangeBizPhoneNumber} 
                  pattern="[0]\d{10}$"
                  placeholder="080xxxxxxxx" required />                       
              </div>
              <div className="form-group">
                  <label htmlFor="email">Email<span className="require mx-1">*</span></label>                       
                  <Input className="form-control" 
                  type="email"
                  name="email"
                  id="email"
                  title="Please enter your Email address"  
                  value={this.state.biz_email}                    
                  onChange={this.onChangeBizEmail} 
                  validations={[required, email]}
                  pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                  placeholder="joe@example.com" required />                         
              </div>
              
              <div className="form-group">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck"title="Please Check to Agree to the Terms and Conditions" required/>
                  <label className="form-check-label" htmlFor="invalidCheck">Agree to Terms and Conditions</label>
                </div>
              </div>
              <div className="col-sm-12 text-center mt-4">
            <button
              type="submit"
              className="btn btn-primary px-5"
            >
              Create
            </button>
          </div>
                </div>
              )}
              {this.state.message && (
                <div className="form-group">
                  <div className={
                    this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                  }
                  role="alert"
                  > 
                      {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton 
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
              />
            </Form>
        </div>
        )
    }
}
