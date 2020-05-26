/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './components/views/home.component';
import SignUp from './components/auth/signup.component';
import SignIn from './components/auth/signin.component';
import Reset from './components/auth/reset.component';
import Footer from './components/views/footer.component';
import Header from './components/views/header.component';



class App extends Component {
  
  render() {
   
    return (
        < Router>
          <div className="container">
            <Header/>
            <Route path="/" exact component={ Home } />
            <Route path="/signup" component={ SignUp } />
            <Route path="/signin" component={ SignIn } />
            <Route path="/reset"  component={ Reset } />
            <Footer/>
          </div>
        </Router>
    );
  }
}
export default App;
