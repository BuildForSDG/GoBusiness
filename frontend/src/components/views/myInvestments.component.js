import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import backImg from '../images/back.svg';


export default class MyInvestment extends Component {
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                    <div className="text-justify">
                        <Link to={"/investor"}><img src={ backImg } alt=""/></Link>
                    </div>
                        <h3>My Investments</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <p>#1</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Details</Link>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4  my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <p>#2</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Details</Link>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <p>#3</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Details</Link>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <p>#4</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Details</Link>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <p>#5</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Details</Link>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <p>#6</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Details</Link>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <p>#7</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Details</Link>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <p>#8</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Details</Link>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-4 my-3">
                        <div className="small-box">
                            <div className="inner text-center p-4">
                                <p>#9</p>
                            </div>
                            <Link to="#" className="p-4 small-box-footer">Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}