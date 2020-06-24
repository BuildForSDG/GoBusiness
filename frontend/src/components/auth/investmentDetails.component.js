import React,{ Component } from "react";
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';
import baseURL from '../services/url';
import backImg from '../images/arrow-left.svg';


const InvestmentSchema = Yup.object().shape({
  title: Yup.string()
    .min(5,"Title to Short")
    .max(50,"Title to Long")
    .required("Title is Required!"),
  description: Yup.string()
    .min(20,"Description is too Short!")
    .max(200,"Description is too Long!")
    .required("Investment Description is Required!"),
  start_date: Yup.date()
    .required("Start Date is Required!"),
  end_date: Yup.date()
    .required("End Date is Required!"), 
  budget: Yup.number()
    .min(4,"Min Amount is 1000")
    .max(7,"Max Amount is 1000000")
    .required("Budget is Required!"),
  unitCost: Yup.number()
    .min(2,"Min Unit Cost is 10")
    .max(5,"Max Unit Cost is 10000")
    .required("Unit Cost is Required!"),
  interest: Yup.string()
    .min(1,"MIn interest is 1%")
    .max(2,"Max Interest is 50%")
    .required("Interest is Required!")
});

export default class InvestmentDetails extends Component {
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
      .post(`${baseURL}/investments`, values,{headers: headers})
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
        swal("Error","Sorry!,Unexpected Error","error");
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
         <div className="text-justify">
            <Link to={"/business"}><img src={ backImg } /></Link>
          </div>
         <div className="text-center">
          <p className="required ">All fields marked <span className="require"> * </span> are required</p>
        </div>
        <div className="form-group has-feedback">
            <label htmlFor="title">Investment Title<span className="require mx-1">*</span></label>
            <input 
            type="text" 
            name="title"
            id="title"
            title="Please enter your Investment Title"
            onChange={handleChange}
            value={values.title}
            pattern="[A-Za-z]+$"
            placeholder="Investment Title"
            className={
              errors.title && touched.title
              ? "form-control is-invalid"
              : "form-control"
            } 
            required  autoFocus />  
            {errors.title && touched.title ? (
            <small id="passwordHelp" className="text-danger">{errors.title000}</small>
            ): null}                     
        </div>
        <div className="form-group has-feedback">
            <label htmlFor="description">Description<span className="require mx-1">*</span></label>                      
            <textarea
            type="text" 
            name="description"
            id="description"
            title="Please enter Investment Description"
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
            <label htmlFor="start_date">Start Date<span className="require mx-1">*</span></label>
            <input
            type="date"
            name="start_date"
            id="start_date"
            title="Please enter Start Date"
            onChange={handleChange}
            value={values.start_date}
            className={
              errors.start_date && touched.start_date
              ? "form-control is-invalid"
              : "form-control"
            }
            required
            />
             {errors.start_date && touched.start_date ? (
            <small id="passwordHelp" className="text-danger">{errors.start_date}</small>
            ): null}
        </div>
        <div className="form-group hasfeedback">
              <label htmlFor="end_date">End Date<span className="require mx-1">*</span></label>                       
              <input 
              type="date"
              name="end_date"
              id="end_date"
              title="Please enter End Date"  
              onChange={handleChange}
              value={values.end_date}
              className={
                errors.end_date && touched.end_date
                ? "form-control is-invalid"
                : "form-control"
              }
               required />
              {errors.end_date && touched.end_date ? (
              <small id="passwordHelp" className="text-danger">{errors.end_date}</small>
              ): null}                         
          </div>
          <div className="form-group hasfeedback">
              <label htmlFor="budget">Budget ( in Naira )<span className="require mx-1">*</span></label>                    
              <input 
              type="number"
              name="budget"
              id="budget"
              title="Please enter a Budget"  
              onChange={handleChange}
              value={values.budget}
              pattern="^(0|[1-9][0-9]*)$"
              placeholder="5000"
              minLength="4"
              maxLength="7"
              size="7"
              className={
                errors.budget && touched.budget
                ? "form-control is-invalid"
                : "form-control"
              }
              required />
               {errors.budget && touched.budget ? (
              <small id="passwordHelp" className="text-danger">{errors.budget}</small>
              ): null}                       
          </div>
        <div className="form-group has-feedback">
            <label htmlFor="unitCost">Unit Cost ( in Naira )<span className="require mx-1">*</span></label>
            <input
            type="number"
            name="unitCost"
            id="unitCost"
            title="Please enter Unit Cost"
            onChange={handleChange}
            value={values.unitCost}
            pattern="^(0|[1-9][0-9]*)$"
            minLength="2"
            maxLength="5"
            size="5"
            placeholder="500"
            className={
              errors.unitCost && touched.unitCost
              ? "form-control is-invalid"
              : "form-control"
            }
            required
            />
             {errors.unitCost && touched.unitCost ? (
              <small id="passwordHelp" className="text-danger">{errors.unitCost}</small>
            ): null}
          </div>
          <div className="form-group has-feedback">
              <label htmlFor="interest">Interest ( % )</label>
              <input 
              type="text"
              name="interest"
              id="interest"
              title="Please enter an Interest"  
              onChange={handleChange}
              value={values.interest}
              placeholder="10"
              minLength="1"
              maxLength="2"
              size="2"
              className={
                errors.interest && touched.interest
                ? "form-control is-invalid"
                : "form-control"
              }
              />
               {errors.interest && touched.interest ? (
               <small id="passwordHelp" className="text-danger">{errors.interest}</small>
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
          <div className="text-center">
            <Link to={"/business"}>Go Back</Link>
          </div>
      </form>
    );
  };
  render() {
    return (   
        <div className="col-sm-12 col-md-6 col-lg-5 mb-3" style={{marginTop: 10}} >
          <h3 className="text-center mb-4">Request Investment</h3>
          <Formik 
          initialValues={{
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            budget: "",
            unitCost: "",
            interest: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.submitForm(values, this.props.history);
            setTimeout(() => {
              setSubmitting(false)
            }, 5000);
          }}
          validationSchema={ InvestmentSchema }
          >
            {props => this.showForm(props)}
          </Formik>
        </div>
    );
  }



}