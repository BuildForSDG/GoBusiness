import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';

import AuthService from '../services/auth.service';



export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
          menu : false,
          showInvestorBoard: false,
          showAdminBoard: false,
          currentUser: undefined
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.signOut = this.signOut.bind(this);
      }
    
      componentDidMount(){
        const user = AuthService.getCurrentuser();

        if(user) {
          this.setState({
            currentUser: user,
            showInvestorBoard: user.roles.includes("ROLE_INVESTOR"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN")
          });
        }
      }

      signOut() {
        AuthService.signOut();
      }

      toggleMenu(){
        this.setState({
          menu : !this.state.menu
        })
      }
    render(){
        const show = ( this.state.menu) ? "show" : "" ;
        const { currentUser, showInvestorBoard, showAdminBoard } = this.state;
        return (
        <nav className="navbar navbar-expand-lg navbar-light bg">
            <NavLink to="/" className="navbar-brand">GoBusiness</NavLink>
            <button className="navbar-toggler" type="button" onClick={ this.toggleMenu }>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={"collapse navbar-collapse text-center " + show}>
              <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                  <NavLink to="/signin" className="nav-link"><button className="btn px-4 signin">Sign In</button></NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink to="/signup" className="nav-link"><button className="btn btn-primary px-4 mx-3 signup">Sign Up</button></NavLink>
                </li>
                {showInvestorBoard && (
                  <li className="nav-item">
                    <NavLink to={"/investor"} className="nav-link">Investor Board</NavLink>
                  </li>
                )}
                {(showAdminBoard && (
                  <li className="nav-item">
                    <NavLink to={"/admin"} className="nav-link">Admin Board</NavLink>
                  </li>
                ))}
                {(currentUser && (
                  <li className="nav-item">
                    <NavLink to={"/user"}>User</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to={"/profile"} className="nav-link">{currentUser.email}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signin" className="nav-link" onClick={this.signOut}>Sign Out</NavLink>
                </li>
              </div>
            ):(
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink to={"/signin"} className="nav-link">Sign In</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/signup"} className="nav-link">Sign Up</NavLink>
                </li>
              </div>
            )}
        </nav>
        );
    };
};