/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './components/home.component';
import SignUp from './components/signup.component';
import SignIn from './components/signin.component';
import Reset from './components/reset.component';
import Footer from './components/footer.component';

class App extends Component {
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
  render() {
    const show = ( this.state.menu) ? "show" : "" ;
    return (
      < Router>
        <div>
          <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/home" className="navbar-brand">GoBusiness</Link>
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
          </div>
         
        <Switch>
          <Route path="/home" exact component={ Home } />
          <Route path="/signup" component={ SignUp } />
          <Route path="/signin" component={ SignIn } />
          <Route path="/reset"  component={ Reset } />
        </Switch>  
        
        <Footer/>
      </div>
     
      </Router>
    );
  }
}
export default App;
