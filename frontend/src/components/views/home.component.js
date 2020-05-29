/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import UserService from '../services/auth.service';




export default class Home extends Component {
  render() {
    return (
            <div className="container">
                <div className="row">
                  <div className="col-sm-12 text-center py-5">
                      <h1>Welcome to GoBusiness</h1>
                      <h4>A Platform for SMEs Investment</h4>
                      <NavLink to="/signup"><button className="btn btn-primary px-5 py-2 my-3 start shadow">Get Started</button></NavLink>
                  </div>
                </div>
                <div className="row my-5 text-center">
                    <div className="col-sm-12 mb-3">
                        <h3>For Businesses</h3>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Step 1</h5>
                          <p className="card-text steps">Get Started by Signing Up</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center">
                      <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Step 2</h5>
                          <p className="card-text steps">Update your Business Profile</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center">
                      <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Step 3</h5>
                          <p className="card-text steps">Request for Investment Seed</p>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="row my-5 text-center">
                    <div className="col-sm-12 mb-3">
                        <h3>For Investors</h3>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Step 1</h5>
                          <p className="card-text steps">Get Started by Signing Up</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center">
                      <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Step 2</h5>
                          <p className="card-text steps">View Different SMEs Profile</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-4 text-center">
                      <div className="card">
                      <div className="card-body">
                          <h5 className="card-title">Step 3</h5>
                          <p className="card-text steps">Invest in Disered SMEs</p>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
               
           

    );
  };
};
