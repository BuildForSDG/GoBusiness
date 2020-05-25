import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
          menu : false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
      }
      toggleMenu(){
        this.setState({
          menu : !this.state.menu
        })
      }
    render(){
        const show = ( this.state.menu) ? "show" : "" ;
        return (
        <nav className="navbar navbar-expand-lg navbar-light bg">
            <Link to="/" className="navbar-brand">GoBusiness</Link>
            <button className="navbar-toggler" type="button" onClick={ this.toggleMenu }>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={"collapse navbar-collapse text-center " + show}>
              <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                  <Link to="/signin" className="nav-link"><button className="btn px-4 signin">Sign In</button></Link>
                </li>
                <li className="navbar-item">
                  <Link to="/signup" className="nav-link"><button className="btn btn-primary px-4 mx-3 signup">Sign Up</button></Link>
                </li>
              </ul>
            </div>
        </nav>
        );
    };
};