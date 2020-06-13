import React,{ Component } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';
import baseURL from '../services/url';


const BusinessSchema = Yup.object().shape({
  name: Yup.string()
    .min(5,"Business Name to Short")
    .max(50,"Business Name to Long")
    .required("Business Name is Required!"),
  description: Yup.string()
    .min(20,"Descriptionis too Short!")
    .max(200,"Description too Long!")
    .required("Business Description is Required!"),
  address: Yup.string()
    .required("Business Address is Required!"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Emailis Required!"), 
  phone: Yup.string()
    .required("Phone Number is Required!"),
  cac_number: Yup.string()
    .required("Business CAC Number is Required!"),
  businessWebsite: Yup.string(),
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
      'Content-Type' : 'application/json',
      'x-auth-token': 'jwtToken'
    }
    axios
      .post(`${baseURL}/business/`, values,{headers: headers})
      .then(res => {
        console.log(res.data);
        console.log(values);
        if(res.data.status === true) {
          swal("Success!",res.data.message,"success")
          .then(value => history.push("/business"));
        } else if (res.data.status === false) {
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
    isSubmitting
  }) => {
    return (
      <form onSubmit={handleSubmit} className="p-4 form mt-2">
         <div className="text-center">
          <p className="required ">All fields marked <span className="require"> * </span> are required</p>
        </div>
        <div className="form-group has-feedback">
            <label htmlFor="name">Business Name<span className="require mx-1">*</span></label>
            <input 
            type="text" 
            name="name"
            id="name"
            title="Please enter your Business name"
            onChange={handleChange}
            value={values.name}
            pattern="[A-Za-z]+$"
            placeholder="Business Name"
            className={
              errors.name && touched.name
              ? "form-control is-invalid"
              : "form-control"
            } 
            required  autoFocus />  
            {errors.name && touched.name ? (
            <small id="passwordHelp" className="text-danger">{errors.name}</small>
            ): null}                     
        </div>
        <div className="form-group has-feedback">
            <label htmlFor="description">Description<span className="require mx-1">*</span></label>                      
            <textarea
            type="text" 
            name="description"
            id="description"
            title="Please enter Business Description"
            onChange={handleChange}
            value={values.description}
            pattern="[A-Za-z]+$"
            placeholder="A Brief Description"
            className={
              errors.description && touched.description
              ? "form-control is-invalid"
              : "form-control"
            }
             required /> 
            {errors.description && touched.description ? (
            <small id="passwordHelp" className="text-danger">{errors.description}</small>
            ): null}                     
        </div>
        <div className="form-group has-feedback">
            <label htmlFor="address">Address<span className="require mx-1">*</span></label>
            <input
            type="text"
            name="address"
            id="address"
            title="Please enter Business Address"
            onChange={handleChange}
            value={values.address}
            placeholder="Business Address"
            className={
              errors.address && touched.address
              ? "form-control is-invalid"
              : "form-control"
            }
            required
            />
             {errors.address && touched.address ? (
            <small id="passwordHelp" className="text-danger">{errors.address}</small>
            ): null}
        </div>
        <div className="form-group hasfeedback">
              <label htmlFor="email">Email<span className="require mx-1">*</span></label>                       
              <input 
              type="email"
              name="email"
              id="email"
              title="Please enter your Email address"  
              onChange={handleChange}
              value={values.email}
              pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              placeholder="joe@example.com"
              className={
                errors.email && touched.email
                ? "form-control is-invalid"
                : "form-control"
              }
               required />
              {errors.email && touched.email ? (
              <small id="passwordHelp" className="text-danger">{errors.email}</small>
              ): null}                         
          </div>
          <div className="form-group hasfeedback">
              <label htmlFor="phone">Phone Number<span className="require mx-1">*</span></label>                    
              <input 
              type="tel"
              name="phone"
              id="phone"
              title="Please enter your Phone number"  
              onChange={handleChange}
              value={values.phone}
              pattern="[0]\d{10}$"
              placeholder="080xxxxxxxx"
              className={
                errors.phone && touched.phone
                ? "form-control is-invalid"
                : "form-control"
              }
              required />
               {errors.phone && touched.phone ? (
              <small id="passwordHelp" className="text-danger">{errors.phone}</small>
              ): null}                       
          </div>
        <div className="form-group has-feedback">
            <label htmlFor="cac_number">CAC Registration Number<span className="require mx-1">*</span></label>
            <input
            type="text"
            name="cac_number"
            id="cac_number"
            title="Please enter your CAC Registration No"
            onChange={handleChange}
            value={values.cac_number}
            maxLength="12"
            size="12"
            
            placeholder="CAC Registration Number"
            className={
              errors.cac_number && touched.cac_number
              ? "form-control is-invalid"
              : "form-control"
            }
            required
            />
             {errors.cac_number && touched.cac_number ? (
              <small id="passwordHelp" className="text-danger">{errors.cac_number}</small>
            ): null}
          </div>
          <div className="form-group has-feedback">
              <label htmlFor="website">Website( Optional )</label>
              <input 
              type="url"
              name="website"
              id="website"
              title="Please enter your Business Website"  
              onChange={handleChange}
              value={values.website}
             pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?"
              placeholder="http://www.example.com"
              className={
                errors.website && touched.website
                ? "form-control is-invalid"
                : "form-control"
              }
              />
               {errors.website && touched.website ? (
               <small id="passwordHelp" className="text-danger">{errors.website}</small>
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
            name: "",
            description: "",
            address: "",
            email: "",
            phone: "",
            cac_number: "",
            website: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.submitForm(values, this.props.history);
            setTimeout(() => {
              setSubmitting(false)
            }, 3000);
          }}
          validationSchema={ BusinessSchema }
          >
            {props => this.showForm(props)}
          </Formik>
        </div>
    );
  }



}