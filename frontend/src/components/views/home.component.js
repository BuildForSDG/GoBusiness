/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import UserService from '../services/auth.service';
import Investor from '../images/investor.svg';
import Profile from '../images/personal_data__monochromatic.svg';
import Funding from '../images/revenue_.svg';
import UpdateProfile from '../images/update_profile.svg';
import InvestorSignUp from '../images/investor_data_.svg';
import ViewSME from '../images/viewSme.svg';
import InvestSME from '../images/handshake.svg';





export default class Home extends Component {
  render() {
    return (
            <div className="container">
                <div className="row">
                  <div className="col-sm-12 text-center  hero">
                      <div className="welcome">
                      <h1>Welcome to GoBusiness</h1>
                      <h4>A Platform for SMEs Investment</h4>
                      <NavLink to="/signup"><button className="btn btn-primary px-5 py-2 my-3 start shadow">Get Started for Free</button></NavLink>
                      </div>
                  </div>
                </div>

                <div className="row my-5 text-center card-group">
                    <div className="col-sm-12 mb-3 biz">
                        <h3><b>Businesses</b></h3><hr/>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center my-2">
                      <div className="card h-100 ">
                        <img src={Profile} className="card-img-top" alt="Signup" />
                        <div className="card-body">
                          <p className="card-text steps">Get Started by Signing Up</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center my-2">
                      <div className="card h-100">
                        <div className="card-body">
                          <p className="card-text steps">Update your Business Profile</p>
                        </div>
                        <img src={UpdateProfile} className="card-img-top" alt="Signup" />
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center my-2">
                      <div className="card h-100">
                      <img src={Funding} className="card-img-top" alt="Signup" />
                      <div className="card-body">
                          
                          <p className="card-text steps">Request for Investment Seed</p>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="row my-5 text-center card-group">
                    <div className="col-sm-12 mb-3">
                        <h3><b>Investors</b></h3><hr/>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center my-2">
                      <div className="card h-100">
                     
                        <div className="card-body">
                          <p className="card-text steps">Get Started by Signing Up</p>
                        </div>
                        <img src={InvestorSignUp} className="card-img-top" alt="Signup" />
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center my-2">
                      <div className="card h-100">
                        <img src={ViewSME} className="card-img-top" alt="Signup" />
                        <div className="card-body">
                            <p className="card-text steps">View Different SMEs Profile</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center my-2">
                      <div className="card h-100">
                        
                        <div className="card-body">
                            <p className="card-text steps">Invest in Selected SME</p>
                        </div>
                        <img src={InvestSME} className="card-img-top" alt="Invest in SME" />
                      </div>
                    </div>
                </div>
              </div>
          );
        };
};
