/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch,Redirect, Link} from 'react-router-dom';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from './components/services/auth.service';

import Home from './components/views/home.component';
import SignUp from './components/auth/signup.component';
import SignIn from './components/auth/signin.component';
import ForgotPassword from './components/auth/forgotpassword.component';
import ResetPassword from './components/auth/resetpassword.component';
import Footer from './components/views/footer.component';
import Header from './components/views/header.component';
import BusinessUser from './components/dashboard/business.component';
import InvestorUser from './components/dashboard/investor.component';
import AdminUser from './components/dashboard/admin.component';


// logged in user
const isLoggedIn = () => {
  return localStorage.getItem("TOKEN_KEY") !== null;
}

// Protected Route



class App extends Component {
  constructor(props){
    super(props);
    this.signOut = this.signOut.bind(this);

    this.state = {
      showInvestorBoard: false,
      showAdminBoard:false,
      currentUser: undefined
    };
  }
  
  componentDidMount() {
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

  render() {
    return (
        < Router>
          <div className="container">
            <Header />
            <Switch>
              <Route path="/" exact component={ Home } />
              <Route path="/signin/:notify?" component={ SignIn } />
              <Route path="/signup" component={ SignUp }/>
              <Route path="/password/forgot" component={ ForgotPassword }/>
              <Route path="/password/reset/" component={ ResetPassword }/>
              <Route path="/user" component={ BusinessUser } />
              <Route path="/investor" component={ InvestorUser }/>
              <Route path="/admin" component={ AdminUser }/>
              
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}
export default App;
