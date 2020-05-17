/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';



export default class Home extends Component {
  render() {
    return (
           
                <div className="col-sm-12 text-center py-5">
                    <h2>Welcome to GoBusiness</h2>
                    <Link to="/signup">
                      <button className="btn btn-primary px-5 py-2 my-3">Get Started</button>
                    </Link> 
                </div>
          
           

    );
  }
}
