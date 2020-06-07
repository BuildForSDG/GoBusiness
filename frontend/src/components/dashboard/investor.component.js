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
                    <div className="col-lg-4 col-sm-12 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ AccountUserImg } alt="" />
                                <p>Personal Profile</p>
                            </div>
                            <Link to="#" className="pl-3 small-box-footer">Update profile</Link>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ NewInvestImg } alt="" />
                                <p>New Investments</p>
                            </div>
                            <Link to="/investor/investments/new" className="pl-3 small-box-footer">View</Link>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 col-md-4 my-3">
                        <div className="small-box p-1">
                            <div className="inner text-center p-4">
                                <img className="img-fluid m-3 icon" src={ InvestImg } alt="" />
                                <p>My Investments</p>
                            </div>
                            <Link to="/investor/investments" className="pl-3 small-box-footer">More info</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}