import React, { Component } from 'react';
import { Link } from'react-router-dom';


import AccountUserImg from '../images/user.svg';
import SearchImg from '../images/search.svg';
import InvestImg from '../images/archive.svg';
import NewInvestImg from '../images/target.svg';


export default class BusinessUser extends Component {

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6  text-justify mt-3">
                        <h3>Investor Dashboard</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ SearchImg } alt="" />
                                <p>View Businesses</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">More info</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ AccountUserImg } alt="" />
                                <p>My Profile</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Update profile</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ NewInvestImg } alt="" />
                                <p>New Investments</p>
                            </div>
                            <Link to="/investor/investments" className="p-4 small-box-footer">View</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ InvestImg } alt="" />
                                <p>My Investments</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">More info</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}