import React, { Component } from 'react';
import { Link } from'react-router-dom';


export default class BusinessUser extends Component {

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 text-center mt-3">
                        <h3>Investor Dashboard</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <h3>150</h3>
                                <p>View Businesses</p>
                            </div>
                            <div className="icon">
                                <i />
                            </div>
                            <Link to="#" className="p-4 small-box-footer">More info</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <h3>200</h3>
                                <p>My Profile</p>
                            </div>
                            <div className="icon">
                                <i />
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Update profile</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <h3>200</h3>
                                <p>New Investments</p>
                            </div>
                            <div className="icon">
                                <i />
                            </div>
                            <Link to="#" className="p-4 small-box-footer">View</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-6 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <h3>200</h3>
                                <p>My Investments</p>
                            </div>
                            <div className="icon">
                                <i />
                            </div>
                            <Link to="#" className="p-4 small-box-footer">More info</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}