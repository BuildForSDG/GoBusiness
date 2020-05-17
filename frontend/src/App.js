/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/home.component';
import SignUp from './components/signup.component';
import SignIn from './components/signin.component';

class App extends Component {
  render() {
    return (
      < Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">GoBusiness</Link>
              <div className="collapse navbar-collapse">
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
        <Route path="/" exact component={ Home } />
        <Route path="/signup" component={ SignUp } />
        <Route path="/signin" component={ SignIn } />
      </div>
     
      </Router>
    );
  }
}
export default App;
