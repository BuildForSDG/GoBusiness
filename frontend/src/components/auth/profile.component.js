import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import swal from "sweetalert";
import baseURL from '../services/url';

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const ProfileSchema = Yup.object().shape({
  avatars: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File too large",
      value => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  firstname: Yup.string()
    .min(2, "firstname is Too Short!")
    .max(30, "firstname is Too Long!")
    .required("firstname is Required"),
  lastname: Yup.string()
    .min(2, "lastname is Too Short!")
    .max(30, "lastname is Too Long!")
    .required("lastname is Required"),
  phone: Yup.number("Phone number is use only number")
    .min(10, "Phone number must be 10 characters!")
    .required("Phone number is Required"),
  address: Yup.string()
    .min(12, "address is Too Short!")
    .max(50, "address is Too Long!")
    .required("address is Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is Required")
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {},
      error_message: null,
      avatar: ""
    };
  }

  parseJwt() {
    let token = localStorage.getItem("jwtToken");
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  componentDidMount() {
    let { id } = this.parseJwt();
    this.getData(id);
  }

  showPreviewImage = values => {
    console.log(this.state.response.avatar);
    return (
      <div className="text-center">
        <img
          id="avatars"
          src={
            values.file_obj != null
              ? values.file_obj
              : "http://localhost:8080/images/user.png"
          }
          className="profile-user-img img-fluid img-circle"
          alt=""
          width={100}
        />
      </div>
    );
  };
  getData = async id => {
    await axios
      .get(`${baseURL}/profile/id/` + id)
      .then(response => {
        console.log(response.data);
        document.getElementById("avatars").src = `${baseURL}/images/`+response.data.avatars
        // profile.setAttribute("src",);
        this.setState({ response: response.data });
      })
      .catch(error => {
        this.setState({ error_message: error.message });
      });
  };
  submitForm = async formData => {
    await axios
      .put(`${baseURL}/profile`, formData)
      .then(res => {
        console.log(res.data.result);
        if (res.data.status === true) {
          swal("Success!", res.data.message, "success").then(value => {
            this.props.history.push("/business")
          });
        } else if (res.data.status === false) {
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
      <form onSubmit={handleSubmit} className="p-4 form mt-2">
        {this.showPreviewImage(values)}
        <div className="text-center">
          <p className="required ">All fields marked <span className="require"> * </span> are required</p>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputFile">Photo upload</label>
            <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  onChange={e => {
                    e.preventDefault();
                    setFieldValue("avatars", e.target.files[0]); // for upload
                    setFieldValue(
                      "file_obj",
                      URL.createObjectURL(e.target.files[0])
                    ); // for preview image
                  }}
                  name="avatars"
                  className={
                    errors.email && touched.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  accept="image/*"
                  id="avatars"
                  
                />
                <label className="custom-file-label" htmlFor="exampleInputFile">
                  Choose file
                </label>
              </div>
            </div>
          </div>
        <div className="form-group has-feedback">
          <label htmlFor="firstname">First Name<span className="require">*</span></label>
          <input 
            type="text" 
            name="firstname"
            id="firstname"
            title="Please enter your First name"
            onChange={handleChange}
            value={values.firstname}
            placeholder="First Name"
            pattern="[A-Za-z]+$"
            className={
              errors.firstname && touched.firstname
              ? "form-control is-invalid"
              : "form-control"
            }
            autoFocus
            required
          />
          {errors.firstname && touched.firstname ? (
            <small id="passwordHelp" className="text-danger">{errors.firstname}</small>
          ): null}
        </div>
        <div className="form-group has-feedback">
          <label htmlFor="lastname">Last Name<span className="require">*</span></label>
          <input 
            type="text" 
            name="lastname"
            id="lastname"
            title="Please enter your Last name"
            onChange={handleChange}
            value={values.lastname}
            placeholder="Last Name"
            pattern="[A-Za-z]+$"
            className={
              errors.lastname && touched.lastname
              ? "form-control is-invalid"
              : "form-control"
            }
            required
          />
          {errors.lastname && touched.lastname ? (
            <small id="passwordHelp" className="text-danger">{errors.lastname}</small>
          ): null}
        </div>
        <div className="form-group has-feedback">
          <label htmlFor="phone">Phone Number<span className="require">*</span></label>
          <input 
            type="tel" 
            name="phone"
            id="phone"
            title="Please enter your Phone number"
            onChange={handleChange}
            value={values.phone}
            placeholder="080xxxxxxxx"
            maxLength="11"
            size="11"
            pattern="[0]\d{10}$"
            className={
              errors.phone && touched.phone
              ? "form-control is-invalid"
              : "form-control"
            }
            required
          />
          {errors.phone && touched.phone ? (
            <small id="passwordHelp" className="text-danger">{errors.phone}</small>
          ): null}
        </div>
        <div className="form-group has-feedback">
          <label htmlFor="email">Address<span className="require">*</span></label>
          <input 
            type="address" 
            name="address"
            id="address"
            title="Please enter your Address"
            onChange={handleChange}
            value={values.address}
            placeholder="e.g No 5,Benin Str,Akure,Ondo State"
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
        <div className="form-group has-feedback">
          <label htmlFor="email">Email<span className="require">* </span></label>
          <input 
            type="email" 
            name="email"
            id="email"
            title="Please enter your Password"
            onChange={handleChange}
            value={values.email}
            placeholder="joe@example.com"
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
        <div className="row form-group mt-4 ">
            <div className="col-sm-12 col-md-12 text-center mt-3">
              <button
              disabled={isSubmitting}
              type="submit" 
              className="btn btn-primary m-2 px-5 user">Save</button>
            </div>
        </div>
        <div className="text-center">
          <Link to="/business">Go Back</Link>
        </div>
      </form>
    );
  };

  render() {
    let result = this.state.response;
    console.log(result);
    return (   
        <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}} >
          <h3 className="text-center mb-4">Update Profile</h3>
          <Formik
                    enableReinitialize={true}
                    initialValues={
                      result
                        ? result
                        : {
                            id: "",
                            username: "",
                            email: "",
                            first_name: "",
                            last_name: "",
                            phone: "",
                            address: ""
                          }
                    }
                    onSubmit={(values, { setSubmitting }) => {
                      let formData = new FormData();
                      formData.append("firstname", values.firstname);
                      formData.append("lastname", values.lastname);
                      formData.append("phone", values.phone);
                      formData.append("address", values.address);
                      formData.append("email", values.email);
                      if (values.avatars) {
                        formData.append("avatars", values.avatars);
                      }
                      console.log(values.avatars);
                      this.submitForm(formData, this.props.history);
                      setTimeout(() => {
                        setSubmitting(false)
                      }, 5000);
                    }}
          validationSchema={ProfileSchema}
          >
            {props => this.showForm(props)}
          </Formik>
        </div>
    
    );
  }
}

export default Profile;