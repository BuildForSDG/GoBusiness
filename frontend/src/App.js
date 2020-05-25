/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, signOutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './components/views/home.component';
import SignUp from './components/auth/signup.component';
import SignIn from './components/auth/signin.component';
import Reset from './components/auth/reset.component';
import Footer from './components/views/footer.component';
import Header from './components/views/header.component';
import Business from './components/dashboard/business.component';
import PrivateRoute from "./components/private-route/PrivateRoute";


//Check for token to keep user logged in
if(localStorage.jwtToken){
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now()/1000; // to get in milliseconds
  if(decoded.exp < currentTime){
    // Logout user
    store.dispatch(signOutUser());

    // Redirect to signin
    window.location.href = "/signin";
  }
}


class App extends Component {
  
  render() {
   
    return (
      <Provider store={store}>
        < Router>
          <div className="container">
            <Header/>
            <Route path="/" exact component={ Home } />
            <Route path="/signup" component={ SignUp } />
            <Route path="/signin" component={ SignIn } />
            <Route path="/reset"  component={ Reset } />
            <Switch>
              <PrivateRoute exact path="/business" component={Business} />
            </Switch>
            <Footer/>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
