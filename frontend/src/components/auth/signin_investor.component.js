import React,{ Component } from "react";
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';
import ProfileImg from '../images/avataaars (4).svg';
import baseURL from '../services/url';


const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is Required!"),
  password: Yup.string()
    .required("Password is Required"),
});

class SignInInvestor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
      password:"",
      alert: null
    };
  }
  componentDidMount(){
    if(localStorage.getItem("jwtToken") != null){
      return this.props.history.push('/investor');
    }
    let notify = this.props.match.params["notify"]
    if(notify !== undefined){
      if(notify === "error"){
        swal("Activation Fail please try again!", '', "error")
      } else if(notify === 'success'){
        swal("Activation Success youcan Signin!", '', "success")
      }
    }
  }

  submitForm = async (values,history) => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": "jwtToken"
    }
    await axios
      .post(`${baseURL}/auth/login`, values, {headers: headers})
      .then(res => {
        console.log(res.data);
        console.log(values);
        if(res.data.status === true) {
          localStorage.setItem("jwtToken", res.data.token);
          swal("Success!", res.data.message, "success")
          .then(value => {
            history.push('/investor');
          });
        } else if (res.data.status === false) {
          swal("Error!", res.data.error, "error");
        }
      })
      .catch(error => {
        console.log(error);
        return swal("Error!", error.message, "error");
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
           <img className="profile-img-card" src={ProfileImg} alt="profile-img" />
        </div>
        <div className="form-group has-feedback">
          <label htmlFor="email">Email</label>
            <input 
              type="email" 
              name="email"
              id="email"
              title="Please enter your Email"
              onChange={handleChange}
              value={values.email}
              placeholder="Email"
              pattern="[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              className={
                errors.email && touched.email
                ? "form-control is-invalid"
                : "form-control"
              }
              autoFocus
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-user"></span>
              </div>
            </div>
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
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div>
          {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">{errors.password}</small>
          ): null}
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="icheck-primary">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2">Remember Me</label>
            </div>
          </div>
          <div className="col-sm-12 text-center mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary px-5"
            >
              Sign In
            </button>
          </div>
        </div>
        <p className="text-center mt-3 acct">Don't have an Account? <Link to="/signup/investor">Sign up</Link></p>
      </form>
    );
  };

  render() {
    return (
      <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}} >
          <h3 className="text-center mb-4">Welcome Back investor</h3>
           
          <Formik 
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.submitForm(values, this.props.history);
            setTimeout(() => {
              setSubmitting(false)
            }, 3000);
          }}
          validationSchema={SigninSchema}
          >
            {props => this.showForm(props)}
          </Formik>
          
          <Link to="/password/forgot"><p className="text-center my-2">Forgot Your Password?</p></Link>
        </div>
        
    )
  }
}

export default SignInInvestor;