import React,{ Component } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';

const BusinessSchema = Yup.object().shape({
  businessName: Yup.string()
    .min(5,"Business Name to Short")
    .max(50,"Business Name to Long")
    .required("Business Name is Required!"),
  businessDescription: Yup.string()
    .min(20,"Descriptionis too Short!")
    .max(200,"Description too Long!")
    .required("Business Description is Required!"),
  businessAddress: Yup.string()
    .required("Business Address is Required!"),
  businessCacNumber: Yup.string()
    .required("Business CAC Number is Required!"),
  businessWebsite: Yup.string(),
  businessEmail: Yup.string()
    .email("Invalid Email")
    .required("Emailis Required!"),
  businessPhoneNumber: Yup.string()
    .required("Phone Number is Required!")
});

export default class BusinessDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }
  submitForm = (values, history) => {
    const headers = {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'token': 'x-auth-token'
    }
    const baseURL = 'https://gobusiness-backend.herokuapp.com';
    axios
      .post(baseURL + "/auth/signup", values,{headers: headers})
      .then(res => {
        console.log(res.data.result);
        console.log(values);
        if(res.data.result === "success") {
          swal("Success!",res.data.message,"warning")
          .then(value => history.push("/signin"));
        } else if (res.data.message === "error") {
          swal("Error",res.data.message,"error");
        }
      })
      .catch(error => {
        console.log(error);
        swal("Error","Unexpected error","error");
      });
  };
  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting
  }) => {
    return (
      <form onSubmit={handleSubmit} className="p-4 form mt-2">
         <div className="text-center">
          <p className="required ">All fields marked <span className="require"> * </span> are required</p>
        </div>
        <div className="form-group has-feedback">
            <label htmlFor="businessName">Business Name<span className="require mx-1">*</span></label>
            <input 
            type="text" 
            name="businessName"
            id="businessName"
            title="Please enter your Business name"
            onChange={handleChange}
            value={values.businessName}
            pattern="[A-Za-z]+$"
            placeholder="Business Name"
            className={
              errors.businessName && touched.businessName
              ? "form-control is-invalid"
              : "form-control"
            } 
            required  autoFocus />  
            {errors.businessName && touched.businessName ? (
            <small id="passwordHelp" className="text-danger">{errors.businessName}</small>
            ): null}                     
        </div>
        <div className="form-group has-feedback">
            <label htmlFor="businessDescription">Description<span className="require mx-1">*</span></label>                      
            <textarea
            type="text" 
            name="businessDescription"
            id="businessDescription"
            title="Please enter Business Description"
            onChange={handleChange}
            value={values.businessDescription}
            pattern="[A-Za-z]+$"
            placeholder="A Brief Description"
            className={
              errors.businessDescription && touched.businessDescription
              ? "form-control is-invalid"
              : "form-control"
            }
             required /> 
            {errors.businessDescription && touched.businessDescription ? (
            <small id="passwordHelp" className="text-danger">{errors.businessDescription}</small>
            ): null}                     
        </div>
        <div className="form-group has-feedback">
            <label htmlFor="businessAddress">Address<span className="require mx-1">*</span></label>
            <input
            type="text"
            name="businessAddress"
            id="businessAddress"
            title="Please enter Business Address"
            onChange={handleChange}
            value={values.businessAddress}
            placeholder="Business Address"
            className={
              errors.businessAddress && touched.businessAddress
              ? "form-control is-invalid"
              : "form-control"
            }
            required
            />
             {errors.businessAddress && touched.businessAddress ? (
            <small id="passwordHelp" className="text-danger">{errors.businessAddress}</small>
            ): null}
        </div>
        <div className="form-group has-feedback">
            <label htmlFor="businessCacNumber">CAC Registration Number<span className="require mx-1">*</span></label>
            <input
            type="text"
            name="businessCacNumber"
            id="businessCacNumber"
            title="Please enter your CAC Registration No"
            onChange={handleChange}
            value={values.businessCacNumber}
            pattern="[A-za-z0–9]+$"
            placeholder="CAC Registration Number"
            className={
              errors.businessCacNumber && touched.businessCacNumber
              ? "form-control is-invalid"
              : "form-control"
            }
            required
            />
             {errors.businessCacNumber && touched.businessCacNumber ? (
              <small id="passwordHelp" className="text-danger">{errors.businessCacNumber}</small>
            ): null}
          </div>
          <div className="form-group has-feedback">
              <label htmlFor="businessWebsite">Website(Optional)</label>
              <input 
              type="url"
              name="businessWebsite"
              id="businessWebsite"
              title="Please enter your Business Website"  
              onChange={handleChange}
              value={values.businessWebsite}
             pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?"
              placeholder="http://www.example.com"
              className={
                errors.businessWebsite && touched.businessWebsite
                ? "form-control is-invalid"
                : "form-control"
              }
              />
               {errors.businessWebsite && touched.businessWebsite ? (
               <small id="passwordHelp" className="text-danger">{errors.businessWebsite}</small>
               ): null}
          </div>
          <div className="form-group hasfeedback">
              <label htmlFor="businessPhoneNumber">Phone Number<span className="require mx-1">*</span></label>                    
              <input 
              type="tel"
              name="businessPhoneNumber"
              id="businessPhoneNumber"
              title="Please enter your Phone number"  
              onChange={handleChange}
              value={values.businessPhoneNumber}
              pattern="[0]\d{10}$"
              placeholder="080xxxxxxxx"
              className={
                errors.businessPhoneNumber && touched.businessPhoneNumber
                ? "form-control is-invalid"
                : "form-control"
              }
              required />
               {errors.businessPhoneNumber && touched.businessPhoneNumber ? (
              <small id="passwordHelp" className="text-danger">{errors.firstName}</small>
              ): null}                       
          </div>
          <div className="form-group hasfeedback">
              <label htmlFor="businessEmail">Email<span className="require mx-1">*</span></label>                       
              <input 
              type="businessEmail"
              name="businessEmail"
              id="email"
              title="Please enter your Email address"  
              onChange={handleChange}
              value={values.businessEmail}
              pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              placeholder="joe@example.com"
              className={
                errors.businessEmail && touched.businessEmail
                ? "form-control is-invalid"
                : "form-control"
              }
               required />
              {errors.businessEmail && touched.businessEmail ? (
              <small id="passwordHelp" className="text-danger">{errors.businessEmail}</small>
              ): null}                         
          </div>
              <div className="row form-group mt-4 ">
                <div className="col-sm-12">
                  <div className="icheck-primary">
                    <input 
                    type="checkbox"
                    name="tsAndCs" 
                    id="tsAndCs" 
                    title="Please Accept and Coditions"
                    required
                    />
                  <label htmlFor="tsAndCs" className="ml-2">Accept Terms and Conditions</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 text-center mt-3">
                <button
                  disabled={isSubmitting}
                  type="submit" 
                  className="btn btn-primary m-2 px-5 user">Create</button>
              </div>    
          </div>
      </form>
    );
  };
  render() {
    return (   
        <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}} >
          <h3 className="text-center mb-4">Tell Us About Your Business</h3>
          <Formik 
          initialValues={{
            businessName: "",
            businessDescription: "",
            businessAddress: "",
            businessCacNumber: "",
            businessWebsite: "",
            businessEmail: "",
            businessPhoneNumber: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.submitForm(values, this.props.history);
            setSubmitting(false);
          }}
          validationSchema={ BusinessSchema }
          >
            {props => this.showForm(props)}
          </Formik>
        </div>
    );
  }



}