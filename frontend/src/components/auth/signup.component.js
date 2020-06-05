import React,{ Component } from "react";
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is Required!"),
  lastName: Yup.string()
    .required("Last Name is Required!"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required!"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is Required!"),
  type: Yup.string()
    .required("Select an Option!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
  confirm_password: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Passwords do not Match!"
    ),
  
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }

  submitForm = (values, history) => {
    const headers = {
      'Content-Type' : 'application/x-www-form-urlenconded',
    }
    const baseURL = 'https://gobusiness-backend.herokuapp.com/';
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
          <label htmlFor="firstName">First Name<span className="require">*</span></label>
          <input 
            type="text" 
            name="firstName"
            id="firstName"
            title="Please enter your First name"
            onChange={handleChange}
            value={values.firstName}
            placeholder="First Name"
            pattern="[A-Za-z]+$"
            className={
              errors.firstName && touched.firstName
              ? "form-control is-invalid"
              : "form-control"
            }
            autoFocus
            required
          />
          {errors.firstName && touched.firstName ? (
            <small id="passwordHelp" className="text-danger">{errors.firstName}</small>
          ): null}
        </div>
        <div className="form-group has-feedback">
          <label>Last Name<span className="require">*</span></label>
          <input 
            type="text" 
            name="lastName"
            id="lastName"
            title="Please enter your Last name"
            onChange={handleChange}
            value={values.lastName}
            placeholder="Last Name"
            pattern="[A-Za-z]+$"
            className={
              errors.lastName && touched.lastName
              ? "form-control is-invalid"
              : "form-control"
            }
            required
          />
          {errors.firstName && touched.firstName ? (
            <small id="passwordHelp" className="text-danger">{errors.firstName}</small>
          ): null}
        </div>
        <div className="form-group has-feedback">
          <label>Phone Number<span className="require">*</span></label>
          <input 
            type="tel" 
            name="phoneNumber"
            id="phoneNumber"
            title="Please enter your Phone number"
            onChange={handleChange}
            value={values.phoneNumber}
            placeholder="080xxxxxxxx"
            pattern="[0]\d{10}$"
            className={
              errors.phoneNumber && touched.phoneNumber
              ? "form-control is-invalid"
              : "form-control"
            }
            required
          />
          {errors.phoneNumber && touched.phoneNumber ? (
            <small id="passwordHelp" className="text-danger">{errors.lastName}</small>
          ): null}
        </div>
        <div className="form-group has-feedback">
          <label htmlFor="email">Email<span className="require">*</span></label>
          <input 
            type="email" 
            name="email"
            id="email"
            title="Please enter your Email"
            onChange={handleChange}
            value={values.email}
            placeholder="joe@examole.com"
            pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            className={
              errors.email && touched.email
              ? "form-control is-invalid"
              : "form-control"
            }
            required
          />
          {errors.email && touched.email ? (
            <small id="passwordHelp" className="text-danger">{errors.email}</small>
          ): null}
        </div>
        <div className="form-group has-feedback">
          <label htmlFor="type">Type<span className="require">*</span></label>
          <select 
            type="select"
            name="type"
            id="type"
            title="Please select an Option"
            onChange={handleChange}
            value={values.type}
            placeholder="Select an Option"
            className={
              errors.type && touched.type
              ? "form-control is-invalid"
              : "form-control"
            }
            required
          >
            <option value=""></option>
            <option value="Business">Business</option>
            <option value="Investor">Investor</option>
          </select>
          {errors.type && touched.type ? (
            <small id="passwordHelp" className="text-danger">{errors.type}</small>
          ): null}
        </div>
        <div className="form-group has-feedback">
          <label htmlFor="password">Password<span className="pass"><span className="require">* </span>( 6 min and 12 max characters )</span></label>
          <input 
            type="password" 
            name="password"
            id="password"
            title="Please enter your Password"
            onChange={handleChange}
            value={values.password}
            placeholder="Password"
            minLength="6"
            maxLength="12"
            size="12"
            className={
              errors.password && touched.password
              ? "form-control is-invalid"
              : "form-control"
            }
            required
          />
          {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">{errors.password}</small>
          ): null}
        </div>
        <div className="form-group has-feedback">
          <label>Confirm Password<span className="require">*</span></label>
          <input 
            type="password" 
            name="confirm_password"
            id="confirm_password"
            title="Please Confirm your Password"
            onChange={handleChange}
            value={values.confirm_password}
            placeholder="Confirm Password"
            minLength="6"
            maxLength="12"
            size="12"
            className={
              errors.confirm_password && touched.confirm_password
              ? "form-control is-invalid"
              : "form-control"
            }
            required
          />
          {errors.confirm_password && touched.confirm_password ? (
            <small id="passwordHelp" className="text-danger">{errors.confirm_password}</small>
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
              className="btn btn-primary m-2 px-5 user">Sign Up</button>
              <p className="text-center mt-5 acct">Already have an Account? <Link to="/signin">Sign in</Link></p>
            </div>
        </div>
      </form>
    );
  };

  render() {
    return (   
        <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}} >
          <h3 className="text-center mb-4">Create an Account</h3>
          <Formik 
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            type: "",
            password: "",
            confirm_password: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.submitForm(values, this.props.history);
            setSubmitting(false);
          }}
          validationSchema={SignupSchema}
          >
            {props => this.showForm(props)}
          </Formik>
        </div>
    );
  }
}

export default SignUp;
