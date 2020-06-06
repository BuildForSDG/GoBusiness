import React, { Component } from 'react';
import { Link } from'react-router-dom';


import AccountUserImg from '../images/user.svg';
import RequestImg from '../images/dollar-sign.svg';
import DetailsImg from '../images/folder.svg';
import MyInvestTmg from '../images/briefcase (2).svg';




export default class BusinessUser extends Component {

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 text-justify mt-3">
                        <img className="img-fluid" src={ AccountUserImg } />
                        <h3>Business Dashboard</h3>
                    </div>
                       
                </div>
                <div className="row">
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ DetailsImg } />
                                <p>Business Profile</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Create</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ AccountUserImg } />
                                <p>Personal Profile</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Update profile</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ RequestImg } />
                                <p>Investment Request</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Make Request</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ MyInvestTmg } />
                                <p>Investment</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">View</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}