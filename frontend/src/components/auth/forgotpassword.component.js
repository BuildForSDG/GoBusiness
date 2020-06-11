import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
const PasswordForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required")
});

class Passwordforgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {},
      error_message: null,
      avatar: ""
    };
  }

  submitForm = async formData => {
    await axios
      .post("http://localhost:4000/password/reset", formData)
      .then(res => {
        console.log(res.data.result);
        if (res.data.result === "success") {
          swal("Success!", res.data.message, "success").then(value => {
            //s window.location.reload();
          });
        } else if (res.data.result === "error") {
          swal("Error!", res.data.message, "error");
        }
      })
      .catch(error => {
        console.log(error);
        swal("Error!", "Unexpected error", "error");
      });
  };
  showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue
  }) => {
    return (
      <form className="mt-2 form p-4" onSubmit={handleSubmit}>
        <p className="text-justify acct">Enter your email address below and we'll send you a link to reset your password</p>  
        <div className="form-group">
            <label htmlFor="email">Email address<span className="require mx-1">*</span></label>
            <input
            type="email"
            name="email"
            id="email" 
            title="Please enter your Email address"  
            value={values.email} 
            onChange={handleChange}
            className={
              errors.email && touched.email
              ? "form-control is-invalid"
              : "form-control"
            }
            pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
            placeholder="Enter your Email"/>
            {errors.email && touched.email ? (
              <small id="passwordHelp" className="text-danger">{errors.email}</small>
            ) : null}
        </div>
        <div className="col-sm-12 text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary px-5"
            >
              Reset Password
            </button>
          </div>
        <p className="text-center mt-5 acct"><Link to="/signin" className="mx-2">Sign In</Link>  or  <Link to="/signup" className="mx-2">Sign Up</Link></p>
      </form>
    );
  };

  render() {
    // let result = this.state.response;
    return (
      <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}}>
        <h3 className="text-center mb-4">Forgot Password</h3>
              <Formik
                initialValues={{
                  email: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(values, this.props.history);
                  setSubmitting(false);
                }}
                validationSchema={PasswordForgotSchema}
              >
                {props => this.showForm(props)}
              </Formik>
        </div>          
    );
  }
}

export default Passwordforgot;