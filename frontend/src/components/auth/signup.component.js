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
  password: Yup.string()
    .required("Password is Required"),
  confirm_password: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Both password need to be the same!"
    )
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  }

  submitForm = (values, history) => {
    axios
      .post("http://localhost:4000/auth/signup", values)
      .then(res => {
        console.log(res.data.result);
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
        <div className="form-group has-feedback">
          <label htmlFor="firstName">First Name</label>
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
          <label>Last Name</label>
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
          <label>Phone Number</label>
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
          <label>Email</label>
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
          <label>Password</label>
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
          <label>Confirm Password</label>
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
        <div className="row form-group mt-4 text-center">
            <div className="col-sm-12 col-md-12">
              <button
              disabled={isSubmitting}
              type="submit" 
              className="btn btn-primary m-2 px-5 user">Submit</button>
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
            password: "",
            confirm_password: ""
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
