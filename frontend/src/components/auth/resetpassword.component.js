import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const PasswordresetSchema = Yup.object().shape({
  password: Yup.string().required("New Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Both password need to be the same"
  )
});

class Passwordreset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {},
      error_message: null,
      avatar: ""
    };
  }

  submitForm = async (values, history, token) => {
    await axios
      .put("http://localhost:8080/password/reset?token=" + token, values)
      .then(res => {
        if (res.data.result === "success") {
          swal("Success!", res.data.message, "success").then(value => {
            history.push("/login");
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
              <p className="text-justify acct">You are only one step a way from your new password, recover your password now.</p>  
              <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input 
                  type="password"
                  name="password"
                  id="password" 
                  title="Please enter your new Password"  
                  value={values.password} 
                  onChange={handleChange}
                  className={
                    errors.password && touched.password
                    ? "form-control is-invalid"
                    : "form-control"
                  }
                  minLength="6"maxLength="12" size="12" 
                  placeholder="Enter new Password" required/>
                  {errors.password && touched.password ? (
                    <small id="passwordHelp" className="text-danger">{errors.password}</small>
                  ) : null}
              </div>
              <div className="form-group">
                  <label htmlFor="passwordConfirm">Confirm Password:</label>
                  <input 
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm" 
                  title="Please enter your new Password Again"  
                  value={values.confirm_password} 
                  onChange={handleChange}
                  className={
                    errors.confirm_password && touched.confirm_password
                    ? "form-control is-invalid"
                    : "form-control"
                  }
                  minLength="6"maxLength="12" size="12" 
                  placeholder="Enter new Password Again" required/>
                  {errors.confirm_password && touched.confirm_password ? (
                    <small id="passwordHelp" className="text-danger">{errors.confirm_password}</small>
                  ) : null}
              </div>
              <div className="col-sm-12 text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary px-5"
            >
              Save new Password
            </button>
          </div>
              
              <p className="text-center mt-5 acct"><Link to="/signin" className="mx-2">Sign In</Link>  or  <Link to="/signup" className="mx-2">Sign Up</Link></p>
            </form>
        
    );
  };

  render() {
    return (
      <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}}>
        <h3 className="text-center mb-4">Reset Password</h3>
              <Formik
                initialValues={{
                  password: ""
                }}
                onSubmit={(values, { setSubmitting }) => {
                  this.submitForm(
                    values,
                    this.props.history,
                    this.props.match.params["token"]
                  );
                  setSubmitting(true);
                  setTimeout(() => {
                    setSubmitting(false)
                  }, 3000);
                }}
                validationSchema={PasswordresetSchema}
              >
               
                {props => this.showForm(props)}
              </Formik>
      </div>            
    );
  }
}

export default Passwordreset;