import React, { Component} from 'react';
import { NavLink,withRouter } from 'react-router-dom';
import swal from 'sweetalert';



class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
          menu : false,
          currentUser: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
      }
    
      isLoggedIn = () => {
        return localStorage.getItem("JWT_SECRET_KEY") !== null;
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
               localStorage.removeItem("JWT_SECRET_KEY");
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
                        onClick={() => this.signOut()}
                        className="nav-link signup mx-3 px-5">Sign Out</NavLink>
                  </li>
                </div>
                ):(
                <div className="navbar-nav">
                  <li className="nav-item">
                    <NavLink to={"/signin"} className="nav-link signin mx-3">Sign In</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={"/signup"} className="nav-link signup mx-3 px-5">Sign Up</NavLink>
                  </li>
                </div>
                )}
              </ul>
            </div>
           
        </nav>
        );
    };
};

export default withRouter(Header);