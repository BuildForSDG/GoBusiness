import React, { Component } from 'react';
import { Link } from'react-router-dom';


import AccountUserImg from '../images/user.svg';
import RequestImg from '../images/dollar-sign.svg';
import DetailsImg from '../images/folder.svg';
import MyInvestTmg from '../images/briefcase (2).svg';





export default class BusinessUser extends Component {

    render(){
        return (
            <div className="container business">
                <div className="row">
                    <div className="col-sm-12 col-md-6 text-justify mt-3">
                        <h3>Business Dashboard</h3>
                    </div>
                       
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ DetailsImg } alt="" />
                                <p>Business Profile</p>
                            </div>
                            <Link to="/business/details" className="pl-3 small-box-footer">Create</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ AccountUserImg } alt="" />
                                <p>Personal Profile</p>
                            </div>
                            <Link to="/profile" className="pl-3 small-box-footer">Update</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ RequestImg } alt="" />
                                <p>Investment Request</p>
                            </div>
                            <Link to="/business/investment/details" className="pl-3 small-box-footer">Request</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ MyInvestTmg } alt="" />
                                <p>Investors</p>
                            </div>
                            <Link to="#" className="pl-3  small-box-footer">View</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}