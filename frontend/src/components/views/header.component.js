import React, { Component} from 'react';
import { NavLink,withRouter,Link } from 'react-router-dom';
import swal from 'sweetalert';




class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
          menu : false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
      }
    
      isLoggedIn = () => {
        return localStorage.getItem("jwtToken") !== null;
      }

      signOut() {
       swal("Are you sure you want to Sign out",{
         button: {
           nope : {
             text: "Let me Back",
             value: "nope"
           },
           sure : {
             text: "I'm Sure",
             value: "sure"
           }
         }
       }).then(value => {
         switch(value) {
           case "sure":
             swal(" SignOut Successfully","success").then(val => {
               localStorage.removeItem("jwtToken");
               localStorage.clear();
               return this.props.history.push("/signin");
             });
             break;
            case "nope":
              swal("ok","success");
              break;
              default:
                swal("Got away safely!");
         }
       });
      };

      toggleMenu(){
        this.setState({
          menu : !this.state.menu
        })
      };

    render(){
        const show = ( this.state.menu) ? "show" : "" ;
        return (
        <nav className="navbar navbar-expand-lg navbar-light bg my-2">
            <NavLink to="/" className="navbar-brand">GoBusiness</NavLink>
            <button className="navbar-toggler" type="button" onClick={ this.toggleMenu }>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={"collapse navbar-collapse text-center " + show}>
              <ul className="navbar-nav ml-auto" >
                {this.isLoggedIn() ? (
                <div className="navbar-nav">
                  <li className="nav-item">
                        <NavLink to={"/signin"} 
                        onClick={()=> this.signOut() }
                        className="nav-link signup mx-3 px-5">Sign Out</NavLink>
                  </li>
                </div>
                ):(
                <div className="navbar-nav">
                  <div className="dropdown">
                    <button className="btn btn-outline signin px-4 py-2 mx-3 " id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Sign In
                    </button>
                    <div className="dropdown-menu signin text-center px-4" aria-labelledby="dropdownMenuButton">
                        <Link to="/signin/business"className="dropdown-item text-center mx-1">Business</Link>
                        <Link to="/signin/investor" className="dropdown-item text-center">Investor</Link> 
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="btn btn-outline signup px-5 py-2 mx-3 " id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Sign Up
                    </button>
                    <div className="dropdown-menu text-center px-4" aria-labelledby="dropdownMenuButton">
                        <Link to="/signup/business"className="dropdown-item text-center mx-1">Business</Link>
                        <Link to="/signup/investor" className="dropdown-item text-center">Investor</Link> 
                    </div>
                  </div>
                </div>
                )}
              </ul>
            </div>
           
        </nav>
        );
    };
};

export default withRouter(Header);